import { render } from "preact";
import { App } from "./app";
import "./index.css";
import { setupInterception } from "./lib/intercept-fetch";

console.log("%csc-download", "font-size: 32px");
setupInterception();

render(
  <App />,
  (() => {
    const app = document.createElement("div");
    app.id = "sc-download";
    document.body.append(app);
    return app;
  })()
);
