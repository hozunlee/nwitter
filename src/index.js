/* eslint-disable jsx-a11y/heading-has-content */
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import firebase from "fbsetting";
import "./css/tailwind.css";
console.log(firebase);

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);
