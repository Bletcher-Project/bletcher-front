import { createAction, handleActions as authReducer } from 'redux-actions';

const REMOVE_TOKEN_SUCCESS = 'authReducer/REMOVE_TOKEN_SUCCESS';
const REMOVE_TOKEN_FAIL = 'authReducer/REMOVE_TOKEN_FAIL';

const SET_TOKEN_SUCCESS = 'authReducer/SET_TOKEN_SUCCESS';
const SET_TOKEN_FAIL = 'authReducer/SET_TOKEN_FAIL';

const SIGNOUT_SUCCESS = 'authReducer/SIGNOUT_SUCCESS';
const SIGNOUT_FAIL = 'authReducer/SIGNOUT_FAIL';

const GET_USER_SUCCESS = 'authReducer/GET_USER_SUCCESS';
const GET_USER_FAIL = 'authReducer/GET_USER_FAIL';

const REMOVE_USER_SUCCESS = 'authReducer/REMOVE_USER_SUCCESS';
const REMOVE_USER_FAIL = 'authReducer/REMOVE_USER_FAIL';

const initialState = {
  isLogin: !!localStorage.getItem('token'),
  token: localStorage.getItem('token'),
  user: null,
};

export const removeTokenSuccess = createAction(REMOVE_TOKEN_SUCCESS);
export const removeTokenFail = createAction(REMOVE_TOKEN_FAIL);
export const setTokenSuccess = createAction(SET_TOKEN_SUCCESS); //result.token
export const setTokenFail = createAction(SET_TOKEN_FAIL);
export const signoutSuccess = createAction(SIGNOUT_SUCCESS);
export const signoutFail = createAction(SIGNOUT_FAIL);
export const getUserSuccess = createAction(GET_USER_SUCCESS); // result.userinfo
export const getUserFail = createAction(GET_USER_FAIL);
export const removeUserSuccess = createAction(REMOVE_USER_SUCCESS);
export const removeUserFail = createAction(REMOVE_USER_FAIL);

export default authReducer(
  {
    [REMOVE_TOKEN_SUCCESS]: (state) => {
      return { ...state, isLogin: false, token: null };
    },
    [REMOVE_TOKEN_FAIL]: (state) => {
      return state;
    },
    [SET_TOKEN_SUCCESS]: (state, action) => {
      localStorage.setItem('token', action.payload);
      return { ...state, isLogin: true, token: action.payload };
    },
    [SET_TOKEN_FAIL]: (state) => {
      return state;
    },
    [SIGNOUT_SUCCESS]: (state) => {
      localStorage.removeItem('token');
      return { ...state, isLogin: false, token: null, user: {} };
    },
    [SIGNOUT_FAIL]: (state) => {
      return state;
    },
    [GET_USER_SUCCESS]: (state, action) => {
      return { ...state, user: action.payload };
    },
    [GET_USER_FAIL]: (state) => {
      return state;
    },
    [REMOVE_USER_SUCCESS]: (state) => {
      return { ...state, user: {} };
    },
    [REMOVE_USER_FAIL]: (state) => {
      return state;
    },
  },
  initialState,
);
