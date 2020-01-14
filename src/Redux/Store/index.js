import { createStore, applyMiddleware } from "redux";
import reducer  from "../Reducers/index";

const store = createStore(reducer);

export default store;
