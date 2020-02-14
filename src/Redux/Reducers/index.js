import { combineReducers } from "redux";
import UserReducer from "./UserReducer";
import authReducer from "./authReducer";

export default combineReducers({ UserReducer, authReducer });
