import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import { connect } from 'react-redux';
import { mixPost } from 'Redux/post';

import NoStyleButton from 'Components/Form/NoStyleButton';

import { paletteTitle, paletteDescription } from 'Constants/mix-text';
import mixButton from 'Assets/images/mixButton.png';

import { withRouter } from 'react-router-dom';

const postPropTypes = () => {
  return PropTypes.shape({
    Category: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
    Image: PropTypes.shape({
      id: PropTypes.number.isRequired,
      path: PropTypes.string,
    }),
    User: PropTypes.shape({
      id: PropTypes.number.isRequired,
      nickname: PropTypes.string.isRequired,
    }),
    created_at: PropTypes.string.isRequired,
    description: PropTypes.string,
    id: PropTypes.number.isRequired,
    is_public: PropTypes.oneOf([0, 1, true, false]).isRequired,
    title: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
  });
};

const defaultProps = {
  mixPosts: null,
  token: '',
};

const propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  token: PropTypes.string,
  originPost: postPropTypes().isRequired,
  subPost: postPropTypes().isRequired,
  mixPosts: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
  return {
    mixPosts: (originId, subId, token) => {
      return dispatch(mixPost(originId, subId, token));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
    isMixing: state.postReducer.isMixing,
  };
};

class MixPalette extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  requestPostMix = () => {
    const { originPost, subPost, mixPosts, token } = this.props;
    mixPosts(originPost.id, subPost.id, token);
  };

  getSrc = (post) => {
    if (post.Image !== undefined) return post.Image.path;
    return post['Image.path'];
  };

  render() {
    const { originPost, subPost } = this.props;
    return (
      <>
        <div className="mixPalette">
          <div className="mixPalette__header">
            <div className="mixPalette__header__title">{paletteTitle}</div>
            <div className="mixPalette__header__description">
              {paletteDescription}
            </div>
          </div>
          <div className="mixPalette__content">
            <div className="mixPalette__content__borderBox">
              <img src={this.getSrc(originPost)} alt="originPost" />
            </div>
            <div className="mixPalette__content__borderBox">
              <img src={this.getSrc(subPost)} alt="subPost" />
            </div>
          </div>
          <div className="mixPalette__footer">
            <NoStyleButton onClick={this.requestPostMix}>
              <div className="mixPalette__footer__mix">
                <img src={mixButton} alt="mixbutton" />
                <div className="mixPalette__footer__mix__text">Mix with</div>
              </div>
            </NoStyleButton>
          </div>
        </div>
      </>
    );
  }
}

MixPalette.propTypes = propTypes;
MixPalette.defaultProps = defaultProps;

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MixPalette),
);
