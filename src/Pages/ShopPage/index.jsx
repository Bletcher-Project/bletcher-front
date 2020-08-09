import React, { Component } from 'react';

import NavBar from 'Components/Common/NavBar';
import Post from 'Components/Post/Post';

import dummyPost from 'Dummies/dummyPost';

const defaultProps = {};
const propTypes = {};

class ShopPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <>
          <NavBar isActive="shop" />
          <div className="shopPage">
            <div className="shopPage__postList">
              {dummyPost.posts.map((data) => {
                return (
                  <Post
                    postId={data.id}
                    postImg={data.postImgName}
                    postTitle={data.postTitle}
                    isFavorite={data.isFavorite}
                    userId={data.UserId}
                    key={data.id}
                    isActive="shop"
                  />
                );
              })}
            </div>
          </div>
        </>
      </>
    );
  }
}

ShopPage.defaultProps = defaultProps;
ShopPage.propTypes = propTypes;

export default ShopPage;
