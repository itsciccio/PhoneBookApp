import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import PhoneBook from "./components/phoneBook";

ReactDOM.render(
  <Provider store={store}>
    <PhoneBook />
  </Provider>,
  document.getElementById("root")
);
