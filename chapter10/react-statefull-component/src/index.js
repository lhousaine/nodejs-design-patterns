import React from "react";
import ReactDOM from "react-dom";
import htm from "htm";

import { App } from "./App.js";
const html = htm.bind(React.createElement);
ReactDOM.render(html`<${App} />`, document.getElementsByTagName("body")[0]);
