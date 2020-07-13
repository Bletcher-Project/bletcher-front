import React, { Component } from 'react';

import UploadImgFile from 'Components/Upload/UploadImgFile';

import Avatar from '@material-ui/core/Avatar';
import defaultProfile from 'Assets/images/default_profile.svg';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileImg: null,
    };
  }

  handleProfileImg = (e) => {
    if (e.target.files[0] !== undefined) {
      this.setState({ profileImg: e.target.files[0] });
    }
  };

  render() {
    const { profileImg } = this.state;
    return (
      <>
        <div className="signUpForm__profileImg">
          <UploadImgFile handleUploadImg={this.handleProfileImg}>
            <Avatar
              src={
                profileImg ? URL.createObjectURL(profileImg) : defaultProfile
              }
              style={{
                width: '110px',
                height: '110px',
                cursor: 'pointer',
              }}
            />
          </UploadImgFile>
          <UploadImgFile handleUploadImg={this.handleProfileImg}>
            <p>Edit Photo</p>
          </UploadImgFile>
        </div>
      </>
    );
  }
}

export default SignUpForm;
