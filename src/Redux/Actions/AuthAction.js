import axios from "axios";

import {
  SUCCEED_TO_SIGNUP,
  FAILED_TO_SIGNUP,
  USERTYPE_UPDATED,
  SIGNUPSTEP_UPDATED,
  SIGNUP_INFO_UPDATED
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
    .post("http://127.0.0.1:4000/api/users", payload)
    .then(res => {
      return res;
    })
    .catch(err => {
      alert("signup fail!: " + err);
    });

  return { type: SUCCEED_TO_SIGNUP };
}
