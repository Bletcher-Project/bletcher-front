import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { getPostByPostId } from 'Redux/post';

import NavBar from 'Components/Common/NavBar';

import DueDate from 'Assets/images/dueDate-filled.svg';
import HeartImg from 'Assets/images/fundHeart-bg-purple.png';

import profile1 from 'Dummies/dummyImage/1.jpg';
import profile2 from 'Dummies/dummyImage/2.jpg';

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
      isActive: '',
    };
  }

  getSrc = () => {
    const { post } = this.state;
    if (post.Image !== undefined) return post.Image.path;
    return post && post['Image.path'];
  };

  getParamsByQuery = () => {
    const { location } = this.props;
    const query = queryString.parse(location.search);
    return query;
  };

  linkToNotFound = () => {
    window.location.replace('/notFound');
  };

  componentDidMount = async () => {
    const { getPost } = this.props;
    const params = this.getParamsByQuery();
    const { postId, isActive } = params;

    if (postId) {
      const detailedPost = await getPost(postId);
      await new Promise((accept) =>
        this.setState({ post: detailedPost }, accept),
      );
    } else this.linkToNotFound();

    if (isActive === 'Ongoing' || isActive === 'End')
      await new Promise((accept) => this.setState({ isActive }, accept));
    else this.linkToNotFound();
  };

  render() {
    const { isActive } = this.state;
    return (
      <div className="wrapper">
        <NavBar isActive="detail" />
        <div className="detailPage">
          <div className="expand" />
          <div className="detailPage__content">
            <div className="detailPage__content__inner">
              <img
                className="detailPage__content__image"
                src={this.getSrc()}
                alt="postImage"
              />
            </div>
          </div>

          <div
            className={cx('detailPage__rightTab', {
              end: isActive === 'End',
            })}
          >
            {isActive !== 'End' && (
              <div className="detailPage__rightTab__buttons">
                <div>
                  <span>
                    <img src={DueDate} alt="dueDate" />
                  </span>
                  <span>1:32:21</span>
                </div>
                <div>
                  <span>
                    <img src={HeartImg} alt="fund-heart" />
                  </span>
                  <span>362</span>
                </div>
              </div>
            )}
            <div
              className={cx('detailPage__rightTab__authors', {
                end: isActive === 'End',
              })}
            >
              <div className="detailPage__rightTab__authors__author">
                <span className="detailPage__rightTab__authors__author__img">
                  <img src={profile1} alt="profile1" />
                </span>
                <span className="detailPage__rightTab__authors__author__name">
                  HyoJI
                </span>
              </div>
              <div className="authorMargin" />
              <div className="detailPage__rightTab__authors__author">
                <span className="detailPage__rightTab__authors__author__name">
                  hangsoo
                </span>
                <span className="detailPage__rightTab__authors__author__img">
                  <img src={profile2} alt="profile2" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DetailPage.defaultProps = defaultProps;
DetailPage.propTypes = propTypes;

export default withRouter(connect(null, mapDispatchToProps)(DetailPage));
