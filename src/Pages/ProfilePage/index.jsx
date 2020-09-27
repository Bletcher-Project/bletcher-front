import React, { Component } from 'react';

import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import { connect } from 'react-redux';
import { signOut } from 'Redux/auth';

import NavBar from 'Components/Common/NavBar';

const defaultProps = {
  user: {},
};
const propTypes = {
  UserSignOut: PropTypes.func.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
    nickname: PropTypes.string,
  }),
};

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
    user: state.authReducer.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    UserSignOut: () => dispatch(signOut()),
  };
};

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  outHandler = async () => {
    const { UserSignOut, history } = this.props;
    await UserSignOut();
    history.push('/');
  };

  render() {
    const { user } = this.props;
    return (
      <>
        <NavBar isActive="profile" />
        <div className="profilePage">
          <div className="profilePage__Header">This is ProfilePage.</div>
          <div className="profilePage__Content" />
          {user ? user.name : ''}
          <button type="button" onClick={this.outHandler}>
            LOGOUT HERE!
          </button>
        </div>
      </>
    );
  }
}

ProfilePage.defaultProps = defaultProps;
ProfilePage.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
