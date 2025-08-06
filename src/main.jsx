import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import store from "./redux/store";
import RouteConfig from "./routes/RouteConfig";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <RouteConfig />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
