import { TrackMeta, mp3Cache, playlistCache, trackDataCache } from "./cache";
import { ID3Writer } from "browser-id3-writer";

async function getCoverArt(track: TrackMeta, x500 = true) {
  if (!track.artwork_url) return null;
  try {
    const response = await fetch(
      x500
        ? track.artwork_url.replace("-large", "-t500x500")
        : track.artwork_url
    );
    if (!response.ok) throw new Error("Failed to fetch cover art");
    return await response.arrayBuffer();
  } catch (e) {
    if (x500) {
      return getCoverArt(track, false);
    }
    console.error(e);
    return null;
  }
}

async function attachTrackData(mp3: Blob, track: TrackMeta) {
  const writer = new ID3Writer(await mp3.arrayBuffer());
  writer
    .setFrame("TPE1", [track.user.username])
    .setFrame("TIT2", track.title)
    .setFrame("TYER", new Date(track.display_date).getFullYear())
    .setFrame("TCON", [track.genre])
    .setFrame("WPAY", track.permalink_url)
    .setFrame("TPUB", track.user.originalPublisher ?? track.user.username);

  const coverArt = await getCoverArt(track);
  if (coverArt) {
    writer.setFrame("APIC", {
      type: 3,
      data: coverArt,
      description: "Cover",
    });
  }
  writer.addTag();
  return writer.getBlob();
}

async function downloadBlob(blob: Blob, filename: string) {
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.style.display = "none";

  var url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
  a.remove();
}

export async function download(id: number, noSave = false) {
  const trackData = await trackDataCache.get(id);
  const m3u = await playlistCache.get(id).catch(() => {
    throw new Error("No M3U found for track");
  });

  const downloadedAudio = await Promise.all(
    m3u.map(async ({ url, duration }) => {
      const arrayBuf = await mp3Cache.get(url);
      return { arrayBuf, duration };
    })
  ).catch((e) => {
    console.error(e);
    playlistCache.remove(id);
    throw new Error("Failed to download audio");
  });
  //   console.log("Downloaded audio", downloadedAudio);
  if (noSave) return;

  const concattedBytes = downloadedAudio.reduce((acc, { arrayBuf }) => {
    // append the new audio data to the existing buffer
    const tmp = new Uint8Array(acc.byteLength + arrayBuf.byteLength);
    tmp.set(new Uint8Array(acc), 0);
    tmp.set(new Uint8Array(arrayBuf), acc.byteLength);
    return tmp.buffer;
  }, new ArrayBuffer(0));

  const concattedBlob = new Blob([concattedBytes], { type: "audio/mp3" });
  const withMeta = await attachTrackData(concattedBlob, trackData);

  downloadBlob(withMeta, `${trackData.user.username} - ${trackData.title}.mp3`);
}
