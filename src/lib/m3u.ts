export function parsem3u(m3u: string) {
  const lines = m3u.split("\n");
  if (lines.shift() !== "#EXTM3U") {
    throw new Error("Invalid M3U file");
  }

  const output: {
    duration: string;
    url: string;
  }[] = [];

  for (let line = 0; line < lines.length; line++) {
    if (!lines[line].startsWith("#EXTINF") || lines[line].startsWith("http")) {
      continue;
    }
    if (lines[line].startsWith("#EXTINF")) {
      const duration = lines[line].split(",")[0].split(":")[1];
      const url = lines[line + 1];
      output.push({ duration, url });
    }
    if (lines[line].startsWith("#EXT-X-ENDLIST")) {
      console.log("End of M3U", output);
      return output;
    }
  }
  return output;
}
export type M3U = ReturnType<typeof parsem3u>;
