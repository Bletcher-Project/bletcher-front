import { createAction, handleActions as postReducer } from 'redux-actions';

import {
  INIT,
  POST_ONE,
  POST_API,
  USER_ONE,
  IMAGE_API,
  FAVORITE_API,
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

const ADD_FAVORITE = 'post/ADD_FAVORITE';
const DEL_FAVORITE = 'post/DEL_FAVORITE';

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
// TODO: Favorite Redux State
export const addFavorite = createAction(ADD_FAVORITE);
export const delFavorite = createAction(DEL_FAVORITE);

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
    [ADD_FAVORITE]: (state) => {
      return state;
    },
    [DEL_FAVORITE]: (state) => {
      return state;
    },
  },
  initialState,
);

export const getAllPosts = (token) => {
  return async (dispatch) => {
    let result;
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
        result = await response.json().then((res) => {
          return res.data;
        });
        await dispatch(getAllPostsSuccess(result));
      }
    } catch (error) {
      await dispatch(getAllPostsFail());
    }
    return result;
  };
};

export const getPostByUserId = (userInfo, token) => {
  return async (dispatch) => {
    let result;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}${INIT}${POST_API}${USER_ONE}/${userInfo}`,
        {
          method: 'GET',
          headers: {
            'x-access-token': token,
          },
        },
      );
      if (response.status === 200) {
        result = await response.json().then((res) => {
          return res.data;
        });
        await dispatch(getUserPostSuccess());
      }
    } catch (error) {
      await dispatch(getUserPostFail());
    }
    return result;
  };
};

export const getPostByPostId = (postId, token) => {
  return async (dispatch) => {
    let result;
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
        result = await response.json().then((res) => {
          return res.post;
        });
        await dispatch(clickPostSuccess(result));
      }
    } catch (error) {
      await dispatch(clickPostFail());
    }
    return result;
  };
};

export const uploadPost = (image, payload, token) => {
  return async (dispatch) => {
    try {
      const responseImage = await fetch(
        `${process.env.REACT_APP_SERVER_URL}${INIT}${IMAGE_API}${POST_API}`,
        {
          method: 'POST',
          headers: {
            'x-access-token': token,
          },
          body: image,
        },
      );
      const imgId = await responseImage.json().then((res) => {
        return res.data.id;
      });
      payload.append('image_id', imgId);
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
        const result = await response.json();
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
    if (response.status === 200) {
      return response;
    }
    return { type: 'DELETE_POST_SUCCESS' };
  } catch (err) {
    return { type: 'DELETE_POST_FAIL' };
  }
};

export const addFavoritePost = (postId, token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}${INIT}${FAVORITE_API}/${postId}`,
        {
          method: 'POST',
          headers: {
            'x-access-token': token,
          },
        },
      );
      if (response.status === 200) {
        await dispatch(addFavorite());
      } else {
        // TODO: add error action
      }
    } catch (error) {
      // TODO: add error action
    }
  };
};

export const deleteFavoritePost = (postId, token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}${INIT}${FAVORITE_API}/${postId}`,
        {
          method: 'DELETE',
          headers: {
            'x-access-token': token,
          },
        },
      );
      if (response.status === 200) {
        await dispatch(delFavorite());
      } else {
        // TODO: add error action
      }
    } catch (error) {
      // TODO: add error action
    }
  };
};
