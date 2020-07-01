import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";

// css
import "bootstrap/dist/css/bootstrap.css";
import "index.scss";

// Redux
import { Provider } from 'react-redux';
import ReduxThunk from "redux-thunk";
import { createStore, applyMiddleware } from 'redux'
import reducers from 'Redux/Reducers';

const store = createStore(reducers, applyMiddleware(ReduxThunk));
// const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);