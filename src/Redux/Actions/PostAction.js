import { ServerEndPoint } from "../../Configs/Server";

import {
  SUCCEED_TO_GET_ALLPOST,
  FAILED_TO_GET_ALLPOST
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
  }
}