const GET_ALLPOSTS_SUCCESS = 'postReducer/GET_ALLPOST_SUCCESS';
const GET_ALLPOSTS_FAIL = 'postReducer/GET_ALLPOST_FAIL';

const GET_USER_POST_SUCCESS = 'postReducer/GET_USER_POST_SUCCESS';
const GET_USER_POST_FAIL = 'postReducer/GET_USER_POST_SUCCESS';

const CLICK_POST_SUCCESS = 'postReducer/CLICK_POST_SUCCESS';
const CLICK_POST_FAIL = 'postReducer/CLICK_POST_FAIL';

const UPLOAD_POST_SUCCESS = 'postReducer/UPLOAD_POST_SUCCESS';
const UPLOAD_POST_FAIL = 'postReducer/UPLOAD_POST_FAIL';

const DELETE_POST_SUCCESS = 'postReducer/DELETE_POST_SUCCESS';
const DELETE_POST_FAIL = 'postReducer/DELETE_POST_FAIL';

const LIKE_POST_SUCCESS = 'postReducer/LIKE_POST_SUCCESS';
const LIKE_POST_FAIL = 'postReducer/LIKE_POST_FAIL';

const DELIKE_POST_SUCCESS = 'postReducer/DELIKE_POST_SUCCESS';
const DELIKE_POST_FAIL = 'postReducer/DELIKE_POST_FAIL';

const initialState = {
  feed: null,
};

export const getAllPostsSuccess = (payload) => ({
  type: GET_ALLPOSTS_SUCCESS,
  payload,
});

export const getAllPostsFail = () => ({
  type: GET_ALLPOSTS_FAIL,
});

export const getUserPostSuccess = (payload) => ({
  type: GET_USER_POST_SUCCESS,
  payload,
});

export const getUserPostFail = () => ({
  type: GET_USER_POST_FAIL,
});

export const clickPostSuccess = (payload) => ({
  type: CLICK_POST_SUCCESS,
  payload,
});

export const clickPostFail = () => ({
  type: CLICK_POST_FAIL,
});

export const uploadPostSuccess = (payload) => ({
  type: UPLOAD_POST_SUCCESS,
  payload,
});

export const uploadPostFail = () => ({
  type: UPLOAD_POST_FAIL,
});

export const deletePostSuccess = () => ({
  type: DELETE_POST_SUCCESS,
});

export const deletePostFail = () => ({
  type: DELETE_POST_FAIL,
});

export const likePostSuccess = (payload) => ({
  type: LIKE_POST_SUCCESS,
  payload,
});

export const likePostFail = () => ({
  type: LIKE_POST_FAIL,
});

export const delikePostSuccess = (payload) => ({
  type: DELIKE_POST_SUCCESS,
  payload,
});

export const delikePostFail = () => ({
  type: DELIKE_POST_FAIL,
});

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALLPOSTS_FAIL:
    case UPLOAD_POST_SUCCESS:
    case UPLOAD_POST_FAIL:
      return {
        ...state, //
      };
    case GET_ALLPOSTS_SUCCESS:
      return { ...state, feed: action.payload };
    default:
      return state;
  }
}
