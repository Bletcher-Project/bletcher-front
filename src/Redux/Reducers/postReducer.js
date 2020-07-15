const SUCCEED_TO_GET_ALLPOST = 'SUCCEED_TO_GET_ALLPOST';
const FAILED_TO_GET_ALLPOST = 'FAILED_TO_GET_ALLPOST';
const SUCCEED_TO_UPLOAD_POST = 'SUCCEED_TO_UPLOAD_POST';
const FAILED_TO_UPLOAD_POST = 'FAILED_TO_UPLOAD_POST';

const initialState = {
  feed: null,
};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case FAILED_TO_GET_ALLPOST:
    case SUCCEED_TO_UPLOAD_POST:
    case FAILED_TO_UPLOAD_POST:
      return {
        ...state, //
      };
    case SUCCEED_TO_GET_ALLPOST:
      return { ...state, feed: action.payload };
    default:
      return state;
  }
}
