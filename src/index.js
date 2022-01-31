/* eslint-disable jsx-a11y/heading-has-content */
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./css/tailwind.css";
import { RecoilRoot } from "recoil";

ReactDOM.render(
    <RecoilRoot>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </RecoilRoot>,
    document.getElementById("root")
);
