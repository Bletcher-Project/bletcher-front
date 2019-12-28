  
import { SUCCEED_TO_SIGNUP, FAILED_TO_SIGNUP } from "../Constants/action-types";

const initialState = {
  isSignIn: false
};

function rootReducer(state = initialState, action) {
  if (action.type === SUCCEED_TO_SIGNUP) {
    return Object.assign({}, state, {
      isSignIn: true
    });
  }
  return state;
}

export default rootReducer;