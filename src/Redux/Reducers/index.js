import { combineReducers } from "redux";
import UserReducer from "./UserReducer";
import authReducer from "./authReducer";
import postReducer from "./postReducer";

export default combineReducers({ UserReducer, authReducer, postReducer });
