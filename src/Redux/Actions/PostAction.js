import { ServerEndPoint } from "../../Configs/Server";

import axios from "axios";
import {
  SUCCEED_TO_GET_ALLPOST,
  FAILED_TO_GET_ALLPOST,
  SUCCEED_TO_UPLOAD_POST,
  FAILED_TO_UPLOAD_POST,
  SUCCEED_TO_DELETE_POST,
  FAILED_TO_DELETE_POST
} from "../Constants/action-types";

export const getAllPosts = () => {
  return async dispatch => {
    try {
      let response = await fetch(ServerEndPoint + "api/posts", {
        method: "GET"
      });
      if (response.status === 200) {
        let result = await response.json();
        await dispatch({
          type: SUCCEED_TO_GET_ALLPOST,
          payload: result.posts
        });
        return result.posts;
      } else {
        await dispatch({
          type: FAILED_TO_GET_ALLPOST,
          payload: null
        });
      }
    } catch (error) {
      dispatch({
        type: FAILED_TO_GET_ALLPOST,
        payload: { data: "NETWORK_ERROR" }
      });
    }
  };
};

export const uploadPost = payload => {
  return async dispatch => {
    await axios
      .post(ServerEndPoint + "api/posts", payload)
      .then(res => {})
      .catch(err => {
        dispatch({ type: FAILED_TO_UPLOAD_POST });
      });

    return { type: SUCCEED_TO_UPLOAD_POST };
  };
};

export const deletePost = id => {
  axios
    .delete(ServerEndPoint + "api/posts/" + id)
    .then(res => {
      return res;
    })
    .catch(err => {
      return { type: FAILED_TO_DELETE_POST };
    });

  return { type: SUCCEED_TO_DELETE_POST };
};
