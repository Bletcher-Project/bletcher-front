import {
  SUCCEED_TO_SIGNIN,
  FAILED_TO_SIGNIN
} from "../Constants/action-types";

const initialState = {
  isLogin: ""
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SUCCEED_TO_SIGNIN:
      return Object.assign({}, state, {
        isLogin: true
      });
    case FAILED_TO_SIGNIN:
      return Object.assign({}, state, {
        isLogin: false
      });

    default:
      return state;
  }
}