import {
  SUCCEED_TO_SIGNUP,
  FAILED_TO_SIGNUP,
  USERTYPE_UPDATED,
  SIGNUPSTEP_UPDATED,
  SIGNUP_INFO_UPDATED
} from "../Constants/action-types";

const initialState = {
  signUpStep: "typePage",
  userType: "",
  email: "",
  name: "",
  password: "",
  status: ""
};

export default function UserReducer(state = initialState, action) {
  if (action.type === SUCCEED_TO_SIGNUP) {
    return Object.assign({}, state, {
      isSignIn: true
    });
  }
  if (action.type === USERTYPE_UPDATED) {
    return Object.assign({}, state, {
      userType: action.payload
    });
  }
  if (action.type === SIGNUPSTEP_UPDATED) {
    return Object.assign({}, state, {
      signUpStep: action.payload
    });
  }
  if (action.type === SIGNUP_INFO_UPDATED) {
    return Object.assign({}, state, {
      email: action.payload.email,
      name: action.payload.name,
      password: action.payload.password,
      status: action.payload.status
    });
  }
  return state;
}
