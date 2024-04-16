import { useEffect, useState } from "preact/hooks";
import { Cache, trackDataCache } from "./cache";

export const useCacheValue = <K, V>(cache: Cache<K, V>, key: K) => {
  const [value, setValue] = useState<V | null>(null);

  useEffect(() => {
    cache
      .get(key)
      .catch((e) => null)
      .then(setValue);
    cache.subscribe(key, setValue);
    return () => cache.unsubscribe(key, setValue);
  }, [key]);

  return value;
};

function iteratorToArray<T>(iter: IterableIterator<T>) {
  return [...iter];
}

export const useCache = <K, V>(cache: Cache<K, V>) => {
  const [cacheState, setCacheState] = useState(iteratorToArray(cache.dump()));

  useEffect(() => {
    const handler = (k: K, v: V | null, c: typeof cache) =>
      setCacheState(iteratorToArray(c.dump()));

    cache.subscribeAll(handler);
    return () => cache.unsubscribeAll(handler);
  }, []);

  return cacheState;
};

export const useCacheKeys = <K, V>(cache: Cache<K, V>) => {
  const [keys, setKeys] = useState(iteratorToArray(cache.keys()));

  useEffect(() => {
    const handler = (k: K, v: V | null, c: typeof cache) =>
      setKeys(iteratorToArray(c.keys()));

    cache.subscribeAll(handler);
    return () => cache.unsubscribeAll(handler);
  }, []);

  return keys;
};

export const useTracks = () => useCacheKeys(trackDataCache);
