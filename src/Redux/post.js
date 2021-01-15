import { createAction, handleActions as postReducer } from 'redux-actions';

import {
  INIT,
  POST_API,
  IMAGE_API,
  FAVORITE_API,
  FUND_API,
  MIX_API,
} from 'Constants/api-uri';

const initialState = {
  mixState: {
    isMixing: false,
    mixId: null,
    progressIndex: 0,
    originId: null,
  },
};

const CLICK_POST_SUCCESS = 'post/CLICK_POST_SUCCESS';
const CLICK_POST_FAIL = 'post/CLICK_POST_FAIL';

const UPLOAD_POST_SUCCESS = 'post/UPLOAD_POST_SUCCESS';
const UPLOAD_POST_FAIL = 'post/UPLOAD_POST_FAIL';

const DELETE_POST_SUCCESS = 'post/DELETE_POST_SUCCESS';
const DELETE_POST_FAIL = 'post/DELETE_POST_FAIL';

const ADD_FAVORITE_SUCCESS = 'post/ADD_FAVORITE_SUCCESS';
const ADD_FAVORITE_FAIL = 'post/ADD_FAVORITE_FAIL';

const DEL_FAVORITE_SUCCESS = 'post/DEL_FAVORITE_SUCCESS';
const DEL_FAVORITE_FAIL = 'post/DEL_FAVORITE_FAIL';

const ADD_FUNDING_SUCCESS = 'post/ADD_FUNDING_SUCCESS';
const ADD_FUNDING_FAIL = 'post/ADD_FUNDING_FAIL';

const MIX_POST_SUCCESS = 'post/MIX_POST_SUCCESS';
const MIX_POST_FAIL = 'post/MIX_POST_FAIL';

const MODIFY_IS_MIXING = 'post/MODIFY_IS_MIXING';
const INCREASE_PB_INDEX = 'post/INCREASE_PB_INDEX';
const RECOMPOSE_MIXING = 'post/RECOMPOSE_MIXING';

export const clickPostSuccess = createAction(CLICK_POST_SUCCESS); // result.post
export const clickPostFail = createAction(CLICK_POST_FAIL);
export const uploadPostSuccess = createAction(UPLOAD_POST_SUCCESS); // result
export const uploadPostFail = createAction(UPLOAD_POST_FAIL);
export const deletePostSuccess = createAction(DELETE_POST_SUCCESS);
export const deletePostFail = createAction(DELETE_POST_FAIL);
export const addFavoriteSuccess = createAction(ADD_FAVORITE_SUCCESS);
export const addFavoriteFail = createAction(ADD_FAVORITE_FAIL);
export const delFavoriteSuccess = createAction(DEL_FAVORITE_SUCCESS);
export const delFavoriteFail = createAction(DEL_FAVORITE_FAIL);
export const addFundingSuccess = createAction(ADD_FUNDING_SUCCESS);
export const addFundingFail = createAction(ADD_FUNDING_FAIL);
export const mixPostSuccess = createAction(MIX_POST_SUCCESS);
export const mixPostFail = createAction(MIX_POST_FAIL);
export const modifyIsMixing = createAction(MODIFY_IS_MIXING);
export const increasePbIndex = createAction(INCREASE_PB_INDEX);
export const recomposeMixing = createAction(RECOMPOSE_MIXING);

export default postReducer(
  {
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
    [ADD_FAVORITE_SUCCESS]: (state) => {
      return state;
    },
    [ADD_FAVORITE_FAIL]: (state) => {
      return state;
    },
    [DEL_FAVORITE_SUCCESS]: (state) => {
      return state;
    },
    [DEL_FAVORITE_FAIL]: (state) => {
      return state;
    },
    [ADD_FUNDING_SUCCESS]: (state) => {
      return state;
    },
    [ADD_FUNDING_FAIL]: (state) => {
      return state;
    },
    [MIX_POST_SUCCESS]: (state) => {
      return state;
    },
    [MIX_POST_FAIL]: (state) => {
      return {
        ...state,
        mixState: {
          ...state.mixState,
          mixId: 0,
        },
      };
    },
    [MODIFY_IS_MIXING]: (state, action) => {
      const { isMixing, mixId, originId } = action.payload;
      return {
        ...state,
        mixState: {
          ...state.mixState,
          isMixing,
          mixId,
          originId,
        },
      };
    },
    [INCREASE_PB_INDEX]: (state) => {
      const incFlag = state.mixState.progressIndex < 5;
      return {
        ...state,
        mixState: {
          ...state.mixState,
          progressIndex: incFlag
            ? state.mixState.progressIndex + 1
            : state.mixState.progressIndex,
        },
      };
    },
    [RECOMPOSE_MIXING]: (state) => {
      const { originId } = state.mixState;
      return {
        ...initialState,
        mixState: {
          ...initialState,
          originId,
        },
      };
    },
  },
  initialState,
);

export const getPostByPostId = (postId, token) => {
  return async (dispatch) => {
    let result;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}${INIT}${POST_API}/${postId}`,
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
        await dispatch(clickPostSuccess(result));
      }
    } catch (error) {
      await dispatch(clickPostFail());
    }
    return result;
  };
};

export const addFundingPost = (postId, token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}${INIT}${FUND_API}/${postId}`,
        {
          method: 'POST',
          headers: {
            'x-access-token': token,
          },
        },
      );
      if (response.status === 200) await dispatch(addFundingSuccess());
      else await dispatch(addFundingFail());
    } catch (error) {
      await dispatch(addFundingFail());
    }
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
        await dispatch(addFundingPost(result.data.id, token));
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
        await dispatch(addFavoriteSuccess());
      } else {
        await dispatch(addFavoriteFail());
      }
    } catch (error) {
      await dispatch(addFavoriteFail());
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
        await dispatch(delFavoriteSuccess());
      } else {
        await dispatch(delFavoriteFail());
      }
    } catch (error) {
      await dispatch(delFavoriteFail());
    }
  };
};

export const mixPost = (originId, subId, token) => {
  return async (dispatch) => {
    try {
      const { mixState } = initialState;
      await dispatch(modifyIsMixing({ ...mixState, isMixing: true, originId }));
      let mixId = null;
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}${INIT}${MIX_API}/${originId}/${subId}`,
        {
          method: 'POST',
          headers: {
            'x-access-token': token,
          },
        },
      );
      if (response.status === 200) {
        await dispatch(mixPostSuccess());
        mixId = (await response.json()).data;
        await dispatch(
          modifyIsMixing({
            isMixing: false,
            mixId,
            progressIndex: 0,
            originId,
          }),
        );
      } else {
        await dispatch(mixPostFail());
      }
    } catch (error) {
      await dispatch(mixPostFail());
    }
  };
};
