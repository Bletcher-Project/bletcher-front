import {
  SUCCEED_TO_GET_ALLPOST,
  FAILED_TO_GET_ALLPOST
} from "../Constants/action-types";

const initialState = {
  feed: null
};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case SUCCEED_TO_GET_ALLPOST:
      return Object.assign({}, state, {
        feed: action.payload
      });
    case FAILED_TO_GET_ALLPOST:
      return Object.assign({}, state, {
        //
      });

    default:
      return state;
  }
}