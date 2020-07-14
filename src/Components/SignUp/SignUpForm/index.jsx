import React, { Component } from 'react';

import UploadImgFile from 'Components/Upload/UploadImgFile';
import Input from 'Components/Common/Input';
import CheckIcon from 'Components/Common/CheckIcon';

import Avatar from '@material-ui/core/Avatar';
import defaultProfile from 'Assets/images/default_profile.svg';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileImg: null,
      user: {
        email: '',
        password: '',
        repassword: '',
        name: '',
        status: '',
      },
      isNotValid: {
        email: false,
        password: false,
        repassword: false,
        name: false,
        status: false,
      },
      helperText: {
        email: ' ',
        password: ' ',
        repassword: ' ',
        name: ' ',
        status: ' ',
      },
    };
  }

  handleProfileImg = (e) => {
    if (e.target.files[0] !== undefined) {
      this.setState({ profileImg: e.target.files[0] });
    }
  };

  handleEmail = (e) => {
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        email: e.target.value,
      },
    });
  };

  handlePassword = (e) => {
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        password: e.target.value,
      },
    });
  };

  handleRePassword = (e) => {
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        repassword: e.target.value,
      },
    });
  };

  handleName = (e) => {
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        name: e.target.value,
      },
    });
  };

  handleStatus = (e) => {
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        status: e.target.value,
      },
    });
  };

  checkEmailValidation = () => {
    const regExp = /^[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    const changeEmailStatus = (bool, msg) => {
      this.setState({ isEmailValid: bool, helpEmail: msg }, () => {
        this.handleNextBtn();
      });
    };

    this.setState({ email: e.target.value }, () => {
      const email = this.state.email;
      if (isEmptyString(email)) {
        changeEmailStatus(false, 'Enter your email address please');
      } else if (!isEmptyString(email) & !regExp.test(email)) {
        changeEmailStatus(false, 'Incorrect Email Form');
      }

      if (regExp.test(email)) {
        window.setTimeout(() => {
          return Object.is(this.state.email, email)
            ? axios
                .get(
                  process.env.REACT_APP_SERVER_URL +
                    constant.INIT_API +
                    constant.USERS_API_GET +
                    constant.EMAIL_API_GET +
                    email,
                )
                .then((res) => {
                  if (res.status === 200) {
                    changeEmailStatus(false, 'Already exists email!');
                  } else if (res.status === 204) {
                    changeEmailStatus(true, ' '); //Allowed email
                  }
                })
                .catch((err) => {
                  console.log(err);
                })
            : null;
        }, 200);
      }
    });
  };

  checkPasswordValidation = () => {
    const regExp = /\S[0-9a-zA-Z]{7,16}$/;

    const condition = () => {
      const Isnum = /\S[0-9]/;
      const IsChar = /\S[a-zA-Z]/;
      const IsSpeical = /\W/g;
      const changePwdStatus = (bool, msg) => {
        this.setState({ isPwdValid: bool, helpPwd: msg }, () => {
          this.handleNextBtn();
        });
      };

      if (
        !isEmptyString(this.state.password) &
        (8 <= this.state.password.length) &
        (this.state.password.length <= 16)
      ) {
        if (
          IsChar.test(this.state.password) & !Isnum.test(this.state.password)
        ) {
          return changePwdStatus(false, 'Num should be contained');
        } else if (
          !IsChar.test(this.state.password) & Isnum.test(this.state.password)
        ) {
          return changePwdStatus(false, 'Alphabet should be contained');
        } else if (IsSpeical.test(this.state.password)) {
          return changePwdStatus(false, 'Special character not allowed');
        }
      } else if (
        !isEmptyString(this.state.password) &
        (this.state.password.length < 8)
      ) {
        return changePwdStatus(false, 'Should be more than 8 words');
      } else if (
        !isEmptyString(this.state.password) &
        (this.state.password.length > 16)
      ) {
        return changePwdStatus(false, 'Should no greater than 16 words');
      } else if (isEmptyString(this.state.password)) {
        return changePwdStatus(true, 'Enter password please');
      }
    };

    this.setState({ password: e.target.value }, () => {
      if (regExp.test(this.state.password)) {
        this.setState({ isPwdValid: true, helpPwd: ' ' }, () => {
          //Allowed password
          this.handleNextBtn();
          condition();
        });
      } else {
        this.setState({ isPwdValid: false }, () => {
          this.handleNextBtn();
          condition();
        });
      }
    });
  };

  checkRePasswordValidation = () => {
    this.setState({ repassword: e.target.value }, () => {
      if (
        isEmptyString(this.state.repassword) ||
        Object.is(this.state.password, this.state.repassword)
      ) {
        this.setState({ isRePwdValid: true }, () => {
          this.handleNextBtn();
        });
      } else {
        this.setState(
          { isRePwdValid: false, helpRePwd: 'Enter same password above' },
          () => {
            this.handleNextBtn();
          },
        );
      }
    });
  };

  checkNameValidation = () => {
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

  checkStatusValidation = () => {
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

  render() {
    const { profileImg, user, isNotValid, helperText } = this.state;
    console.log(user);
    return (
      <>
        <div className="signUpForm__profileImg">
          <UploadImgFile handleUploadImg={this.handleProfileImg}>
            <Avatar
              src={
                profileImg ? URL.createObjectURL(profileImg) : defaultProfile
              }
              style={{
                width: '100px',
                height: '100px',
                cursor: 'pointer',
              }}
            />
          </UploadImgFile>
          <UploadImgFile handleUploadImg={this.handleProfileImg}>
            <p>Edit Photo</p>
          </UploadImgFile>
        </div>
        <div className="signUpForm__userInfo">
          <div className="signUpForm__userInfo__account">
            <form>
              <Input
                label="Email"
                type="email"
                autoComplete="username"
                width="210px"
                error={isNotValid.email}
                helperText={helperText.email}
                InputProps={isNotValid.email ? <CheckIcon /> : null}
                onChange={(e) => this.handleEmail(e)}
              />
              <Input
                label="Password"
                type="password"
                autoComplete="new-password"
                width="210px"
                onChange={(e) => this.handlePassword(e)}
              />
              <Input
                label="Password Confirm"
                type="password"
                autoComplete="new-password"
                width="210px"
                onChange={(e) => this.handleRePassword(e)}
              />
            </form>
          </div>
          <div className="signUpForm__userInfo__profile">
            <Input
              label="Name"
              type="text"
              width="210px"
              onChange={(e) => this.handleName(e)}
            />
            <Input
              label="Status (optional)"
              type="text"
              width="210px"
              onChange={(e) => this.handleStatus(e)}
            />
          </div>
        </div>
      </>
    );
  }
}

export default SignUpForm;
