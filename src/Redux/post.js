import { createAction, handleActions as postReducer } from 'redux-actions';

import {
  INIT,
  POST_API,
  IMAGE_API,
  FAVORITE_API,
  FUND_API,
  FUND_DUEDATE,
  MIX_API,
  FUND_COUNT,
} from 'Constants/api-uri';

const initialState = {
  mixState: {
    isMixing: false,
    mixId: null,
    progressIndex: 0,
    progressInterval: null,
    originId: null,
    recomposeFlag: false,
  },
  uploadState: {
    isUploading: false,
  },
  fundState: {
    fundFlag: false,
  },
};

const CLICK_POST_SUCCESS = 'post/CLICK_POST_SUCCESS';
const CLICK_POST_FAIL = 'post/CLICK_POST_FAIL';

const UPLOAD_POST_SUCCESS = 'post/UPLOAD_POST_SUCCESS';
const UPLOAD_POST_FAIL = 'post/UPLOAD_POST_FAIL';
const UPLOAD_POST_START = 'post/UPLOAD_POST_START';

const DELETE_POST_SUCCESS = 'post/DELETE_POST_SUCCESS';
const DELETE_POST_FAIL = 'post/DELETE_POST_FAIL';

const ADD_FAVORITE_SUCCESS = 'post/ADD_FAVORITE_SUCCESS';
const ADD_FAVORITE_FAIL = 'post/ADD_FAVORITE_FAIL';

const DEL_FAVORITE_SUCCESS = 'post/DEL_FAVORITE_SUCCESS';
const DEL_FAVORITE_FAIL = 'post/DEL_FAVORITE_FAIL';

const ADD_FUNDING_SUCCESS = 'post/ADD_FUNDING_SUCCESS';
const ADD_FUNDING_FAIL = 'post/ADD_FUNDING_FAIL';

const ACTIVATE_FUND_FLAG = 'post/ACTIVATE_FUND_FLAG';
const GET_DUE_DATE_SUCCESS = 'post/GET_DUE_DATE_SUCCESS';
const GET_DUE_DATE_FAIL = 'post/GET_DUE_DATE_FAIL';
const GET_FUND_COUNT_SUCCESS = 'post/GET_FUND_COUNT_SUCCESS';
const GET_FUND_COUNT_FAIL = 'post/GET_FUND_COUNT_FAIL';

const MIX_POST_SUCCESS = 'post/MIX_POST_SUCCESS';
const MIX_POST_FAIL = 'post/MIX_POST_FAIL';

const INCREASE_PB_INDEX = 'post/INCREASE_PB_INDEX';
const RECOMPOSE_MIXING = 'post/RECOMPOSE_MIXING';
const START_RECOMPOSE = 'post/START_RECOMPOSE';
const START_MIX = 'post/START_MIX';
const END_MIX = 'post/END_MIX';
const INIT_MIXSTATE = 'post/INIT_MIXSTATE';

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
export const activateFundFlag = createAction(ACTIVATE_FUND_FLAG);
export const getDueDateSuccess = createAction(GET_DUE_DATE_SUCCESS);
export const getDueDateFail = createAction(GET_DUE_DATE_FAIL);
export const getFundCountSuccess = createAction(GET_FUND_COUNT_SUCCESS);
export const getFundCountFail = createAction(GET_FUND_COUNT_FAIL);
export const mixPostSuccess = createAction(MIX_POST_SUCCESS);
export const mixPostFail = createAction(MIX_POST_FAIL);
export const increasePbIndex = createAction(INCREASE_PB_INDEX);
export const recomposeMixing = createAction(RECOMPOSE_MIXING);
export const startRecompose = createAction(START_RECOMPOSE);
export const uploadPostStart = createAction(UPLOAD_POST_START);
export const startMix = createAction(START_MIX);
export const endMix = createAction(END_MIX);
export const initMixState = createAction(INIT_MIXSTATE);

