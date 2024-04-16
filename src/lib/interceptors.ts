import { Middleware } from "./intercept-fetch";
import { apiDetails, mp3Cache, playlistCache, trackDataCache } from "./cache";
import { parsem3u } from "./m3u";

export const interceptors: Middleware[] = [
  // playlists
  async (type, url, payload, response) => {
    if (url.includes("api") && url.includes("/stream/hls")) {
      console.log("Caught HLS stream request");
      let trackId = 0;
      url.split("/").forEach((part) => {
        if (!part.includes(":track")) return;
        trackId = parseInt(part.split(":")[2]);
      });
      if (trackId === 0) {
        console.error("Track ID not found in URL!");
        return;
      }
      const m3u8Url = JSON.parse(response).url as string;
      const m3u8Response = await fetch(m3u8Url);
      const m3u8Text = await m3u8Response.text();

      playlistCache.set(trackId, parsem3u(m3u8Text));
      //   console.log("Parsed M3U8", playlistCache.get(trackId), m3u8Text);
      // ensure the data for the track is also fetched
      trackDataCache.get(trackId);
    }
  },
  // api data (client_id, app_version, etc.)
  async (type, url, payload, response) => {
    if (url.includes("api-v2.soundcloud.com")) {
      const urlo = new URL(url);
      const client_id = urlo.searchParams.get("client_id");
      const app_version = urlo.searchParams.get("app_version");
      const app_locale = urlo.searchParams.get("app_locale");

      if (client_id) apiDetails.client_id = client_id;
      if (app_version) apiDetails.app_version = app_version;
      if (app_locale) apiDetails.app_locale = app_locale;

      apiDetails.ready = true;
      apiDetails.onReady.forEach((f) => f());
      apiDetails.onReady = [];
    }
  },
  // mp3s
  async (type, url, payload, response) => {
    if (
      type === "fetch" &&
      url.includes("media.sndcdn.com") &&
      url.includes(".mp3")
    ) {
      mp3Cache.set(url, await (response as Response).arrayBuffer());
    }
  },
];
