import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

/**
 * import Configs
 */
import AppRouter from "./config/router";
import store from "./config/store";

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </Router>,
  document.getElementById('root')
);
