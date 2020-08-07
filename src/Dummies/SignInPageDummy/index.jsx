import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import { connect } from 'react-redux';
import * as auth from 'Redux/auth';
import { withRouter } from 'react-router-dom';

const defaultProps = {};
const propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
    user: state.authReducer.user,
  };
};

class SignInPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { history } = this.props;
    this.dummySignIn().then(() => {
      history.push('/');
    });
  }

  dummySignIn = async () => {
    const { dispatch } = this.props;
    const params = { id: 'JJIN', password: 'gurwls97' };

    await dispatch(auth.postSignIn(params)).then(async (token) => {
      await dispatch(auth.getUser(token));
    });
  };

  render() {
    return <div>temp signin page</div>;
  }
}

SignInPage.defaultProps = defaultProps;
SignInPage.propTypes = propTypes;

export default withRouter(connect(mapStateToProps)(SignInPage));
