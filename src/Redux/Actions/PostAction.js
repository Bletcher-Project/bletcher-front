import {
  INIT,
  POST_LIKE,
  SKETCHER,
  POST_ONE,
  POST_API,
} from 'Constants/api-uri';
import {
  getAllPostsFail,
  getAllPostsSuccess,
  getUserPostSuccess,
  getUserPostFail,
  clickPostSuccess,
  clickPostFail,
  uploadPostSuccess,
  uploadPostFail,
  likePostSuccess,
  likePostFail,
  delikePostFail,
  delikePostSuccess,
} from '../Reducers/postReducer';

export const getAllPosts = (token) => {
  // eslint-disable-next-line consistent-return
  return async (dispatch) => {
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
      let result = null;
      if (response.status === 200) {
        result = await response.json();
        await dispatch(getAllPostsSuccess(result.posts));
      } else {
        await dispatch(getAllPostsFail());
      }
      return result ? result.posts : null;
    } catch (error) {
      dispatch(getAllPostsFail());
    }
  };
};

export const getPostByUserId = (userId, token) => {
  // eslint-disable-next-line consistent-return
  return async (dispatch) => {
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
      let result = null;
      if (response.status === 200) {
        result = await response.json();
        await dispatch(getUserPostSuccess());
      } else {
        await dispatch(getUserPostFail());
      }
      return result ? result.posts : null;
    } catch (error) {
      dispatch(getUserPostFail());
    }
  };
};

export const getPostByPostId = (postId, token) => {
  return async (dispatch) => {
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
      let result = null;
      if (response.status === 200) {
        result = await response.json();
        await dispatch(clickPostSuccess(result.post));
      } else {
        await dispatch(clickPostFail());
      }
      return result ? result.post : null;
    } catch (error) {
      dispatch(clickPostFail());
    }
  };
};

export const uploadPost = (payload, token) => {
  return async (dispatch) => {
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
      let result = null;
      if (response.status === 200) {
        result = await response.json();
        await dispatch(uploadPostSuccess(result));
      }
    } catch (err) {
      dispatch(uploadPostFail());
    }
    return { type: 'UPLOAD_POST_SUCCESS' };
  };
};

export const uploadSketcherPost = (payload, token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}${INIT}${POST_API}${SKETCHER}`,
        {
          method: 'POST',
          headers: { 'x-access-token': token },
          body: payload,
        },
      );
      let result = null;
      if (response.status === 200) {
        result = await response.json();
        await dispatch(uploadPostSuccess(result));
      }
      return { type: 'UPLOAD_POST_SUCCESS' };
    } catch (err) {
      dispatch(uploadPostFail());
    }
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
      let result = null;
      if (response.status === 200) {
        result = await response.json();
        await dispatch(likePostSuccess(result));
      } else {
        await dispatch(likePostFail());
      }
      return result;
    } catch (error) {
      dispatch(likePostFail());
    }
  };
};

export const deleteLike = (postId, token) => {
  return async (dispatch) => {
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
      let result = null;
      if (response.status === 200) {
        result = await response.json();
        await dispatch(delikePostSuccess(result));
      } else {
        await dispatch(delikePostFail());
      }
      return result;
    } catch (error) {
      dispatch(delikePostFail());
    }
  };
};
