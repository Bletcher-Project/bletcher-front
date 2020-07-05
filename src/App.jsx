// React Common Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// React Router
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import * as AuthAction from './Redux/Actions/AuthAction';

// Pages
import { MainPage, HomePage, SignUpPage, UserPage } from './Pages';

const mapStateToProps = (state) => ({
  isLogin: state.authReducer.isLogin,
  token: state.authReducer.token,
  user: state.authReducer.user,
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { dispatch, isLogin, token } = this.props;
    if (isLogin) {
      dispatch(AuthAction.getUser(token));
    }
  }

  render() {
    const { isLogin } = this.props;
    return (
      <div className="app">
        <Switch>
          <Route exact path="/">
            {isLogin ? <Redirect to="/home" /> : <MainPage />}
          </Route>
          <Route path="/signin">
            {isLogin ? <Redirect to="/home" /> : <MainPage isSignIn />}
          </Route>
          <Route exact path="/signup" component={SignUpPage} />
          <Route exact path="/home">
            {!isLogin ? <Redirect to="/" /> : <HomePage />}
          </Route>
          <Route exact path="/:username" component={UserPage} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isLogin: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

export default withRouter(connect(mapStateToProps)(App));
