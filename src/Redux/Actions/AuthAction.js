import { getApiPath, getAction } from '../utils/util';

export const REMOVE_TOKEN = 'REMOVE_TOKEN';
export const SET_TOKEN = 'SET_TOKEN';
export const SIGNOUT = 'SIGNOUT';
export const GET_USER = 'GET_USER';
export const REMOVE_USER = 'REMOVE_USER';

export const postSignIn = (params) => {
  return async (dispatch) => {
    try {
      const response = await fetch(getApiPath('SIGNIN_API'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: params.id,
          password: params.password,
        }),
      });
      if (response.status === 401) {
        await dispatch(getAction(REMOVE_TOKEN, null)); // failed to signin
        return 'failed';
      }
      const result = await response.json();
      await dispatch(getAction(SET_TOKEN, result.token)); // success sign in
      return result.token;
    } catch (error) {
      dispatch(getAction(REMOVE_TOKEN, { data: 'NETWORK_ERROR' })); // fail to sign in
      return 'ERROR!';
    }
  };
};

export const getUser = (token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(getApiPath('USER_API_GET'), {
        method: 'GET',
        headers: {
          'x-access-token': token,
        },
      });
      let result;
      switch (response.status) {
        case 200:
          result = await response.json();
          await dispatch(getAction(GET_USER, result.userInfo)); // success get user
          return result.userInfo;
        case 403:
          result = await response.json();
          if (result.message === 'jwt expired') {
            await dispatch(getAction(REMOVE_TOKEN, null)); // token expired
          }
          return result.message;
        default:
          await dispatch(getAction(REMOVE_USER, null)); // fail to get user
          return 'failed';
      }
    } catch (error) {
      dispatch(getAction(REMOVE_USER, { data: 'NETWORK_ERROR' })); // fail to ger user
      return 'ERROR';
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
