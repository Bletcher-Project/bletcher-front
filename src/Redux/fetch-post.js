import { createAction, handleActions as fetchPostReducer } from 'redux-actions';

import {
  INIT,
  POST_API,
  MY,
  FAVORITE_API,
  USER_REQ_GROUP,
  FUND_API,
  FUND_ONGOING,
  FUND_END,
} from 'Constants/api-uri';
import FILTER from 'Constants/filter-option';

const initialState = {
  mainPost: [],
  newPost: [],
  fundingPosts: {
    onGoingPost: [],
    endPost: [],
  },
  favoritePost: [],
  userPosts: {
    me: [],
    madeByMe: [],
    usedByMe: [],
  },
};

const GET_MAIN_POSTS_SUCCESS = 'post/GET_MAIN_POSTS_SUCCESS';
const GET_MAIN_POSTS_FAIL = 'post/GET_MAIN_POSTS_FAIL';

const GET_NEW_POSTS_SUCCESS = 'post/GET_NEW_POSTS_SUCCESS';
const GET_NEW_POSTS_FAIL = 'post/GET_NEW_POSTS_FAIL';

const GET_FUNDING_POSTS_SUCCESS = 'post/GET_FUNDING_POSTS_SUCCESS';
const GET_FUNDING_POSTS_FAIL = 'post/GET_FUNDING_POSTS_FAIL';

const GET_FAVORITE_POSTS_SUCCESS = 'post/GET_FAVORITE_POSTS_SUCCESS';
const GET_FAVORITE_POSTS_FAIL = 'post/GET_FAVORITE_POSTS_FAIL';

const GET_USER_POSTS_SUCCESS = [
  'post/GET_USER_POSTS_ME_SUCCESS',
  'post/GET_USER_POSTS_MADEBYME_SUCCESS',
  'post/GET_USER_POSTS_USEDBYME_SUCCESS',
];
const GET_USER_POSTS_FAIL = [
  'post/GET_USER_POSTS_ME_FAIL',
  'post/GET_USER_POSTS_MADEBYME_FAIL',
  'post/GET_USER_POSTS_USEDBYME_FAIL',
];

export const getMainPostsSuccess = createAction(GET_MAIN_POSTS_SUCCESS); // result.data
export const getMainPostsFail = createAction(GET_MAIN_POSTS_FAIL);
export const getNewPostsSuccess = createAction(GET_NEW_POSTS_SUCCESS); // result.data
export const getNewPostsFail = createAction(GET_NEW_POSTS_FAIL);
export const getFundingPostsSuccess = createAction(GET_FUNDING_POSTS_SUCCESS); // result.data
export const getFundingPostsFail = createAction(GET_FUNDING_POSTS_FAIL);
export const getFavoritePostsSuccess = createAction(GET_FAVORITE_POSTS_SUCCESS); // result.data
export const getFavoritePostsFail = createAction(GET_FAVORITE_POSTS_FAIL);
export const getUserPostSuccess = [
  createAction(GET_USER_POSTS_SUCCESS[0]),
  createAction(GET_USER_POSTS_SUCCESS[1]),
  createAction(GET_USER_POSTS_SUCCESS[2]),
];
export const getUserPostFail = [
  createAction(GET_USER_POSTS_FAIL[0]),
  createAction(GET_USER_POSTS_FAIL[1]),
  createAction(GET_USER_POSTS_FAIL[2]),
];

