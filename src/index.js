import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import firebase from "firebase/app";
import "firebase/auth";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import "./index.css";
import "./styles/forms.css";
import "./styles/shadows.css";
import "./styles/toastify.css";
import "./styles/global.css";

firebase.initializeApp({
  apiKey: "AIzaSyBHmpqs28AFeWL4FJ7tv5-CHYNQ-iihUj8",
  authDomain: "thedatabase-1589992992254.firebaseapp.com",
  databaseURL: "https://thedatabase-1589992992254.firebaseio.com",
  projectId: "thedatabase-1589992992254",
  storageBucket: "thedatabase-1589992992254.appspot.com",
  messagingSenderId: "948225711672",
  appId: "1:948225711672:web:5d6cc0a2a7c2cc55b510cd",
  measurementId: "G-HCW4TBKKJX",
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <QueryParamProvider ReactRouterRoute={Route}>
        <App />
      </QueryParamProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
