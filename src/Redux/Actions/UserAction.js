import { ServerEndPoint } from "../../Configs/Server";

import axios from "axios";
import {
  SUCCEED_TO_SIGNUP,
  FAILED_TO_SIGNUP,
  USERTYPE_UPDATED,
  SIGNUPSTEP_UPDATED,
  SIGNUP_INFO_UPDATED,
  SUCCEED_TO_GET_USER_BY_USERNAME,
  FAILED_TO_GET_USER_BY_USERNAME
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

export function postSignup(payload) {
  axios
    .post(ServerEndPoint + "api/users", payload)
    .then(res => {
      return res;
    })
    .catch(err => {
      alert("signup fail!: " + err);
      return { type: FAILED_TO_SIGNUP };
    });

  return { type: SUCCEED_TO_SIGNUP };
}

export const getUserByUserName = username => {
  return async dispatch => {
    try {
      let response = await fetch(ServerEndPoint + `api/users?name=${username}`, {
        method: "GET",
      });
      if (response.status === 200) {
        let result = await response.json();
        await dispatch({
          type: SUCCEED_TO_GET_USER_BY_USERNAME,
          payload: result.userInfo
        });
        return result.userInfo;
      } else {
        await dispatch({
          type: FAILED_TO_GET_USER_BY_USERNAME,
          payload: null
        });
        return "failed";
      }
    } catch (error) {
      dispatch({
        type: FAILED_TO_GET_USER_BY_USERNAME,
        payload: { data: "NETWORK_ERROR" }
      });
    }
  }
}