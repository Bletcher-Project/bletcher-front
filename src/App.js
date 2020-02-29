// React Common Modules
import React, { Component } from "react";

// React Router
import { Route, withRouter, Switch, Redirect } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import * as AuthAction from "./Redux/Actions/AuthAction";

// Pages
import { MainPage, HomePage, SignUpPage } from "./Pages";

const mapStateToProps = state => {
  return {
    isLogin: state.authReducer.isLogin,
    token: state.authReducer.token,
    user: state.authReducer.user
  };
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const { dispatch, isLogin, token } = this.props;
    if (isLogin) {
      dispatch(AuthAction.getUser(token));
    }
  }

  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/">
            {this.props.isLogin ? <Redirect to="/home" /> : <MainPage />}
          </Route>
          <Route path="/signin">
            {this.props.isLogin ? <Redirect to="/home" /> : <MainPage isSignIn={true} />}
          </Route>
          <Route exact path="/signup" component={SignUpPage} />
          <Route exact path="/home">
            {!this.props.isLogin ? <Redirect to="/" /> : <HomePage />}
          </Route>
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(App));
