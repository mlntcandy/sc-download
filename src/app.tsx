import { useState } from "preact/hooks";
import { Tracks } from "./components/Tracks";

export function App() {
  const [open, setOpen] = useState(false);
  if (!open) return <div class="app" onClick={() => setOpen(true)}></div>;

  return (
    <div className="app open">
      <div className="title">
        <h3>sc-download</h3>
        <button className="close" onClick={() => setOpen(false)}>
          X
        </button>
      </div>
      <div className="content">
        <Tracks />
      </div>
    </div>
  );
}
