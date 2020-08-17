import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';

import queryString from 'query-string';
import cx from 'classnames';

import NavBar from 'Components/Common/NavBar';

import FavoriteButton from 'Assets/icons/FavoriteButton';
import MixButton from 'Assets/icons/MixButton';
import DueDate from 'Assets/icons/DueDate';
import FundHeart from 'Assets/icons/FundHeart';

import dummyPost from 'Dummies/dummyPost';
import dummyProfile1 from 'Dummies/dummyImage/1.jpg';
import dummyProfile2 from 'Dummies/dummyImage/2.jpg';

const defaultProps = {};
const propTypes = {
  location: ReactRouterPropTypes.location.isRequired,
};

class DetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { location } = this.props;
    const query = queryString.parse(location.search);
    const { postId, active } = query;
    const postInfo = dummyPost.posts.filter(
      (post) => JSON.stringify(post.id) === postId,
    )[0];
    return (
      <>
        <NavBar isActive="detail" />
        <div className="detailPage">
          <div className="expand" />
          <div className="detailPage__content">
            <div className="detailPage__content__imageBox">
              <img
                className="detailPage__content__imageBox__image"
                src={postInfo.postImgName}
                alt="postImage"
              />
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
                      <FundHeart fill />
                    </span>
                    <span>192</span>
                  </div>
                </div>
                <div className="detailPage__rightTab fundInfo__authors">
                  <div className="detailPage__rightTab fundInfo__authors__author">
                    <span className="detailPage__rightTab fundInfo__authors__author__img">
                      <img src={dummyProfile1} alt="profile1" />
                    </span>
                    <span className="detailPage__rightTab fundInfo__authors__author__name">
                      HyoJI
                    </span>
                  </div>
                  <div className="detailPage__rightTab fundInfo__authors__author">
                    <span className="detailPage__rightTab fundInfo__authors__author__name">
                      hangsoo
                    </span>
                    <span className="detailPage__rightTab fundInfo__authors__author__img">
                      <img src={dummyProfile2} alt="profile2" />
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

export default withRouter(DetailPage);
