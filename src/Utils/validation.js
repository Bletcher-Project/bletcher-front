import { INIT, USER_API, QUERY_EMAIL, QUERY_NAME } from 'Constants/api-uri';
import {
  DEFAULT_HELPER_TEXT,
  EmailHelperText,
  PasswordHelperText,
  NameHelperText,
} from 'Constants/helper-text';

export const checkEmailExists = async (email) => {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_URL}${INIT}${USER_API}${QUERY_EMAIL}${email}`,
    { method: 'GET' },
  );
  if (response.status === 204) {
    return false;
  }
  return true;
};

export const checkEmailValidation = async (email) => {
  const regExp = /^[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  let isValid;
  let helperText;

  if (!email) {
    isValid = false;
    helperText = EmailHelperText.EMPTY_VALUE;
  } else if (!regExp.test(email)) {
    isValid = false;
    helperText = EmailHelperText.NOT_VALID;
  } else {
    const result = await checkEmailExists(email);
    if (result) {
      isValid = false;
      helperText = EmailHelperText.EXIST_VALUE;
    } else {
      isValid = true;
      helperText = DEFAULT_HELPER_TEXT;
    }
  }

  return { isValid, helperText };
};

export const checkNameExists = async (name) => {
  const response = await fetch(
    `${process.env.REACT_APP_SERVER_URL}${INIT}${USER_API}${QUERY_NAME}${name}`,
    { method: 'GET' },
  );
  if (response.status === 204) {
    return false;
  }
  return true;
};

export const checkNameValidation = async (name) => {
  const regExp = /^[A-Za-z0-9_.]{3,30}$/;
  const nonAlphabet = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]$/;
  const isSpecial = /\W/;
  const allowSpecial = /[_.]$/;
  let isValid;
  let helperText;

  if (!name) {
    isValid = false;
    helperText = NameHelperText.EMPTY_VALUE;
  } else if (!regExp.test(name)) {
    isValid = false;
    if (nonAlphabet.test(name)) {
      helperText = NameHelperText.ONLY_ALPHABET;
    } else if (isSpecial.test(name) && !allowSpecial.test(name)) {
      helperText = NameHelperText.NO_SPECIAL_CHAR;
    } else if (name.length < 3) {
      helperText = NameHelperText.MIN_WORDS;
    } else if (name.length > 30) {
      helperText = NameHelperText.MAX_WORDS;
    }
  } else {
    const result = await checkNameExists(name);
    if (result) {
      isValid = false;
      helperText = NameHelperText.EXIST_VALUE;
    } else {
      isValid = true;
      helperText = DEFAULT_HELPER_TEXT;
    }
  }

  return { isValid, helperText };
};

export const checkPasswordValidation = (password) => {
  const regExp = /^(?=.*[0-9])(?=.*[a-zA-Z]).{8,16}$/;
  const isNum = /^(?=.*[0-9])/;
  const isChar = /^(?=.*[a-zA-Z])/;
  let isValid;
  let helperText;

  if (!password) {
    isValid = false;
    helperText = PasswordHelperText.EMPTY_VALUE;
  } else if (!regExp.test(password)) {
    isValid = false;
    if (!isNum.test(password)) {
      helperText = PasswordHelperText.MISS_NUMBER;
    } else if (!isChar.test(password)) {
      helperText = PasswordHelperText.MISS_ALPHABET;
    } else if (password.length < 8) {
      helperText = PasswordHelperText.MIN_WORDS;
    } else if (password.length > 16) {
      helperText = PasswordHelperText.MAX_WORDS;
    }
  } else {
    isValid = true;
    helperText = DEFAULT_HELPER_TEXT;
  }

  return { isValid, helperText };
};
