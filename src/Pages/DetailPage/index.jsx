import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';

import NavBar from 'Components/Common/NavBar';
import queryString from 'query-string';
import { IMAGE, IMAGE_POST } from 'Constants/api-uri';

import LikeStar from 'Assets/icons/LikeStar';
import MixButton from 'Assets/icons/MixButton';

import dummyPost from 'Pages/MainPage/dummyPost.json';

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
    const { authorId, postId } = query;
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
                src={`${process.env.REACT_APP_SERVER_URL}${IMAGE}${IMAGE_POST}/${postInfo.postImgName}`}
                alt="postImage"
              />
            </div>
          </div>

          <div className="detailPage__feature">
            <div>
              <LikeStar liked />
              <span className="detailPage__feature__buttonText">FAVORITE</span>
            </div>
            <div>
              <MixButton />
              <span className="detailPage__feature__buttonText">BLEND</span>
            </div>
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
