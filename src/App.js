// React Common Modules
import React, { Component } from "react";

// React Router
import { Route, withRouter, Switch, Redirect } from "react-router-dom";

// Redux
import { connect } from "react-redux";

// Pages
import { MainPage, HomePage, SignUpPage } from "./Pages";

const mapStateToProps = state => {
  return {
    isLogin: state.authReducer.isLogin
  };
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/">
            {this.props.isLogin ? <Redirect to="/home" /> : <MainPage />}
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
