import { createAction, handleActions as authReducer } from 'redux-actions';

import { INIT, AUTH_API, USER_API, USER_CHECK } from 'Constants/api-uri';

const SET_TOKEN = 'auth/SET_TOKEN';
const REMOVE_TOKEN = 'auth/REMOVE_TOKEN';

const POST_USER_SUCCESS = 'auth/POST_USER_SUCCESS';
const POST_USER_FAIL = 'auth/POST_USER_FAIL';

const GET_USER_SUCCESS = 'auth/GET_USER_SUCCESS';
const GET_USER_FAIL = 'auth/GET_USER_FAIL';

const CHECK_PASSWORD_SUCCESS = 'auth/CHECK_USER_SUCCESS';
const CHECK_PASSWORD_FAIL = 'auth/CHECK_USER_FAIL';

const PATCH_USER_SUCCESS = 'auth/PATCH_USER_SUCCESS';
const PATCH_USER_FAIL = 'auth/PATCH_USER_FAIL';

const DELETE_USER_SUCCESS = 'auth/DELETE_USER_SUCCESS';
const DELETE_USER_FAIL = 'auth/DELETE_USER_FAIL';

const SET_LOADING_TRUE = 'auth/SET_LOADING_TRUE';
const SET_LOADING_FALSE = 'auth/SET_LOADING_FALSE';

const initialState = {
  isLogin: !!localStorage.getItem('token'),
  token: localStorage.getItem('token'),
  user: null,
  loading: false,
};

const setToken = createAction(SET_TOKEN); // result.data.token
const removeToken = createAction(REMOVE_TOKEN);
const postUserSuccess = createAction(POST_USER_SUCCESS);
const postUserFail = createAction(POST_USER_FAIL);
const getUserSuccess = createAction(GET_USER_SUCCESS); // result.data
const getUserFail = createAction(GET_USER_FAIL);
const checkPasswordSuccess = createAction(CHECK_PASSWORD_SUCCESS);
const checkPasswordFail = createAction(CHECK_PASSWORD_FAIL);
const patchUserSuccess = createAction(PATCH_USER_SUCCESS); // result.data
const patchUserFail = createAction(PATCH_USER_FAIL);
const deleteUserSuccess = createAction(DELETE_USER_SUCCESS);
const deleteUserFail = createAction(DELETE_USER_FAIL);
const setLoadingTrue = createAction(SET_LOADING_TRUE);
const setLoadingFalse = createAction(SET_LOADING_FALSE);

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
    [CHECK_PASSWORD_SUCCESS]: (state) => {
      return state;
    },
    [CHECK_PASSWORD_FAIL]: (state) => {
      return state;
    },
    [PATCH_USER_SUCCESS]: (state, action) => {
      return { ...state, user: action.payload };
    },
    [PATCH_USER_FAIL]: (state) => {
      return state;
    },
    [DELETE_USER_SUCCESS]: (state) => {
      localStorage.removeItem('token');
      return { ...state, isLogin: false, token: null, user: null };
    },
    [DELETE_USER_FAIL]: (state) => {
      return state;
    },
    [SET_LOADING_TRUE]: (state) => {
      return { ...state, loading: true };
    },
    [SET_LOADING_FALSE]: (state) => {
      return { ...state, loading: false };
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

export const checkPassword = (token, password) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}${INIT}${USER_API}${USER_CHECK}`,
        {
          method: 'POST',
          headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            checkpassword: password,
          }),
        },
      );
      if (response.status === 200) {
        dispatch(checkPasswordSuccess());
        return true;
      }
      dispatch(checkPasswordFail());
      return false;
    } catch (error) {
      dispatch(checkPasswordFail());
      return false;
    }
  };
};

export const updateUser = (token, newInfo) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      if (newInfo.email) formData.append('email', newInfo.email);
      if (newInfo.name) formData.append('nickname', newInfo.name);
      if (newInfo.introduce) formData.append('introduce', newInfo.introduce);
      if (newInfo.img) formData.append('img', newInfo.img);
      if (newInfo.password) formData.append('password', newInfo.password);
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}${INIT}${USER_API}`,
        {
          method: 'PATCH',
          headers: {
            'x-access-token': token,
          },
          body: formData,
        },
      );
      if (response.status === 200) {
        const result = await response.json();
        await dispatch(patchUserSuccess(result.data));
      } else {
        await dispatch(patchUserFail());
      }
    } catch (error) {
      await dispatch(patchUserFail());
    }
  };
};

export const deleteUser = (userId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}${INIT}${USER_API}/${userId}`,
        { method: 'DELETE' },
      );
      if (response.status === 200) await dispatch(deleteUserSuccess());
      else await dispatch(deleteUserFail());
    } catch (error) {
      await dispatch(deleteUserFail());
    }
  };
};

export const setLoadingState = (makeLoading) => {
  return (dispatch) => {
    if (makeLoading) dispatch(setLoadingTrue());
    else dispatch(setLoadingFalse());
  };
};
