import { createAction, handleActions as fetchPostReducer } from 'redux-actions';

import { INIT, POST_API } from 'Constants/api-uri';

const initialState = {
  mainPost: null,
  fundingPost: null,
};

const GET_MAIN_POSTS_SUCCESS = 'post/GET_MAIN_POSTS_SUCCESS';
const GET_MAIN_POSTS_FAIL = 'post/GET_MAIN_POSTS_FAIL';
const GET_FUNDING_POSTS_SUCCESS = 'post/GET_FUNDING_POSTS_SUCCESS';
const GET_FUNDING_POSTS_FAIL = 'post/GET_FUNDING_POSTS_FAIL';

export const getMainPostsSuccess = createAction(GET_MAIN_POSTS_SUCCESS); // result.posts
export const getMainPostsFail = createAction(GET_MAIN_POSTS_FAIL);
export const getFundingPostsSuccess = createAction(GET_FUNDING_POSTS_SUCCESS); // result.posts
export const getFundingPostsFail = createAction(GET_FUNDING_POSTS_FAIL);

export default fetchPostReducer(
  {
    [GET_MAIN_POSTS_SUCCESS]: (state, action) => {
      return { ...state, mainPost: action.payload };
    },
    [GET_MAIN_POSTS_FAIL]: (state) => {
      return { ...state };
    },
    [GET_FUNDING_POSTS_SUCCESS]: (state, action) => {
      return { ...state, fundingPost: action.payload };
    },
    [GET_FUNDING_POSTS_FAIL]: (state) => {
      return { ...state };
    },
  },
  initialState,
);

export const getMainPosts = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}${INIT}${POST_API}`,
        { method: 'GET' },
      );
      if (response.status === 200) {
        const result = await response.json();
        await dispatch(getMainPostsSuccess(result.data));
      }
      await dispatch(getMainPostsFail());
    } catch (error) {
      await dispatch(getMainPostsFail());
    }
  };
};

export const getFundingPosts = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}${INIT}${POST_API}`,
        { method: 'GET' },
      );
      // TO DO :: funding post get api
      if (response.status === 200) {
        const result = response.json();
        await dispatch(getFundingPostsSuccess(result.data));
        return result.data;
      }
      await dispatch(getFundingPostsSuccess());
      return null;
    } catch (error) {
      await dispatch(getFundingPostsFail());
      return null;
    }
  };
};
