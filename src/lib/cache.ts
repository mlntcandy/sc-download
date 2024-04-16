import { M3U } from "./m3u";

type KeyCallback<V> = (value: V | null) => void;
type AllCallback<K, V> = (key: K, value: V | null, cache: Cache<K, V>) => void;

export class Cache<K, V> {
  private cache: Map<K, V> = new Map();
  private fetcher: (key: K) => Promise<V>;
  private subscribers: Map<K, KeyCallback<V>[]> = new Map();
  private allSubscribers: AllCallback<K, V>[] = [];

  constructor(fetcher?: (key: K) => Promise<V>) {
    this.fetcher =
      fetcher ??
      (() => {
        throw new Error("No fetcher provided");
      });
  }

  public async get(key: K): Promise<V> {
    return this.cache.get(key) ?? (await this.getOnMiss(key));
  }

  public set(key: K, value: V): void {
    // console.log(`Setting cache`, key, value);
    this.cache.set(key, value);
    this.notify(key);
  }

  public remove(key: K): void {
    this.cache.delete(key);
    this.notify(key);
  }

  public has(key: K): boolean {
    return this.cache.has(key);
  }

  private async getOnMiss(key: K): Promise<V> {
    const value = await this.fetcher(key);
    this.set(key, value);
    return value;
  }

  public subscribe(key: K, callback: KeyCallback<V>): void {
    if (!this.subscribers.has(key)) {
      this.subscribers.set(key, []);
    }
    this.subscribers.get(key)?.push(callback);
  }

  public subscribeAll(callback: AllCallback<K, V>): void {
    this.allSubscribers.push(callback);
  }

  public unsubscribeAll(callback: AllCallback<K, V>): void {
    const index = this.allSubscribers.indexOf(callback);
    if (index !== -1) {
      this.allSubscribers.splice(index, 1);
    }
  }

  public unsubscribe(key: K, callback: KeyCallback<V>): void {
    const subscribers = this.subscribers.get(key);
    if (!subscribers) return;
    const index = subscribers.indexOf(callback);
    if (index !== -1) {
      subscribers.splice(index, 1);
    }
  }

  public dump() {
    return this.cache.entries();
  }

  public keys() {
    return this.cache.keys();
  }

  public values() {
    return this.cache.values();
  }

  public clear() {
    const keys = Array.from(this.cache.keys());
    this.cache.clear();
    keys.forEach((k) => this.notify(k));
  }

  private async notify(key: K) {
    const subscribers = this.subscribers.get(key);
    const value = await this.get(key).catch(() => null);
    if (subscribers) {
      subscribers.forEach((f) => f(value));
    }
    this.allSubscribers.forEach((f) => f(key, value, this));
  }
}

export const playlistCache = new Cache<number, M3U>();
export const apiDetails = {
  client_id: "",
  app_version: "",
  app_locale: "",
  ready: false,
  onReady: [] as (() => void)[],
};
export const trackDataCache = new Cache<
  number,
  {
    artwork_url?: string;
    duration: number;
    title: string;
    genre: string;
    display_date: string;
    permalink_url: string;
    user: {
      username: string;
      originalPublisher?: string;
    };
  }
>((id) => {
  function fetchData() {
    return fetch(
      `https://api-v2.soundcloud.com/tracks/${id}?client_id=${apiDetails.client_id}&app_version=${apiDetails.app_version}&app_locale=${apiDetails.app_locale}`
    )
      .then((r) => r.json())
      .then((data) => {
        // split title into artist and track name, if published by label or a collab
        const regex = / [-–] /;
        const differentArtist = regex.test(data.title);
        const title = differentArtist ? data.title.split(regex)[1] : data.title;
        const user = differentArtist
          ? {
              ...data.user,
              username: data.title.split(regex)[0],
              // preserve original publisher for metadata
              originalPublisher: data.user.username,
            }
          : data.user;
        return {
          ...data,
          title,
          user,
        };
      });
  }

  if (!apiDetails.ready) {
    // defer fetching until API details are ready
    return new Promise((resolve) => {
      apiDetails.onReady.push(() => {
        fetchData().then(resolve);
      });
    });
  } else {
    return fetchData();
  }
});

export const mp3Cache = new Cache<string, ArrayBuffer>((url) =>
  fetch(url).then((r) => r.arrayBuffer())
);

export type TrackMeta = typeof trackDataCache extends Cache<number, infer T>
  ? T
  : never;

// export const trackUrlToIdCache = new Cache<string, number>((url) =>
