import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { getPostByPostId } from 'Redux/post';

import NavBar from 'Components/Common/NavBar';
import FavoriteButton from 'Components/Post/PostButton/FavoriteButton';
import MixButton from 'Components/Post/PostButton/MixButton';

import DueDate from 'Assets/icons/DueDate';
import HeartImg from 'Assets/images/fundHeart-bg-removed.png';

import queryString from 'query-string';
import cx from 'classnames';

const defaultProps = {};
const propTypes = {
  getPost: PropTypes.func.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPost: async (postId, token) => dispatch(getPostByPostId(postId, token)),
  };
};
class DetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
    };
  }

  getSrc = () => {
    const { post } = this.state;
    if (post.Image !== undefined) return post.Image.path;
    return post['Image.path'];
  };

  getPostIdByQuery = () => {
    const { location } = this.props;
    const query = queryString.parse(location.search);
    const { postId } = query;
    return postId;
  };

  componentDidMount = async () => {
    const { getPost } = this.props;
    const postId = this.getPostIdByQuery();

    if (postId) {
      const detailedPost = await getPost(postId);
      await new Promise((accept) =>
        this.setState({ post: detailedPost }, accept),
      );
    }
  };

  render() {
    const active = 'funding';
    return (
      <>
        <NavBar isActive="detail" />
        <div className="detailPage">
          <div className="expand" />
          <div className="detailPage__content">
            <div className="detailPage__content__imageBox">
              <div className="detailPage__content__imageBox__inner">
                <img
                  className="detailPage__content__imageBox__image"
                  src={this.getSrc()}
                  alt="postImage"
                />
              </div>
            </div>
          </div>

          <div
            className={cx('detailPage__rightTab', {
              fundInfo: active === 'funding',
            })}
          >
            {active === 'funding' ? (
              <>
                <div className="detailPage__rightTab fundInfo__buttons">
                  <div>
                    <span>
                      <DueDate fill />
                    </span>
                    <span>1:32:21</span>
                  </div>
                  <div>
                    <span>
                      <img src={HeartImg} alt="fund-heart" />
                    </span>
                    <span>192</span>
                  </div>
                </div>
                <div className="detailPage__rightTab fundInfo__authors">
                  <div className="detailPage__rightTab fundInfo__authors__author">
                    <span className="detailPage__rightTab fundInfo__authors__author__imgUp">
                      <img src={null} alt="profile1" />
                    </span>
                    <span className="detailPage__rightTab fundInfo__authors__author__name">
                      HyoJI
                    </span>
                  </div>
                  <div className="authorMargin" />
                  <div className="detailPage__rightTab fundInfo__authors__author">
                    <span className="detailPage__rightTab fundInfo__authors__author__name">
                      hangsoo
                    </span>
                    <span className="detailPage__rightTab fundInfo__authors__author__imgDown">
                      <img src={null} alt="profile2" />
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <div className="detailPage__rightTab__buttons">
                <div>
                  <FavoriteButton liked />
                  <span className="">FAVORITE</span>
                </div>
                <div>
                  <MixButton />
                  <span className="">BLEND</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}

DetailPage.defaultProps = defaultProps;
DetailPage.propTypes = propTypes;

export default withRouter(connect(null, mapDispatchToProps)(DetailPage));
