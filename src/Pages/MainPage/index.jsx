import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { getMainPosts } from 'Redux/fetch-post';

import NavBar from 'Components/Common/NavBar';
import Jumbotron from 'Components/Common/Jumbotron';
import BoxLoader from 'Components/Loader/Box';
import Post from 'Components/Post/Post';
import PostList from 'Components/Post/PostList';
import MixButton from 'Components/Post/PostButton/MixButton';
import FavoriteButton from 'Components/Post/PostButton/FavoriteButton';
import MixChecker from 'Components/Mix/MixChecker';

const defaultProps = {};
const propTypes = {};

function MainPage() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.token);
  const user = useSelector((state) => state.authReducer.user);
  const mainPost = useSelector((state) => state.fetchPostReducer.mainPost);
  const mainPageNum = useSelector(
    (state) => state.fetchPostReducer.mainPageNum,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMainPosts = async () => {
      if (!token) {
        await dispatch(getMainPosts(0, mainPageNum));
        setLoading(false);
      } else if (user) {
        await dispatch(getMainPosts(user.id, mainPageNum));
        setLoading(false);
      }
    };

    fetchMainPosts();
  }, [token, user, mainPageNum, dispatch]);

  const renderPosts = () => {
    return mainPost.map((data) => (
      <Post
        key={data.post.id}
        post={data.post}
        hoverIcon={
          <>
            <MixButton originPost={data.post} />
            <FavoriteButton postId={data.post.id} liked={data.isFavorite} />
          </>
        }
        headerPosition="hidden"
        headerBackground
      />
    ));
  };

  return (
    <div className="mainPage">
      <NavBar isActive="main" />
      <Jumbotron title="Find out" description="What other people painted" />
      <MixChecker />
      <PostList posts={!loading ? renderPosts() : <BoxLoader />} />
    </div>
  );
}

MainPage.defaultProps = defaultProps;
MainPage.propTypes = propTypes;

export default MainPage;
