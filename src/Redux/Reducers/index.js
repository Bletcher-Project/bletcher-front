import { combineReducers } from "redux";
import signupReducer from "./signupReducer";
import authReducer from "./authReducer";

export default combineReducers({ signupReducer, authReducer });
