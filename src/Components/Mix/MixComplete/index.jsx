/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getPostByPostId } from 'Redux/post';

import NoStyleButton from 'Components/Form/NoStyleButton';

import { publicTos, privateTos } from 'Constants/mix-tos';

import { withRouter } from 'react-router-dom';

const defaultProps = {
  mixId: null,
  token: '',
  getMixedPost: null,
};

const propTypes = {
  mixId: PropTypes.number,
  token: PropTypes.string,
  getMixedPost: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMixedPost: (postId, token) => {
      return dispatch(getPostByPostId(postId, token));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
    mixId: state.postReducer.mixState.mixId,
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

  categoryMapper = (array) => {
    return array.map((category) => {
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

  testValid = (testing, sub) => {
    return testing && sub;
  };

  componentDidMount = async () => {
    const { getMixedPost, mixId, token } = this.props;
    const mPost = await getMixedPost(mixId, token);
    this.setState({ mixedPost: mPost });
  };

  render() {
    const { isPublic, mixedPost } = this.state;
    const tmpCategory = ['watercolor', 'contemporary', 'people'];
    return (
      <>
        <div className="mixComplete">
          <div className="mixComplete__header">
            <div className="mixComplete__header__title">
              Composition completed successfully.
            </div>
            <div className="mixComplete__header__description">
              Both public and private works are automatically saved on my feed.
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
              {this.testValid(
                isPublic,
                <div className="mixComplete__content__rightBox__categories">
                  {this.categoryMapper(tmpCategory)}
                </div>,
              )}
              <div className="mixComplete__content__rightBox__tos">
                <div className="mixComplete__content__rightBox__tos__header">
                  {this.testValid(isPublic, 'SHOP_40% stake')}
                </div>
                <div className="mixComplete__content__rightBox__tos__description">
                  {this.getTos()}
                </div>
              </div>
              <div className="mixComplete__content__rightBox__buttons">
                <NoStyleButton>Shortcut to My Feeds</NoStyleButton>
                <NoStyleButton>To recompose</NoStyleButton>
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
