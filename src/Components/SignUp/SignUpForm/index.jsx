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

  render() {
    const { profileImg, user } = this.state;
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
