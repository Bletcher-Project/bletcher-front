import { createStore, applyMiddleware } from "redux";
import rootReducer from "../Reducers/index";

const store = createStore(rootReducer);

export default store;