export default fetchPostReducer(
  {
    [GET_MAIN_POSTS_SUCCESS]: (state, action) => {
      return { ...state, mainPost: action.payload };
    },
    [GET_MAIN_POSTS_FAIL]: (state) => {
      return { ...state };
    },
    [GET_NEW_POSTS_SUCCESS]: (state, action) => {
      return { ...state, newPost: action.payload };
    },
    [GET_NEW_POSTS_FAIL]: (state) => {
      return { ...state };
    },
    [GET_FUNDING_POSTS_SUCCESS]: (state, action) => {
      return { ...state, fundingPosts: action.payload };
    },
    [GET_FUNDING_POSTS_FAIL]: (state) => {
      return { ...state };
    },
    [GET_FAVORITE_POSTS_SUCCESS]: (state, action) => {
      return { ...state, favoritePost: action.payload };
    },
    [GET_FAVORITE_POSTS_FAIL]: (state) => {
      return { ...state };
    },
    [GET_USER_POSTS_SUCCESS[0]]: (state, action) => {
      return {
        ...state,
        userPosts: { ...state.userPosts, me: action.payload },
      };
    },
    [GET_USER_POSTS_FAIL[0]]: (state) => {
      return { ...state };
    },
    [GET_USER_POSTS_SUCCESS[1]]: (state, action) => {
      return {
        ...state,
        userPosts: { ...state.userPosts, madeByMe: action.payload },
      };
    },
    [GET_USER_POSTS_FAIL[1]]: (state) => {
      return { ...state };
    },
    [GET_USER_POSTS_SUCCESS[2]]: (state, action) => {
      return {
        ...state,
        userPosts: { ...state.userPosts, usedByMe: action.payload },
      };
    },
    [GET_USER_POSTS_FAIL[2]]: (state) => {
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
      } else await dispatch(getMainPostsFail());
    } catch (error) {
      await dispatch(getMainPostsFail());
    }
  };
};

export const getNewPosts = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}${INIT}${POST_API}`,
        { method: 'GET' },
      );
      if (response.status === 200) {
        const result = await response.json();
        await dispatch(getNewPostsSuccess(result.data));
      } else await dispatch(getNewPostsFail());
    } catch (error) {
      await dispatch(getNewPostsFail());
    }
  };
};

export const getFundingPosts = () => {
  return async (dispatch) => {
    try {
      const responseOngoing = await fetch(
        `${process.env.REACT_APP_SERVER_URL}${INIT}${POST_API}${FUND_API}${FUND_ONGOING}`,
        { method: 'GET' },
      );
      const responseEnd = await fetch(
        `${process.env.REACT_APP_SERVER_URL}${INIT}${POST_API}${FUND_API}${FUND_END}`,
        { method: 'GET' },
      );
      let result = {};
      if (responseOngoing.status !== 200 && responseEnd.status !== 200) {
        await dispatch(getFundingPostsFail());
      } else {
        if (responseOngoing.status === 200) {
          const resultOngoing = await responseOngoing.json();
          result = { ...result, onGoingPost: resultOngoing.data };
        }
        if (responseEnd.status === 200) {
          const resultEnd = await responseEnd.json();
          result = { ...result, endPost: resultEnd.data };
        }
        await dispatch(getFundingPostsSuccess(result));
      }
    } catch (error) {
      await dispatch(getFundingPostsFail());
    }
  };
};

export const getFavoritePosts = (token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}${INIT}${POST_API}${MY}${FAVORITE_API}`,
        {
          method: 'GET',
          headers: {
            'x-access-token': token,
          },
        },
      );
      if (response.status === 200) {
        const result = await response.json();
        await dispatch(getFavoritePostsSuccess(result.data));
      } else await dispatch(getFavoritePostsFail());
    } catch (error) {
      await dispatch(getFavoritePostsFail());
    }
  };
};

export const getUserPosts = (tabOption, userInfo, token) => {
  return async (dispatch) => {
    try {
      const userReqInfo = tabOption === 'me' ? userInfo.nickname : userInfo.id;
      FILTER.user.map(async (option, index) => {
        if (tabOption === option[0]) {
          const response = await fetch(
            `${process.env.REACT_APP_SERVER_URL}${INIT}${USER_REQ_GROUP[index]}/${userReqInfo}`,
            {
              method: 'GET',
              headers: {
                'x-access-token': token,
              },
            },
          );
          if (response.status === 200) {
            const result = await response.json();
            const action = getUserPostSuccess[index];
            await dispatch(action(result.data));
          } else await dispatch(getUserPostFail[index]);
        }
      });
    } catch (error) {
      //
    }
  };
};
