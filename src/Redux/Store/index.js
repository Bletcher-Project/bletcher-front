import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import reducer from "../Reducers/index";

const store = createStore(reducer, applyMiddleware(ReduxThunk));

export default store;
