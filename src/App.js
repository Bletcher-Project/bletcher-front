// React Common Modules
import React, { Component } from "react";

// React Router
import { Route, withRouter, Switch } from "react-router-dom";

import { connect } from "react-redux";

// Pages
import { MainPage, HomePage, SignUpPage } from "./Pages";

const mapStateToProps = state => {
  console.log(state.authReducer.isLogin, state.authReducer.token);
  return {
    isLogin: state.authReducer.isLogin
  };
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const { history, isLogin } = this.props;
    if (!isLogin) {
      history.push({
        pathname: "/"
      });
    } else {
      // getUser
      history.push({
        pathname: "/home"
      });
    }
  }

  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/signup" component={SignUpPage} />
          <Route exact path="/home" component={HomePage} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(App));
