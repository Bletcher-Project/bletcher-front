import { SUCCEED_TO_SIGNUP, FAILED_TO_SIGNUP } from "../Constants/action-types";


export function signUp(payload) {
  return { type: SUCCEED_TO_SIGNUP, payload };
}
