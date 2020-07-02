
import {
  SUCCEED_TO_SIGNIN,
  FAILED_TO_SIGNIN,
  SUCCEED_TO_GET_USER,
  FAILED_TO_GET_USER,
  SUCCEED_TO_SIGNOUT,
  TOKEN_EXPIRED
} from "Redux/Constants/action-types";

import * as constant from '../../Constants/Constant';

export const postSignIn = params => {
  return async dispatch => {
    try {
      let response = await fetch(process.env.REACT_APP_SERVER_URL + constant.INIT_API + constant.AUTH_API + constant.SIGNIN_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: params.id,
          password: params.password
        })
      });
      if (response.status === 401) {
        await dispatch({
          type: FAILED_TO_SIGNIN,
          payload: null
        });
        return "failed";
      } else {
        let result = await response.json();
        await dispatch({
          type: SUCCEED_TO_SIGNIN,
          payload: result.token
        });
        return result.token;
      }
    } catch (error) {
      dispatch({
        type: FAILED_TO_SIGNIN,
        payload: { data: "NETWORK_ERROR" }
      });
    }
  }
}

export const getUser = token => {
  return async dispatch => {
    try {
      let response = await fetch(process.env.REACT_APP_SERVER_URL + constant.INIT_API + constant.AUTH_API + constant.USER_API_GET, {
        method: "GET",
        headers: {
          "x-access-token": token
        }
      });
      if (response.status === 200) {
        let result = await response.json();
        await dispatch({
          type: SUCCEED_TO_GET_USER,
          payload: result.userInfo
        });
        return result.userInfo;
      } else if (response.status === 403) {
        let result = await response.json();
        if (result.message === "jwt expired") {
          await dispatch({
            type: TOKEN_EXPIRED,
            payload: null
          });
        }
      } else {
        await dispatch({
          type: FAILED_TO_GET_USER,
          payload: null
        });
        return "failed";
      }
    } catch (error) {
      dispatch({
        type: FAILED_TO_GET_USER,
        payload: { data: "NETWORK_ERROR" }
      });
    }
  }
}

export const signOut = () => {
  return async dispatch => {
    await dispatch({
      type: SUCCEED_TO_SIGNOUT
    });
  };
}