import {
  removeTokenSuccess,
  setTokenSuccess,
  getUserSuccess,
  removeUserSuccess,
  signoutSuccess,
} from '../Reducers/authReducer';
import { getApiPath } from '../utils/util';

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
        await dispatch(removeTokenSuccess()); // failed to signin
        return 'failed';
      }
      const result = await response.json();
      await dispatch(setTokenSuccess(result.token)); // success sign in
      return result.token;
    } catch (error) {
      dispatch(removeTokenSuccess()); // fail to sign in
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
          await dispatch(getUserSuccess(result.userInfo)); // success get user
          return result.userInfo;
        case 403:
          result = await response.json();
          if (result.message === 'jwt expired') {
            await dispatch(removeTokenSuccess()); // token expired
          }
          return result.message;
        default:
          await dispatch(removeUserSuccess()); // fail to get user
          return 'failed';
      }
    } catch (error) {
      dispatch(removeUserSuccess()); // fail to ger user
      return 'ERROR';
    }
  };
};

export const signOut = () => {
  return async (dispatch) => {
    await dispatch(signoutSuccess());
  };
};
