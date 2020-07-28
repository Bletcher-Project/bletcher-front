import React, { Component } from 'react';

import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import { connect } from 'react-redux';

import NavBar from 'Components/Main/NavBar';
import * as User from 'Pages/UserPage';

const defaultProps = {
  user: null,
};
const propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  user: PropTypes.objectOf(PropTypes.object),
};

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
    user: state.authReducer.user,
  };
};

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <NavBar isActive="profile" />
        <div className="profilePage">
          <div className="profilePage__Header">This is ProfilePage.</div>
          <div className="profilePage__Content" />
        </div>
      </>
    );
  }
}

ProfilePage.defaultProps = defaultProps;
ProfilePage.propTypes = propTypes;

export default connect(mapStateToProps)(ProfilePage);
