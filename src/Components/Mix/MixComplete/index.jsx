/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import { connect } from 'react-redux';
import {
  getPostByPostId,
  recomposeMixing,
  initMixState,
  addFundingPost,
} from 'Redux/post';
import { getUserPosts } from 'Redux/fetch-post';

import NoStyleButton from 'Components/Form/NoStyleButton';

import { publicTos, privateTos } from 'Constants/mix-tos';
import { completeTitle, completeDescription } from 'Constants/mix-text';

import { withRouter } from 'react-router-dom';

const defaultProps = {
  mixId: null,
  originId: null,
  token: '',
  user: null,
  getMixedPost: null,
  recomposePost: null,
  patchUserPost: null,
};

const propTypes = {
  addFunding: PropTypes.func.isRequired,
  initializeMixState: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  mixId: PropTypes.number,
  originId: PropTypes.number,
  token: PropTypes.string,
  getMixedPost: PropTypes.func,
  recomposePost: PropTypes.func,
  patchUserPost: PropTypes.func,
  user: PropTypes.shape({
    id: PropTypes.number,
    nickname: PropTypes.string,
  }),
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMixedPost: (postId, token) => {
      return dispatch(getPostByPostId(postId, token));
    },
    recomposePost: () => {
      return dispatch(recomposeMixing());
    },
    patchUserPost: (tabOption, userInfo, token) => {
      return dispatch(getUserPosts(tabOption, userInfo, token));
    },
    initializeMixState: () => {
      return dispatch(initMixState());
    },
    addFunding: (postId, token) => {
      dispatch(addFundingPost(postId, token));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user,
    token: state.authReducer.token,
    mixId: state.postReducer.mixState.mixId,
    originId: state.postReducer.mixState.originId,
  };
};

class MixComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPublic: true,
      mixedPost: null,
    };
  }

  categoryMapper = () => {
    const tmpCategory = ['watercolor', 'contemporary', 'people'];
    return tmpCategory.map((category) => {
      return (
        <div
          key={category}
          className="mixComplete__content__rightBox__categories__category"
        >
          <span>#</span>
          <span className="mixComplete__content__rightBox__categories__category__name">
            {category}
          </span>
        </div>
      );
    });
  };

  getTos = () => {
    const { isPublic } = this.state;
    const tos = publicTos.map((t) => {
      return <li key={t[0]}>{t}</li>;
    });
    return isPublic ? tos : privateTos;
  };

  checkBoxToggler = (e) => {
    const pubBox = document.getElementById('public');
    const prvBox = document.getElementById('private');
    pubBox.checked = false;
    prvBox.checked = false;
    e.target.checked = true;
    this.setState({ isPublic: e.target.id === 'public' });
  };

  validate = (condition, element) => {
    return condition && element;
  };

  recompose = () => {
    const { originId, user, history, recomposePost } = this.props;
    if (user) {
      recomposePost();
      history.push({
        pathname: `/user/${user.nickname}`,
        search: `?recompose=${originId}`,
      });
    }
  };

  shortcutToFeed = () => {
    const {
      user,
      token,
      toggle,
      patchUserPost,
      initializeMixState,
      addFunding,
      mixId,
    } = this.props;
    addFunding(mixId, token);
    patchUserPost('me', user, token);
    initializeMixState();
    toggle();
  };

  getSrc = (post) => {
    if (!post) return null;
    if (post.Image !== undefined) return post.Image.path;
    return post['Image.path'];
  };

  componentDidMount = async () => {
    const { getMixedPost, mixId, token } = this.props;
    const mPost = await getMixedPost(mixId, token);
    this.setState({ mixedPost: mPost });
  };

  render() {
    const { isPublic, mixedPost } = this.state;
    return (
      <>
        <div className="mixComplete">
          <div className="mixComplete__header">
            <div className="mixComplete__header__title">{completeTitle}</div>
            <div className="mixComplete__header__description">
              {completeDescription}
            </div>
          </div>
          <div className="mixComplete__content">
            <div className="mixComplete__content__leftBox">
              <div className="mixComplete__content__leftBox__imgBox">
                <img src={this.getSrc(mixedPost)} alt="" />
              </div>
            </div>
            <div className="mixComplete__content__rightBox">
              <div className="mixComplete__content__rightBox__checkBox">
                <div className="mixComplete__content__rightBox__checkBox__option">
                  <input
                    type="checkbox"
                    id="public"
                    defaultChecked
                    onChange={this.checkBoxToggler}
                  />
                  <label htmlFor="public">Public</label>
                </div>
                <div className="mixComplete__content__rightBox__checkBox__option">
                  <input
                    type="checkbox"
                    id="private"
                    onChange={this.checkBoxToggler}
                  />
                  <label htmlFor="private">Non-disclosure</label>
                </div>
              </div>
              <div className="mixComplete__content__rightBox__categories">
                {this.validate(isPublic, this.categoryMapper())}
              </div>
              <div className="mixComplete__content__rightBox__tos">
                <div className="mixComplete__content__rightBox__tos__header">
                  {this.validate(isPublic, 'SHOP_40% stake')}
                </div>
                <div className="mixComplete__content__rightBox__tos__description">
                  {this.getTos()}
                </div>
              </div>
              <div className="mixComplete__content__rightBox__buttons">
                <NoStyleButton onClick={this.shortcutToFeed}>
                  Shortcut to My Feeds
                </NoStyleButton>
                <NoStyleButton onClick={this.recompose}>
                  To recompose
                </NoStyleButton>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

MixComplete.propTypes = propTypes;
MixComplete.defaultProps = defaultProps;

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MixComplete),
);
