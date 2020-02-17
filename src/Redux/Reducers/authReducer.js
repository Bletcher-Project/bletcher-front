import {
  SUCCEED_TO_SIGNIN,
  FAILED_TO_SIGNIN,
  SUCCEED_TO_GETUSER,
  FAILED_TO_GETUSER
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
    case SUCCEED_TO_GETUSER:
      return Object.assign({}, state, {
        isLogin: true
      });
    case FAILED_TO_GETUSER:
      return Object.assign({}, state, {
        isLogin: false
      });

    default:
      return state;
  }
}