import React, { Component } from "react";

import { connect } from "react-redux";
import * as AuthAction from "../../Redux/Actions/AuthAction";

import { NavBar, Thumbnail } from "../../Components";

import settingIcon from "../../Assets/icon/setting.png";

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return {
    user: state.authReducer.user
  };
};

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { user } = this.props;
    console.log(user);
    return (
      <div className="userPage">
        <NavBar isActive="user" />
        {user ? (
          <div className="userPage__contents">
            <div className="userPage__contents__header">
              <Thumbnail size="150" src={null} type={user.type} />
              <div className="userPage__contents__header__profile">
                <div className="userPage__contents__header__profile-name-set">
                  <div className="nameArea">
                    <h1>{user.name}</h1>
                    <div id="nameUnderBar"></div>
                  </div>
                  <div className="settingArea">
                    <img src={settingIcon} alt="setting" />
                  </div>
                </div>
                <div className="userPage__contents__header__profile-status">
                  <p>{user.status}</p>
                </div>
                <div className="userPage__contents__header__profile-follow">
                  <div className="followBox">
                    <span className="followTitle">Followers</span><span id="followerNum">0</span>
                  </div>
                  <div className="followBox">
                    <span className="followTitle">Following</span><span id="followingNum">0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}


      </div>
    );
  }
}

UserPage.defaultProps = defaultProps;
UserPage.propTypes = propTypes;

export default connect(mapStateToProps)(UserPage);
