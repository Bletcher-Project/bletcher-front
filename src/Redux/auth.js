import { createAction, handleActions as authReducer } from 'redux-actions';

import { INIT, AUTH_API, USER_API } from 'Constants/api-uri';

const SET_TOKEN = 'auth/SET_TOKEN';
const REMOVE_TOKEN = 'auth/REMOVE_TOKEN';

const POST_USER_SUCCESS = 'auth/POST_USER_SUCCESS';
const POST_USER_FAIL = 'auth/POST_USER_FAIL';

const GET_USER_SUCCESS = 'auth/GET_USER_SUCCESS';
const GET_USER_FAIL = 'auth/GET_USER_FAIL';

const initialState = {
  isLogin: !!localStorage.getItem('token'),
  token: localStorage.getItem('token'),
  user: null,
};

const setToken = createAction(SET_TOKEN); // result.data.token
const removeToken = createAction(REMOVE_TOKEN);
const postUserSuccess = createAction(POST_USER_SUCCESS);
const postUserFail = createAction(POST_USER_FAIL);
const getUserSuccess = createAction(GET_USER_SUCCESS); // result.data
const getUserFail = createAction(GET_USER_FAIL);

export default authReducer(
  {
    [SET_TOKEN]: (state, action) => {
      localStorage.setItem('token', action.payload);
      return { ...state, isLogin: true, token: action.payload };
    },
    [REMOVE_TOKEN]: (state) => {
      localStorage.removeItem('token');
      return { ...state, isLogin: false, token: null, user: null };
    },
    [POST_USER_SUCCESS]: (state) => {
      return state;
    },
    [POST_USER_FAIL]: (state) => {
      return state;
    },
    [GET_USER_SUCCESS]: (state, action) => {
      return { ...state, user: action.payload };
    },
    [GET_USER_FAIL]: (state) => {
      localStorage.removeItem('token');
      return { ...state, isLogin: false, token: null, user: null };
    },
  },
  initialState,
);

export const postSignIn = (params) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}${INIT}${AUTH_API}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: params.id,
            password: params.password,
          }),
        },
      );
      if (response.status === 200) {
        const result = await response.json();
        await dispatch(setToken(result.data.token));
        return result.data.token;
      }
      await dispatch(removeToken());
      return null;
    } catch (error) {
      await dispatch(removeToken());
      return null;
    }
  };
};

export const postUser = (user) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}${INIT}${USER_API}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: user.email,
            nickname: user.name,
            password: user.password,
          }),
        },
      );
      if (response.status === 200) {
        await dispatch(postUserSuccess());
      }
    } catch (error) {
      await dispatch(postUserFail());
    }
  };
};

export const signOut = () => {
  return async (dispatch) => {
    await dispatch(removeToken());
  };
};

export const getUser = (token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}${INIT}${AUTH_API}`,
        {
          method: 'GET',
          headers: {
            'x-access-token': token,
          },
        },
      );
      if (response.status === 200) {
        const result = await response.json();
        await dispatch(getUserSuccess(result.data));
      } else {
        await dispatch(getUserFail());
      }
    } catch (error) {
      await dispatch(getUserFail());
    }
  };
};
