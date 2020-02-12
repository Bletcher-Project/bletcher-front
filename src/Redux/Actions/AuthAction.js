import { ServerEndPoint } from "../../Configs/Server";

import {
  SUCCEED_TO_SIGNUP,
  FAILED_TO_SIGNUP,
  USERTYPE_UPDATED,
  SIGNUPSTEP_UPDATED,
  SIGNUP_INFO_UPDATED,
  SUCCEED_TO_SIGNIN,
  FAILED_TO_SIGNIN
} from "../Constants/action-types";

export function updateUserType(payload) {
  return { type: USERTYPE_UPDATED, payload };
}

export function updateSignupStep(payload) {
  return { type: SIGNUPSTEP_UPDATED, payload };
}

export function updateSignupInfo(payload) {
  return { type: SIGNUP_INFO_UPDATED, payload };
}

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