export default postReducer(
  {
    [CLICK_POST_SUCCESS]: (state) => {
      return state;
    },
    [CLICK_POST_FAIL]: (state) => {
      return state;
    },
    [UPLOAD_POST_SUCCESS]: (state) => {
      return {
        ...state,
        uploadState: {
          isUploading: false,
        },
      };
    },
    [UPLOAD_POST_FAIL]: (state) => {
      return {
        ...state,
        uploadState: {
          isUploading: false,
        },
      };
    },
    [UPLOAD_POST_START]: (state) => {
      return {
        ...state,
        uploadState: {
          isUploading: true,
        },
      };
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
      return {
        ...state,
        fundState: {
          fundFlag: false,
        },
      };
    },
    [ADD_FUNDING_FAIL]: (state) => {
      return state;
    },
    [ACTIVATE_FUND_FLAG]: (state, action) => {
      const { fundFlag } = action.payload;
      return {
        ...state,
        fundState: {
          fundFlag,
        },
      };
    },
    [GET_DUE_DATE_SUCCESS]: (state) => {
      return state;
    },
    [GET_DUE_DATE_FAIL]: (state) => {
      return state;
    },
    [GET_FUND_COUNT_SUCCESS]: (state) => {
      return state;
    },
    [GET_FUND_COUNT_FAIL]: (state) => {
      return state;
    },
    [MIX_POST_SUCCESS]: (state) => {
      return state;
    },
    [MIX_POST_FAIL]: (state) => {
      const { progressInterval } = state.mixState;
      clearInterval(progressInterval);
      return {
        ...state,
        mixState: {
          ...state.mixState,
          mixId: 0,
          progressInterval: null,
        },
      };
    },
    [INCREASE_PB_INDEX]: (state) => {
      if (state.mixState.progressIndex >= 5) return state;
      return {
        ...state,
        mixState: {
          ...state.mixState,
          progressIndex: state.mixState.progressIndex + 1,
        },
      };
    },
    [RECOMPOSE_MIXING]: (state) => {
      const { originId } = state.mixState;
      return {
        ...state,
        mixState: {
          ...initialState.mixState,
          originId,
          recomposeFlag: true,
        },
      };
    },
    [START_RECOMPOSE]: (state) => {
      return {
        ...state,
        mixState: {
          ...state.mixState,
          recomposeFlag: false,
        },
      };
    },
    [START_MIX]: (state, action) => {
      const { originId, interval } = action.payload;
      return {
        ...state,
        mixState: {
          ...state.mixState,
          originId,
          isMixing: true,
          progressInterval: interval,
        },
      };
    },
    [END_MIX]: (state, action) => {
      const { mixId, originId } = action.payload;
      const { progressInterval } = state.mixState;
      clearInterval(progressInterval);
      return {
        ...state,
        mixState: {
          ...state.mixState,
          mixId,
          originId,
          progressIndex: 0,
          progressInterval: null,
          isMixing: false,
        },
      };
    },
    [INIT_MIXSTATE]: (state) => {
      return { ...state, mixState: initialState.mixState };
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
      await dispatch(activateFundFlag(true));
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
      await dispatch(uploadPostStart());
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
        await dispatch(uploadPostSuccess());
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
      const interval = setInterval(() => {
        dispatch(increasePbIndex());
      }, 1000);
      await dispatch(startMix({ originId, interval }));
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
        const mixId = (await response.json()).data;
        await dispatch(endMix({ mixId, originId }));
      } else {
        await dispatch(mixPostFail());
      }
    } catch (error) {
      await dispatch(mixPostFail());
    }
  };
};

export const getDueDate = (postId) => {
  return async (dispatch) => {
    let dueDate = '';
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}${INIT}${FUND_API}${FUND_DUEDATE}/${postId}`,
        {
          method: 'GET',
        },
      );
      if (response.status === 200) {
        dueDate = await response.json().then((res) => res.data);
        await dispatch(getDueDateSuccess());
      } else await dispatch(getDueDateFail());
    } catch (error) {
      await dispatch(getDueDateFail());
    }
    return dueDate;
  };
};

export const getFundCount = (postId) => {
  return async (dispatch) => {
    let fundCount = 0;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}${INIT}${FUND_API}${FUND_COUNT}/${postId}`,
        {
          method: 'GET',
        },
      );

      if (response.status === 200) {
        fundCount = await response.json().then((res) => res.data.counts);
        await dispatch(getFundCountSuccess());
      } else await dispatch(getFundCountFail());
    } catch (error) {
      await dispatch(getFundCountFail());
    }
    return fundCount;
  };
};
