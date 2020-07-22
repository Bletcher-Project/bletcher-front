import { createAction, handleActions as postReducer } from 'redux-actions';

import {
  INIT,
  POST_LIKE,
  SKETCHER,
  POST_ONE,
  POST_API,
} from 'Constants/api-uri';

const initialState = {
  feed: null,
};

const GET_ALLPOSTS_SUCCESS = 'post/GET_ALLPOSTS_SUCCESS';
const GET_ALLPOSTS_FAIL = 'post/GET_ALLPOSTS_FAIL';

const GET_USER_POST_SUCCESS = 'post/GET_USER_POST_SUCCESS';
const GET_USER_POST_FAIL = 'post/GET_USER_POST_SUCCESS';

const CLICK_POST_SUCCESS = 'post/CLICK_POST_SUCCESS';
const CLICK_POST_FAIL = 'post/CLICK_POST_FAIL';

const UPLOAD_POST_SUCCESS = 'post/UPLOAD_POST_SUCCESS';
const UPLOAD_POST_FAIL = 'post/UPLOAD_POST_FAIL';

const DELETE_POST_SUCCESS = 'post/DELETE_POST_SUCCESS';
const DELETE_POST_FAIL = 'post/DELETE_POST_FAIL';

const LIKE_POST_SUCCESS = 'post/LIKE_POST_SUCCESS';
const LIKE_POST_FAIL = 'post/LIKE_POST_FAIL';

const DELIKE_POST_SUCCESS = 'post/DELIKE_POST_SUCCESS';
const DELIKE_POST_FAIL = 'post/DELIKE_POST_FAIL';

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

export const getAllPosts = (token) => {
  return async (dispatch) => {
    let result = {
      posts: '',
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}${INIT}${POST_API}`,
        {
          method: 'GET',
          headers: {
            'x-access-token': token,
          },
        },
      );
      if (response.status === 200) {
        result = await response.json();
        await dispatch(getAllPostsSuccess(result.posts));
      }
    } catch (error) {
      await dispatch(getAllPostsFail());
    }
    return result.posts;
  };
};

export const getPostByUserId = (userId, token) => {
  return async (dispatch) => {
    let result = {
      posts: '',
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}${INIT}${POST_API}/${userId}`,
        {
          method: 'GET',
          headers: {
            'x-access-token': token,
          },
        },
      );
      if (response.status === 200) {
        result = await response.json();
        await dispatch(getUserPostSuccess());
      }
    } catch (error) {
      await dispatch(getUserPostFail());
    }
    return result.posts;
  };
};

export const getPostByPostId = (postId, token) => {
  return async (dispatch) => {
    let result = {
      posts: '',
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}${INIT}${POST_API}${POST_ONE}/${postId}`,
        {
          method: 'GET',
          headers: {
            'x-access-token': token,
          },
        },
      );
      if (response.status === 200) {
        result = await response.json();
        await dispatch(clickPostSuccess(result.post));
      }
    } catch (error) {
      await dispatch(clickPostFail());
    }
    return result.post;
  };
};

export const uploadPost = (payload, token) => {
  return async (dispatch) => {
    let result = null;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}${INIT}${POST_API}`,
        {
          method: 'POST',
          headers: {
            'x-access-token': token,
          },
          body: payload,
        },
      );
      if (response.status === 200) {
        result = await response.json();
        await dispatch(uploadPostSuccess(result));
      }
    } catch (err) {
      await dispatch(uploadPostFail());
    }
    return { type: 'UPLOAD_POST_SUCCESS' };
  };
};

export const uploadSketcherPost = (payload, token) => {
  return async (dispatch) => {
    let result = null;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}${INIT}${POST_API}${SKETCHER}`,
        {
          method: 'POST',
          headers: { 'x-access-token': token },
          body: payload,
        },
      );
      if (response.status === 200) {
        result = await response.json();
        await dispatch(uploadPostSuccess(result));
      }
    } catch (err) {
      await dispatch(uploadPostFail());
    }
    return { type: 'UPLOAD_POST_SUCCESS' };
  };
};

export const deletePost = (id, token) => {
  try {
    const response = fetch(
      `${process.env.REACT_APP_SERVER_URL}${INIT}${POST_API}/${id}`,
      {
        method: 'DELETE',
        headers: {
          'x-access-token': token,
        },
      },
    );
    if (response.statue === 200) {
      return response;
    }
    return { type: 'DELETE_POST_SUCCESS' };
  } catch (err) {
    return { type: 'DELETE_POST_FAIL' };
  }
};

export const postLike = (postId, token) => {
  return async (dispatch) => {
    let result = null;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}${INIT}${POST_API}${POST_LIKE}/${postId}`,
        {
          method: 'POST',
          headers: {
            'x-access-token': token,
          },
        },
      );
      if (response.status === 200) {
        result = await response.json();
        await dispatch(likePostSuccess(result));
      }
    } catch (error) {
      await dispatch(likePostFail());
    }
    return result;
  };
};

export const deleteLike = (postId, token) => {
  return async (dispatch) => {
    let result = null;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}${INIT}${POST_API}${POST_LIKE}/${postId}`,
        {
          method: 'DELETE',
          headers: {
            'x-access-token': token,
          },
        },
      );
      if (response.status === 200) {
        result = await response.json();
        await dispatch(delikePostSuccess(result));
      }
    } catch (error) {
      await dispatch(delikePostFail());
    }
    return result;
  };
};
