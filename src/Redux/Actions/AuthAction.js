import {
  REMOVE_TOKEN,
  SET_TOKEN,
  SIGNOUT,
  GET_USER,
  REMOVE_USER,
} from 'Redux/Constants/action-types';

import * as constant from '../../Constants/api_uri';

export const postSignIn = (params) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_SERVER_URL +
          constant.INIT_API +
          constant.AUTH_API +
          constant.SIGNIN_API,
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
      if (response.status === 401) {
        await dispatch({
          type: REMOVE_TOKEN, // failed to sign in
          payload: null,
        });
        return 'failed';
      }
      const result = await response.json();
      await dispatch({
        type: SET_TOKEN, // success sign in
        payload: result.token,
      });
      return result.token;
    } catch (error) {
      dispatch({
        type: REMOVE_TOKEN, // fail to sign in
        payload: { data: 'NETWORK_ERROR' },
      });
    }
  };
};

export const getUser = (token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        process.env.REACT_APP_SERVER_URL +
          constant.INIT_API +
          constant.AUTH_API +
          constant.USER_API_GET,
        {
          method: 'GET',
          headers: {
            'x-access-token': token,
          },
        },
      );
      if (response.status === 200) {
        const result = await response.json();
        await dispatch({
          type: GET_USER, // success get user
          payload: result.userInfo,
        });
        return result.userInfo;
        // eslint-disable-next-line no-else-return
      } else if (response.status === 403) {
        const result = await response.json();
        if (result.message === 'jwt expired') {
          await dispatch({
            type: REMOVE_TOKEN, // token expired
            payload: null,
          });
        }
      } else {
        await dispatch({
          type: REMOVE_USER, // fail to get user
          payload: null,
        });
        return 'failed';
      }
    } catch (error) {
      dispatch({
        type: REMOVE_USER, // fail to ger user
        payload: { data: 'NETWORK_ERROR' },
      });
    }
  };
};

export const signOut = () => {
  return async (dispatch) => {
    await dispatch({
      type: SIGNOUT,
    });
  };
};
