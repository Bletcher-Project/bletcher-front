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
