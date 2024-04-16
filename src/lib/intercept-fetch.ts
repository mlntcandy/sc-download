import { interceptors } from "./interceptors";
import { playlistCache } from "./cache";

type Fetch = typeof fetch;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function middleware(
  type: "fetch" | "xhr",
  url: string,
  payload: any,
  response: any
) {
  //   console.log(`[${type}]`, url, payload, response);
  interceptors.forEach((f) => f(type, url, payload, response));
}

export type Middleware = typeof middleware;

function setupFetchInterception() {
  const { fetch: origFetch } = window;

  const fakeFetch: Fetch = async (...args) => {
    const response = await origFetch(...args);
    const [inp, init] = args;
    const url = inp instanceof URL ? inp.href : response.url;
    const payload = init?.body ?? null;
    const responseClone = response.clone();
    middleware("fetch", url, payload, responseClone);
    return response;
  };

  window.fetch = fakeFetch;
}

function setupXHRInterception() {
  const { open: realOpen, send: realSend } = window.XMLHttpRequest.prototype;

  interface FakeXHR extends XMLHttpRequest {
    _scdl_payload: any;
  }

  window.XMLHttpRequest.prototype.send = function (body) {
    (this as FakeXHR)._scdl_payload = body;
    realSend.apply(this, [body]);
  };

  window.XMLHttpRequest.prototype.open = function () {
    this.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        middleware(
          "xhr",
          this.responseURL,
          (this as FakeXHR)._scdl_payload,
          this.response
        );
      }
    });

    // @ts-ignore
    realOpen.apply(this, arguments);
  };
}

export function setupInterception() {
  setupFetchInterception();
  setupXHRInterception();
}
