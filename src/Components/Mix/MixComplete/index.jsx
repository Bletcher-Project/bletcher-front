/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import { connect } from 'react-redux';
import { getPostByPostId, recomposeMixing } from 'Redux/post';

import NoStyleButton from 'Components/Form/NoStyleButton';

import { publicTos, privateTos } from 'Constants/mix-tos';
import { completeTitle, completeDescription } from 'Constants/mix-text';

import { withRouter } from 'react-router-dom';

const defaultProps = {
  mixId: null,
  originId: null,
  token: '',
  getMixedPost: null,
  recomposePost: null,
  user: null,
};

const propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  mixId: PropTypes.number,
  originId: PropTypes.number,
  token: PropTypes.string,
  getMixedPost: PropTypes.func,
  recomposePost: PropTypes.func,
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

  componentDidMount = async () => {
    const { getMixedPost, mixId, token } = this.props;
    const mPost = await getMixedPost(mixId, token);
    this.setState({ mixedPost: mPost });
  };

  render() {
    const { history, user } = this.props;
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
                <img src={mixedPost ? mixedPost.Image.path : null} alt="" />
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
                <NoStyleButton
                  onClick={() => {
                    if (user)
                      history.push({ pathname: `/user/${user.nickname}` });
                  }}
                >
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
