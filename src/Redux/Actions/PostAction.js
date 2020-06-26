
import axios from "axios";
import {
  SUCCEED_TO_GET_ALLPOST,
  FAILED_TO_GET_ALLPOST,
  SUCCEED_TO_GET_POST_BY_USERID,
  FAILED_TO_GET_POST_BY_USERID,
  SUCCEED_TO_GET_POST_BY_POSTID,
  FAILED_TO_GET_POST_BY_POSTID,
  SUCCEED_TO_UPLOAD_POST,
  FAILED_TO_UPLOAD_POST,
  SUCCEED_TO_DELETE_POST,
  FAILED_TO_DELETE_POST,
  SUCCEED_TO_POST_LIKE,
  FAILED_TO_POST_LIKE,
  SUCCEED_TO_DELETE_LIKE,
  FAILED_TO_DELETE_LIKE,
} from "../Constants/action-types";

export const getAllPosts = (token) => {
  return async (dispatch) => {
    try {
      let response = await fetch(process.env.REACT_APP_SERVER_URL + "api/posts", {
        method: "GET",
        headers: {
          "x-access-token": token,
        },
      });
      if (response.status === 200) {
        let result = await response.json();
        await dispatch({
          type: SUCCEED_TO_GET_ALLPOST,
          payload: result.posts,
        });
        return result.posts;
      } else {
        await dispatch({
          type: FAILED_TO_GET_ALLPOST,
          payload: null,
        });
      }
    } catch (error) {
      dispatch({
        type: FAILED_TO_GET_ALLPOST,
        payload: { data: "NETWORK_ERROR" },
      });
    }
  };
};

export const getPostByUserId = (userId, token) => {
  return async (dispatch) => {
    try {
      let response = await fetch(process.env.REACT_APP_SERVER_URL + `api/posts/${userId}`, {
        method: "GET",
        headers: {
          "x-access-token": token,
        },
      });
      if (response.status === 200) {
        let result = await response.json();
        await dispatch({
          type: SUCCEED_TO_GET_POST_BY_USERID,
          payload: result.posts,
        });
        return result.posts;
      } else {
        await dispatch({
          type: FAILED_TO_GET_POST_BY_USERID,
          payload: null,
        });
      }
    } catch (error) {
      dispatch({
        type: FAILED_TO_GET_POST_BY_USERID,
        payload: { data: "NETWORK_ERROR" },
      });
    }
  };
};

export const getPostByPostId = (postId, token) => {
  return async (dispatch) => {
    try {
      let response = await fetch(process.env.REACT_APP_SERVER_URL + `api/posts/one/${postId}`, {
        method: "GET",
        headers: {
          "x-access-token": token,
        },
      });
      if (response.status === 200) {
        let result = await response.json();
        await dispatch({
          type: SUCCEED_TO_GET_POST_BY_POSTID,
          payload: result.post,
        });
        return result.post;
      } else {
        await dispatch({
          type: FAILED_TO_GET_POST_BY_POSTID,
          payload: null,
        });
      }
    } catch (error) {
      dispatch({
        type: FAILED_TO_GET_POST_BY_POSTID,
        payload: { data: "NETWORK_ERROR" },
      });
    }
  };
};

export const uploadPost = (payload, token) => {
  return async (dispatch) => {
    await axios
      .post(process.env.REACT_APP_SERVER_URL + "api/posts", payload, {
        headers: { "x-access-token": token },
      })
      .then((res) => {
        dispatch({ type: SUCCEED_TO_UPLOAD_POST });
      })
      .catch((err) => {
        dispatch({ type: FAILED_TO_UPLOAD_POST });
      });

    return { type: SUCCEED_TO_UPLOAD_POST };
  };
};

export const uploadSketcherPost = (payload, token) => {
  return async (dispatch) => {
    await axios
      .post(process.env.REACT_APP_SERVER_URL + "api/posts/sketcher", payload, {
        headers: { "x-access-token": token },
      })
      .then((res) => {
        dispatch({ type: SUCCEED_TO_UPLOAD_POST });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: FAILED_TO_UPLOAD_POST });
      });

    return { type: SUCCEED_TO_UPLOAD_POST };
  };
};

export const deletePost = (id, token) => {
  axios
    .delete(process.env.REACT_APP_SERVER_URL + "api/posts/" + id, {
      headers: { "x-access-token": token },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return { type: FAILED_TO_DELETE_POST };
    });

  return { type: SUCCEED_TO_DELETE_POST };
};

export const postLike = (postId, token) => {
  return async (dispatch) => {
    try {
      let response = await fetch(process.env.REACT_APP_SERVER_URL + `api/posts/like/${postId}`, {
        method: "POST",
        headers: {
          "x-access-token": token,
        },
      });
      if (response.status === 200) {
        let result = await response.json();
        await dispatch({
          type: SUCCEED_TO_POST_LIKE,
          payload: result,
        });
        return result;
      } else {
        await dispatch({
          type: FAILED_TO_POST_LIKE,
          payload: null,
        });
      }
    } catch (error) {
      dispatch({
        type: FAILED_TO_POST_LIKE,
        payload: { data: "NETWORK_ERROR" },
      });
    }
  };
};

export const deleteLike = (postId, token) => {
  return async (dispatch) => {
    try {
      let response = await fetch(process.env.REACT_APP_SERVER_URL + `api/posts/like/${postId}`, {
        method: "DELETE",
        headers: {
          "x-access-token": token,
        },
      });
      if (response.status === 200) {
        let result = await response.json();
        await dispatch({
          type: SUCCEED_TO_DELETE_LIKE,
          payload: result,
        });
        return result;
      } else {
        await dispatch({
          type: FAILED_TO_DELETE_LIKE,
          payload: null,
        });
      }
    } catch (error) {
      dispatch({
        type: FAILED_TO_DELETE_LIKE,
        payload: { data: "NETWORK_ERROR" },
      });
    }
  };
};
