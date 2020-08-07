import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';

import queryString from 'query-string';
import cx from 'classnames';

import NavBar from 'Components/Common/NavBar';

import FavoriteButton from 'Assets/icons/FavoriteButton';
import MixButton from 'Assets/icons/MixButton';
import person from 'Assets/icons/person';
import DueDate from 'Assets/icons/DueDate';

import dummyPost from 'Dummies/dummyPost';

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
    const { authorId, postId, active } = query;
    const postInfo = dummyPost.posts.filter(
      (post) => JSON.stringify(post.id) === postId,
    )[0];
    return (
      <>
        <NavBar isActive="detail" />
        <div className="detailPage">
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
                <div>
                  <span>{/* user1 profileImg */}</span>
                  <span>권혁진</span>
                </div>
                <div>
                  <span>{/* user2 profileImg */}</span>
                  <span>권혁순</span>
                </div>
                <div>
                  <span>
                    <DueDate />
                  </span>
                  <span>1:32:21</span>
                </div>
                <div>
                  <span>{person}</span>
                  <span>192/300</span>
                </div>
              </>
            ) : (
              <>
                <div>
                  <FavoriteButton liked />
                  <span className="detailPage__rightTab__buttonText">
                    FAVORITE
                  </span>
                </div>
                <div>
                  <MixButton />
                  <span className="detailPage__rightTab__buttonText">
                    BLEND
                  </span>
                </div>
              </>
            )}
          </div>
          <div className="detailPage__footer">
            <div className="detailPage__footer__title">
              {`${authorId}'s MASTERPIECE`}
            </div>
          </div>
        </div>
      </>
    );
  }
}

DetailPage.defaultProps = defaultProps;
DetailPage.propTypes = propTypes;

export default withRouter(DetailPage);
