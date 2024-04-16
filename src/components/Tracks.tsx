import { useEffect, useState } from "preact/hooks";
import { mp3Cache, playlistCache, trackDataCache } from "../lib/cache";
import { download } from "../lib/download";
import { useCacheValue, useTracks } from "../lib/hooks";

export function Track({ id }: { id: number }) {
  //   console.log("Rendered Track", id);
  const track = useCacheValue(trackDataCache, id);
  const [partsDownloaded, setPartsDownloaded] = useState<boolean[]>([]);
  const parts = useCacheValue(playlistCache, id);
  // track parts
  useEffect(() => {
    if (!parts) {
      setPartsDownloaded([]);
      return;
    }
    setPartsDownloaded(
      parts.map((_, i) => {
        return mp3Cache.has(parts[i].url);
      })
    );
    // subscribe to mp3 changes
    const handler = (k: string) => {
      const index = parts.findIndex((p) => p.url === k);
      if (index === -1) return;
      setPartsDownloaded((prev) => {
        const next = [...prev];
        next[index] = true;
        return next;
      });
    };
    mp3Cache.subscribeAll(handler);
    return () => mp3Cache.unsubscribeAll(handler);
  }, [parts]);
  if (!track) return null;

  const loaded = parts
    ? partsDownloaded.filter((p) => p).length / parts.length
    : 0;
  return (
    <div
      className={`track ${!parts ? "none" : ""} ${loaded === 1 ? "full" : ""} ${
        loaded === 0 ? "stuck" : ""
      }`}
    >
      <img src={track.artwork_url} alt="Album Art" class="art" />
      <div className="parts">
        {!parts && "🕒"}
        {parts && loaded < 1 && Math.floor(loaded * 100) + "%"}
        {parts && loaded === 1 && "✅"}
      </div>
      <div className="info">
        <h3 class="tracktitle">{track.title}</h3>
        <p class="user">{track.user.username}</p>
      </div>
      <div className="buttons">
        <button
          className="cache"
          onClick={() => download(id, true)}
          title="Save track to memory"
        >
          💾
        </button>
        <button
          className="download"
          onClick={() => download(id)}
          title="Download file"
        >
          ⏬
        </button>
      </div>
    </div>
  );
}

export function Tracks() {
  const tracks = useTracks();
  return (
    <div className="tracks">
      {tracks.length === 0 && (
        <div className="no-tracks">
          <h4>No tracks</h4>
          <p>Start listening to tracks and they will show up here</p>
        </div>
      )}
      {tracks.map((trackId) => (
        <Track key={trackId} id={trackId} />
      ))}
    </div>
  );
}
