import React, { Component } from 'react';

import Post from 'Components/Post/Post';
import NavBar from 'Components/Common/NavBar';

import dummyPost from 'Dummies/dummyPost';

const defaultProps = {};
const propTypes = {};

class FundingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <NavBar isActive="funding" />
        <div className="fundingPage">
          <div className="fundingPage__postList">
            {dummyPost.posts.map((data) => {
              return (
                <Post
                  postId={data.id}
                  postImg={data.postImgName}
                  postTitle={data.postTitle}
                  isFavorite={data.isFavorite}
                  userId={data.UserId}
                  key={data.id}
                  isActive="funding"
                />
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

FundingPage.defaultProps = defaultProps;
FundingPage.propTypes = propTypes;

export default FundingPage;
