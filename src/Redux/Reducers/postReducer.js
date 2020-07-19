import { createAction, handleActions as postReducer } from 'redux-actions';

const initialState = {
  feed: null,
};

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

export const getAllPostsSuccess = createAction(GET_ALLPOSTS_SUCCESS); // result.posts
export const getAllPostsFail = createAction(GET_ALLPOSTS_FAIL);
export const getUserPostSuccess = createAction(GET_USER_POST_SUCCESS);
export const getUserPostFail = createAction(GET_USER_POST_FAIL);
export const clickPostSuccess = createAction(CLICK_POST_SUCCESS); // result.post
export const clickPostFail = createAction(CLICK_POST_FAIL);
export const uploadPostSuccess = createAction(UPLOAD_POST_SUCCESS); // result
export const uploadPostFail = createAction(UPLOAD_POST_FAIL);
export const deletePostSuccess = createAction(DELETE_POST_SUCCESS);
export const deletePostFail = createAction(DELETE_POST_FAIL);
export const likePostSuccess = createAction(LIKE_POST_SUCCESS); // result
export const likePostFail = createAction(LIKE_POST_FAIL);
export const delikePostSuccess = createAction(DELIKE_POST_SUCCESS); // result
export const delikePostFail = createAction(DELIKE_POST_FAIL);

export default postReducer(
  {
    [GET_ALLPOSTS_SUCCESS]: (state, action) => {
      return { ...state, feed: action.payload };
    },
    [GET_ALLPOSTS_FAIL]: (state) => {
      return state;
    },

    [GET_USER_POST_SUCCESS]: (state) => {
      return state;
    },
    [GET_USER_POST_FAIL]: (state) => {
      return state;
    },

    [CLICK_POST_SUCCESS]: (state) => {
      return state;
    },
    [CLICK_POST_FAIL]: (state) => {
      return state;
    },

    [UPLOAD_POST_SUCCESS]: (state) => {
      return state;
    },
    [UPLOAD_POST_FAIL]: (state) => {
      return state;
    },

    [DELETE_POST_SUCCESS]: (state) => {
      return state;
    },
    [DELETE_POST_FAIL]: (state) => {
      return state;
    },

    [LIKE_POST_SUCCESS]: (state) => {
      return state;
    },
    [LIKE_POST_FAIL]: (state) => {
      return state;
    },

    [DELIKE_POST_SUCCESS]: (state) => {
      return state;
    },
    [DELIKE_POST_FAIL]: (state) => {
      return state;
    },
  },
  initialState,
);
