import React, { Component } from 'react';

const defaultProps = {};
const propTypes = {};

class ProfileSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div>This is ProfileSetting Component</div>;
  }
}

ProfileSetting.defaultProps = defaultProps;
ProfileSetting.propTypes = propTypes;

export default ProfileSetting;
