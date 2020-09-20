import { combineReducers } from 'redux';
import authReducer from './auth';
import postReducer from './post';
import fetchPostReducer from './fetch-post';

export default combineReducers({ authReducer, postReducer, fetchPostReducer });
