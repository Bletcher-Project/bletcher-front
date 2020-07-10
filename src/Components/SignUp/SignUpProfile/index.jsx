import React, { Component } from 'react';

import Input from 'Components/Common/Input';
import Button from 'Components/Common/Button';

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { purple } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import Fade from '@material-ui/core/Fade';
import { isEmptyString } from 'is-what';
import axios from 'axios';

import defaultProfile from 'Assets/images/default_profile.svg';
import backIcon from 'Assets/icons/signup_back.svg';

import * as constant from '../../../Constants/api_uri';

const defaultProps = {};
const propTypes = {};

class SignUpProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      status: '',
      helpName: ' ',
      helpStatus: ' ',
      profileImg: null,
      profileImgUrl: null,
      isSignUpNext: false,
      isNameValid: true,
      isStatusValid: true,
    };
  }

  render() {
    const {
      name,
      status,
      helpName,
      helpStatus,
      isNameValid,
      isStatusValid,
      isSignUpNext,
    } = this.state;

    return (
      <div className="signUpPage__info">
        <Fade
          in={true}
          mountOnEnter
          timeout={{ appear: 1000, enter: 750, exit: 750 }}
        >
          <div className="signUpPage__info__container">
            <div className="signUpPage__info__container__head">
              <div className="signUpPage__info__container__head-back">
                <img
                  alt="back"
                  src={backIcon}
                  width="35px"
                  style={{ cursor: 'pointer' }}
                  onClick={this.handlePrevStep}
                />
              </div>
              <div className="signUpPage__info__container__head-title">
                <p>Complete your profile.</p>
              </div>
            </div>
            <div className="signUpPage__info__container__content">
              <div className="signUpPage__info__container__content__propic">
                <div className="signUpPage__info__container__content__propic-preview">
                  <input
                    accept="image/*"
                    type="file"
                    name="img"
                    id="profile-upload"
                    style={{ display: 'none' }}
                    onChange={this.handleProfileImg}
                  />
                  <label htmlFor="profile-upload">
                    <Avatar
                      src={
                        this.state.profileImgUrl
                          ? this.state.profileImgUrl
                          : defaultProfile
                      }
                      style={{
                        width: '110px',
                        height: '110px',
                        cursor: 'pointer',
                        borderRadius: '50%',
                      }}
                    ></Avatar>
                  </label>
                </div>
                <div className="signUpPage__info__container__content__propic-label">
                  <label
                    htmlFor="profile-upload"
                    style={{
                      width: '100%',
                      height: '100%',
                      cursor: 'pointer',
                      margin: '0',
                    }}
                  >
                    Edit Photo
                  </label>
                </div>
              </div>
              <div className="signUpPage__info__container__content__input">
                <Input
                  label="name"
                  type="text"
                  value={name}
                  width="210px"
                  onChange={this.handleNameCheck}
                  error={!isNameValid}
                  helperText={helpName}
                  InputProps={
                    !isEmptyString(name) & isNameValid
                      ? {
                          endAdornment: (
                            <Fade in={true} timeout={350}>
                              <CheckCircleOutlineIcon
                                style={{ color: purple[700], width: '0.8em' }}
                              />
                            </Fade>
                          ),
                        }
                      : null
                  }
                />
                <Input
                  label="status (optional)"
                  type="text"
                  value={status}
                  width="210px"
                  onChange={this.handleStatusCheck}
                  onKeyPress={this.handleEnterKey}
                  error={!isStatusValid}
                  helperText={helpStatus}
                />
                <Button
                  disabled={!isSignUpNext}
                  text="Sign Up"
                  onClick={this.handleSignUp}
                />
              </div>
            </div>
          </div>
        </Fade>
      </div>
    );
  }

  handlePrevStep = () => {
    this.props.handleSignUpStep('infoPage');
  };

  handleNameCheck = (e) => {
    const regExp = /^[A-Za-z0-9_.]{3,30}$/;
    const nonAlphabet = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]$/;
    const nonSepcial = /[_.]$/;
    const changeNameStatus = (bool, msg) => {
      this.setState({ isNameValid: bool, helpName: msg }, () => {
        this.handleSignUpBtn();
      });
    };

    this.setState({ name: e.target.value }, () => {
      const name = this.state.name;

      if (regExp.test(name)) {
        window.setTimeout(() => {
          return Object.is(this.state.name, name)
            ? axios
                .get(
                  process.env.REACT_APP_SERVER_URL +
                    constant.INIT_API +
                    constant.USERS_API_GET +
                    constant.NAME_API_GET +
                    name,
                )
                .then((res) => {
                  if (res.status === 200) {
                    changeNameStatus(false, 'Already exists name!');
                  } else if (res.status === 204) {
                    changeNameStatus(true, ' '); //Allowed name
                  }
                })
                .catch((err) => {
                  console.log(err);
                })
            : null;
        }, 200);
      } else {
        if (!isEmptyString(name) & (name.length < 3)) {
          changeNameStatus(false, 'Should be more than 3 words');
        } else if (name.length > 30) {
          changeNameStatus(false, 'Should no greater than 30 words');
        } else if (!isEmptyString(name) & !regExp.test(name)) {
          if (nonAlphabet.test(name)) {
            changeNameStatus(false, 'Only alphabet chracter allowed');
          } else if (!nonSepcial.test(name)) {
            changeNameStatus(
              false,
              "Only '_' or '.' special character allowed",
            );
          }
        } else if (isEmptyString(name)) {
          changeNameStatus(true, 'Enter your name please');
        }
      }
    });
  };

  handleProfileImg = (e) => {
    this.setState({ profileImg: e.target.files[0] }, () => {
      return this.state.profileImg
        ? this.setState({
            profileImgUrl: URL.createObjectURL(this.state.profileImg),
          })
        : null;
    });
  };

  handleStatusCheck = (e) => {
    this.setState({ status: e.target.value }, () => {
      return this.state.status.length > 100
        ? this.setState(
            {
              isStatusValid: false,
              helpStatus: 'Should be less than 100 words.',
            },
            () => {
              this.handleSignUpBtn();
            },
          )
        : this.setState(
            {
              isStatusValid: true,
              helpStatus: ' ',
            },
            () => {
              this.handleSignUpBtn();
            },
          );
    });
  };

  handleSignUpBtn = () => {
    return this.state.isNameValid &
      !isEmptyString(this.state.name) &
      this.state.isStatusValid
      ? this.setState({ isSignUpNext: true })
      : this.setState({ isSignUpNext: false });
  };

  handleSignUp = () => {
    this.props.handleUserInfo({
      name: this.state.name,
      status: this.state.status,
      profileImg: this.state.profileImg,
    });
  };
}

SignUpProfile.defaultProps = defaultProps;
SignUpProfile.propTypes = propTypes;

export default SignUpProfile;
