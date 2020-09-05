import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import cx from 'classnames';

// import Post from 'Components/Post/__Post';
import Post from 'Components/Post/Post';
import PostList from 'Components/Post/PostList';
import FundHeart from 'Components/Post/PostButton/FundHeart';
import ShareButton from 'Components/Post/PostButton/ShareButton';
import NavBar from 'Components/Common/NavBar';
import Loader from 'Components/Common/Loader';
import Jumbotron from 'Components/Common/Jumbotron';
import DropFilter from 'Components/Common/DropFilter';
import NoStyleButton from 'Components/Form/Button/NoStyleButton';

import FILTER from 'Constants/filter-option';

import { DropdownItem } from 'reactstrap';

// import { dummyDueDate } from 'Dummies/dummyPost';
import * as PostAction from 'Redux/post';

const defaultProps = {
  user: null,
  token: null,
};

const propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    nickname: PropTypes.string,
  }),
  dispatch: PropTypes.func.isRequired,
  token: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
    user: state.authReducer.user,
  };
};

class FundingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 'Recommended',
      option: 'Ongoing',
      filteredPosts: [],
      posts: [],
      feedLoading: true,
    };
  }

  componentDidMount = async () => {
    await this.getAllPosts();
  };

  getAllPosts = async () => {
    const { dispatch, token } = this.props;
    await dispatch(PostAction.getAllPosts(token)).then((result) => {
      this.setState({ posts: result });
    });

    const { posts } = this.state;
    await new Promise((accept) => {
      this.setState(
        {
          filteredPosts: posts,
          feedLoading: false,
        },
        accept,
      );
    });
  };

  createDropDownItem = () => {
    const user = this.props;
    const { filter } = this.state;
    return FILTER.map((option, index) => {
      if ((index === 0 && !user) || option[0] === filter) return null;
      return (
        <DropdownItem key={option[1]} onClick={this.dropDownHandler}>
          {option[0]}
        </DropdownItem>
      );
    });
  };

  orderPost = (sortOption) => {
    const sortOrder = sortOption === 'Latest' ? -1 : 1;
    const { posts } = this.state;
    this.setState(() => ({
      filteredPosts: posts.sort((l, r) => {
        return l.created_at < r.created_at ? sortOrder : -1 * sortOrder;
      }),
    }));
  };

  getMyPosts = () => {
    const { user } = this.props;
    const { posts } = this.state;
    return posts.filter((data) => data.User.id === user.id);
  };

  showMyPosts = () => {
    const myPosts = this.getMyPosts();
    this.setState({ filteredPosts: myPosts });
  };

  filterDueDate = () => {
    const { option, posts } = this.state;
    // const filtered = option === 'Ongoing' ? posts : null;
    // ? posts.filter((data) => new Date(data.created_at) < dummyDueDate)
    // : posts.filter((data) => new Date(data.created_at) >= dummyDueDate);
    this.setState({
      filteredPosts: posts,
    });
  };

  dropDownHandler = (e) => {
    const target = e.target.innerText;
    if (target === 'Popular') {
      // sort by funding Favorite
    } else if (target === 'Recommended') {
      // sort by our favorite
    } else if (target === 'My') {
      this.showMyPosts();
    } else {
      this.orderPost(target);
    }
    this.setState({ filter: target });
  };

  optionClickHandler = async (e) => {
    await new Promise((accept) =>
      this.setState({ option: e.target.innerText }, accept),
    );
    this.setState({ filter: 'Recommended' });
    this.filterDueDate();
  };

  renderPosts = () => {
    const { filteredPosts } = this.state;
    const fundIcon = (
      <>
        <FundHeart fill />
        <ShareButton />
      </>
    );
    return filteredPosts.map((data) => (
      <Post key={data.id} post={data} hoverIcon={fundIcon} />
    ));
  };

  render() {
    const { option, filteredPosts, filter, feedLoading } = this.state;
    const post =
      filteredPosts && !feedLoading ? this.renderPosts() : <Loader />;
    return (
      <>
        <NavBar isActive="funding" />
        <Jumbotron
          title="Funding"
          description="One vote for a favorite work, launching a work"
        />
        <div className="fundingPage">
          <div className="fundingPage__optionBar">
            <div className="fundingPage__optionBar__state">
              <span className={cx('', { selected: option === 'Ongoing' })}>
                <NoStyleButton
                  onClick={this.optionClickHandler}
                  content="Ongoing"
                />
              </span>
              <span className={cx('', { selected: option === 'End' })}>
                <NoStyleButton
                  onClick={this.optionClickHandler}
                  content="End"
                />
              </span>
            </div>
            <div className="fundingPage__optionBar__filter">
              <DropFilter
                filterTitle={filter}
                items={this.createDropDownItem()}
              />
            </div>
          </div>
          <PostList posts={post} />
        </div>
      </>
    );
  }
}

FundingPage.defaultProps = defaultProps;
FundingPage.propTypes = propTypes;

export default connect(mapStateToProps)(FundingPage);
