import axios from 'axios';
import * as constant from '../../Constants/api_uri';
import { getApiPathPost, getAction } from '../utils/util';

const SUCCEED_TO_GET_ALLPOST = 'SUCCEED_TO_GET_ALLPOST';
const FAILED_TO_GET_ALLPOST = 'FAILED_TO_GET_ALLPOST';
const SUCCEED_TO_GET_POST_BY_USERID = 'SUCCEED_TO_GET_POST_BY_USERID';
const FAILED_TO_GET_POST_BY_USERID = 'FAILED_TO_GET_POST_BY_USERID';
const SUCCEED_TO_GET_POST_BY_POSTID = 'SUCCEED_TO_GET_POST_BY_POSTID';
const FAILED_TO_GET_POST_BY_POSTID = 'FAILED_TO_GET_POST_BY_POSTID';
const SUCCEED_TO_UPLOAD_POST = 'SUCCEED_TO_UPLOAD_POST';
const FAILED_TO_UPLOAD_POST = 'FAILED_TO_UPLOAD_POST';
const SUCCEED_TO_DELETE_POST = 'SUCCEED_TO_DELETE_POST';
const FAILED_TO_DELETE_POST = 'FAILED_TO_DELETE_POST';
const SUCCEED_TO_POST_LIKE = 'SUCCEED_TO_POST_LIKE';
const FAILED_TO_POST_LIKE = 'FAILED_TO_POST_LIKE';
const SUCCEED_TO_DELETE_LIKE = 'SUCCEED_TO_DELETE_LIKE';
const FAILED_TO_DELETE_LIKE = 'FAILED_TO_DELETE_LIKE';

export const getAllPosts = (token) => {
  // eslint-disable-next-line consistent-return
  return async (dispatch) => {
    try {
      const response = await fetch(getApiPathPost('USER_POSTS'), {
        method: 'GET',
        headers: {
          'x-access-token': token,
        },
      });
      let result = null;
      if (response.status === 200) {
        result = await response.json();
        await dispatch(getAction(SUCCEED_TO_GET_ALLPOST, result.posts));
      } else {
        await dispatch(getAction(FAILED_TO_GET_ALLPOST, null));
      }
      return result ? result.posts : null;
    } catch (error) {
      dispatch(getAction(FAILED_TO_GET_ALLPOST, { data: 'NETWORK_ERROR' }));
    }
  };
};

export const getPostByUserId = (userId, token) => {
  // eslint-disable-next-line consistent-return
  return async (dispatch) => {
    try {
      const response = await fetch(`${getApiPathPost('USER_POSTS')}${userId}`, {
        method: 'GET',
        headers: {
          'x-access-token': token,
        },
      });
      let result = null;
      if (response.status === 200) {
        result = await response.json();
        await dispatch(getAction(SUCCEED_TO_GET_POST_BY_USERID, result.posts));
      } else {
        await dispatch(getAction(FAILED_TO_GET_POST_BY_USERID, null));
      }
      return result ? result.posts : null;
    } catch (error) {
      dispatch(
        getAction(FAILED_TO_GET_POST_BY_USERID, { data: 'NETWORK_ERROR' }),
      );
    }
  };
};

export const getPostByPostId = (postId, token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${getApiPathPost('USER_POSTS') + constant.ONE_API}${postId}`,
        {
          method: 'GET',
          headers: {
            'x-access-token': token,
          },
        },
      );
      let result = null;
      if (response.status === 200) {
        result = await response.json();
        await dispatch(getAction(SUCCEED_TO_GET_POST_BY_POSTID, result.post));
      } else {
        await dispatch(getAction(FAILED_TO_GET_POST_BY_POSTID, null));
      }
      return result ? result.post : null;
    } catch (error) {
      dispatch(
        getAction(FAILED_TO_GET_POST_BY_POSTID, { data: 'NETWORK_ERROR' }),
      );
    }
  };
};

export const uploadPost = (payload, token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(getApiPathPost('USER_POSTS'), {
        method: 'POST',
        headers: {
          'x-access-token': token,
        },
        body: payload,
      });
      let result = null;
      if (response.status === 200) {
        result = await response.json();
        await dispatch({ type: SUCCEED_TO_UPLOAD_POST });
      }
    } catch (err) {
      dispatch({ type: FAILED_TO_UPLOAD_POST });
    }
    return { type: SUCCEED_TO_UPLOAD_POST };
  };
};

export const uploadSketcherPost = (payload, token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        getApiPathPost('USER_POSTS') + constant.SKETCHER_API,
        {
          method: 'POST',
          headers: { 'x-access-token': token },
          body: payload,
        },
      );
      let result = null;
      if (response.status === 200) {
        result = await response.json();
        await dispatch({ type: SUCCEED_TO_UPLOAD_POST });
      }
      return { type: SUCCEED_TO_UPLOAD_POST };
    } catch (err) {
      dispatch({ type: FAILED_TO_UPLOAD_POST });
    }
  };
};

export const deletePost = (id, token) => {
  try {
    const response = fetch(getApiPathPost('USER_POSTS') + id, {
      method: 'DELETE',
      headers: {
        'x-access-token': token,
      },
    });
    const result = null;
    if (response.statue === 200) {
      return response;
    }
    return { type: SUCCEED_TO_DELETE_POST };
  } catch (err) {
    return { type: FAILED_TO_DELETE_POST };
  }
};

export const postLike = (postId, token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${getApiPathPost('USER_POSTS') + constant.LIKE_API}${postId}`,
        {
          method: 'POST',
          headers: {
            'x-access-token': token,
          },
        },
      );
      let result = null;
      if (response.status === 200) {
        result = await response.json();
        await dispatch(getAction(SUCCEED_TO_POST_LIKE, result));
      } else {
        await dispatch(getAction(FAILED_TO_POST_LIKE, null));
      }
      return result;
    } catch (error) {
      dispatch(getAction(FAILED_TO_POST_LIKE, { data: 'NETWORK_ERROR' }));
    }
  };
};

export const deleteLike = (postId, token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${getApiPathPost('USER_POSTS') + constant.LIKE_API}${postId}`,
        {
          method: 'DELETE',
          headers: {
            'x-access-token': token,
          },
        },
      );
      let result = null;
      if (response.status === 200) {
        result = await response.json();
        await dispatch(getAction(SUCCEED_TO_DELETE_LIKE, result));
      } else {
        await dispatch(getAction(FAILED_TO_DELETE_LIKE, null));
      }
      return result;
    } catch (error) {
      dispatch(getAction(FAILED_TO_DELETE_LIKE, { data: 'NETWORK_ERROR' }));
    }
  };
};
