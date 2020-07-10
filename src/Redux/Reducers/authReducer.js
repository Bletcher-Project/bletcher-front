import {
  REMOVE_USER,
  SET_TOKEN,
  GET_USER,
  REMOVE_TOKEN,
  SIGNOUT,
} from 'Redux/Constants/action-types';

const initialState = {
  isLogin: !!localStorage.getItem('token'),
  token: localStorage.getItem('token'),
  user: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case REMOVE_TOKEN: // TOKEN_EXPIRED
      return { ...state, isLogin: false, token: null };
    case SET_TOKEN: // SUCCEED_TO_SIGNIN
      localStorage.setItem('token', action.payload);
      return { ...state, isLogin: true, token: action.payload };
    // case REMOVE_TOKEN: // FAILED_TO_SIGNIN
    //   return { ...state, isLogin: false, token: null };
    case SIGNOUT: // SUCCEED_TO_SIGNOUT
      localStorage.removeItem('token');
      return { ...state, isLogin: false, token: null, user: {} };
    case GET_USER: // SUCCEED_TO_GET_USER
      return { ...state, user: action.payload };
    case REMOVE_USER: // FAILED_TO_GET_USER
      return { ...state, user: {} };

    default:
      return state;
  }
}
