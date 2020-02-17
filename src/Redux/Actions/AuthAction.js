import { ServerEndPoint } from "../../Configs/Server";

import {
  SUCCEED_TO_SIGNIN,
  FAILED_TO_SIGNIN,
  SUCCEED_TO_GETUSER,
  FAILED_TO_GETUSER
} from "../Constants/action-types";

export const postSignIn = params => {
  return async dispatch => {
    try {
      let response = await fetch(ServerEndPoint + "api/auth/signin", {
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
      let response = await fetch(ServerEndPoint + "api/auth/user", {
        method: "GET",
        headers: {
          "x-access-token": token
        }
      });
      if (response.status === 200) {
        let result = await response.json();
        await dispatch({
          type: SUCCEED_TO_GETUSER,
          payload: result.userInfo
        });
        return result.userInfo;
      } else {
        await dispatch({
          type: FAILED_TO_GETUSER,
          payload: null
        });
        return "failed";
      }
    } catch (error) {
      dispatch({
        type: FAILED_TO_GETUSER,
        payload: { data: "NETWORK_ERROR" }
      });
    }
  }
}