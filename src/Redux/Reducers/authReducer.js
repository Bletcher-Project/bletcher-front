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

export const removeTokenSuccess = () => ({
  type: REMOVE_TOKEN_SUCCESS,
});

export const removeTokenFail = () => ({
  type: REMOVE_TOKEN_FAIL,
});

export const setTokenSuccess = (payload) => ({
  type: SET_TOKEN_SUCCESS,
  payload,
});

export const setTokenFail = (payload) => ({
  type: SET_TOKEN_FAIL,
  payload,
});

export const signoutSuccess = () => ({
  type: SIGNOUT_SUCCESS,
});

export const signoutFail = () => ({
  type: SIGNOUT_FAIL,
});

export const getUserSuccess = (payload) => ({
  type: GET_USER_SUCCESS,
  payload,
});

export const getUserFail = () => ({
  type: GET_USER_FAIL,
});

export const removeUserSuccess = () => ({
  type: REMOVE_USER_SUCCESS,
});

export const removeUserFail = () => ({
  type: REMOVE_USER_FAIL,
});

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case REMOVE_TOKEN_SUCCESS: // TOKEN_EXPIRED
      return { ...state, isLogin: false, token: null };
    case SET_TOKEN_SUCCESS: // SUCCEED_TO_SIGNIN
      localStorage.setItem('token', action.payload);
      return { ...state, isLogin: true, token: action.payload };
    case SIGNOUT_SUCCESS: // SUCCEED_TO_SIGNOUT
      localStorage.removeItem('token');
      return { ...state, isLogin: false, token: null, user: {} };
    case GET_USER_SUCCESS: // SUCCEED_TO_GET_USER
      return { ...state, user: action.payload };
    case REMOVE_USER_SUCCESS: // FAILED_TO_GET_USER
      return { ...state, user: {} };

    default:
      return state;
  }
}
