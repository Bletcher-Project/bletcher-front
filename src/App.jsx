// React Common Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import * as AuthAction from 'Redux/auth';

// React Router
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';

// Pages
import MainPage from 'Pages/MainPage';
import SignInPage from 'Pages/SignInPage';
import SignUpPage from 'Pages/SignUpPage';
import UserPage from 'Pages/UserPage';
import ProfilePage from 'Pages/ProfilePage';
import ShopPage from 'Pages/ShopPage';
import SearchPage from 'Pages/SearchPage';
import FundingPage from 'Pages/FundingPage';
import FavoritePage from 'Pages/FavoritePage';
import CartPage from 'Pages/CartPage';
import NewPage from 'Pages/NewPage';
import NotFoundPage from 'Pages/NotFoundPage';
import DetailPage from 'Pages/DetailPage';

const defaultProps = {
  token: null,
};
const propTypes = {
  dispatch: PropTypes.func.isRequired,
  isLogin: PropTypes.bool.isRequired,
  token: PropTypes.string,
};

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
          <Route exact path="/" component={MainPage} />
          <Route path="/signin">
            {isLogin ? <Redirect to="/" /> : <SignInPage />}
          </Route>
          <Route exact path="/signup" component={SignUpPage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/new" component={NewPage} />
          <Route exact path="/funding" component={FundingPage} />
          <Route exact path="/favorite" component={FavoritePage} />
          <Route exact path="/cart" component={CartPage} />
          <Route exact path="/user/:username/profile" component={ProfilePage} />
          <Route exact path="/user/:username" component={UserPage} />
          <Route path="/detail" component={DetailPage} />
          <Route path="/search" component={SearchPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

App.defaultProps = defaultProps;
App.propTypes = propTypes;

export default withRouter(connect(mapStateToProps)(App));
