import { useState } from "preact/hooks";
import { Tracks } from "./components/Tracks";
import { useSavedState, useTracks } from "./lib/hooks";
import { download } from "./lib/download";

export function App() {
  const [open, setOpen] = useState(false);
  const [autocache, setAutocache] = useSavedState("autocache", false);
  const tracks = useTracks();

  if (!open) return <div class="app" onClick={() => setOpen(true)}></div>;

  return (
    <div className="app open">
      <div className="title">
        <div className="left">
          <a
            href="https://github.com/mlntcandy/sc-download"
            target="_blank"
            title="GitHub repo"
          >
            <h3>sc-download</h3>
          </a>
          <div className="buttons">
            {/* <button onClick={() => {}} title="Select all tracks">
              ☑
            </button> */}
            <button
              onClick={() => setAutocache((p) => !p)}
              title="Cache all tracks upon arrival - blocks player while caching! --- While ensures all tracks displayed are always available for download, we're not responsible for any blocks or bans from SoundCloud for excessive downloads."
              className={`toggle ${autocache ? "on" : ""}`}
            >
              💾
            </button>
            <button
              onClick={() => tracks.forEach((id) => download(id))}
              title="Download everything"
              // className={`toggle ${autocache ? "on" : ""}`}
            >
              ⏬
            </button>
          </div>
        </div>
        <button className="close" onClick={() => setOpen(false)}>
          X
        </button>
      </div>
      <div className="content">
        <Tracks autocache={autocache} tracks={tracks} />
      </div>
    </div>
  );
}
