// React Common Modules
import React, { Component } from "react";

// React Router
import { Route, withRouter, Switch } from "react-router-dom";

// Pages
import { MainPage, HomePage, UserPage, GuidePage } from "./Pages";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/signup"  />
          <Route exact path="/home" component={HomePage} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
