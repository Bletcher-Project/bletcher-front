import * as constant from '../../Constants/api_uri';

export const getApiPath = (apiType) => {
  let type;
  if (apiType === 'SIGNIN_API') {
    type = constant.SIGNIN_API;
  } else if (apiType === 'USER_API_GET') {
    type = constant.USER_API_GET;
  }
  return (
    process.env.REACT_APP_SERVER_URL +
    constant.INIT_API +
    constant.AUTH_API +
    type
  );
};

export const getApiPathPost = (apiType) => {
  let type;
  if (apiType === 'USER_POSTS') {
    type = constant.USER_POSTS;
  }
  return process.env.REACT_APP_SERVER_URL + constant.INIT_API + type;
};
