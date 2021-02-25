import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import { connect } from 'react-redux';
import { getFundingPosts } from 'Redux/fetch-post';

import Post from 'Components/Post/Post';
import PostList from 'Components/Post/PostList';
import FundButton from 'Components/Post/PostButton/FundButton';
import ShareButton from 'Components/Post/PostButton/ShareButton';
import NavBar from 'Components/Common/NavBar';
import Loader from 'Components/Common/Loader';
import Jumbotron from 'Components/Common/Jumbotron';
import DropFilter from 'Components/Common/DropFilter';
import NoStyleButton from 'Components/Form/NoStyleButton';
import MixChecker from 'Components/Mix/MixChecker';

import FILTER from 'Constants/filter-option';
import { fundingPost } from 'PropTypes/post';

import { withRouter } from 'react-router-dom';
import { DropdownItem } from 'reactstrap';
import cx from 'classnames';

const defaultProps = {
  user: null,
  fundingPosts: {
    onGoingPost: [],
    endPost: [],
  },
};

const propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
    nickname: PropTypes.string,
  }),
  getPosts: PropTypes.func.isRequired,
  fundingPosts: PropTypes.objectOf(fundingPost),
};

const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user,
    fundingPosts: state.fetchPostReducer.fundingPosts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: () => dispatch(getFundingPosts()),
  };
};

class FundingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 'Recommended',
      option: 'Ongoing',
      posts: [],
      feedLoading: true,
    };
  }

  componentDidMount = async () => {
    await this.fetchFundingPosts();
  };

  getPostByOption = () => {
    const { option } = this.state;
    const { fundingPosts } = this.props;
    const filteredPosts =
      option === 'Ongoing' ? fundingPosts.onGoingPost : fundingPosts.endPost;
    return filteredPosts;
  };

  fetchFundingPosts = async () => {
    const { getPosts } = this.props;
    await getPosts();
    const { fundingPosts } = this.props;
    if (fundingPosts) {
      this.setState({
        feedLoading: false,
        posts: this.getPostByOption(),
      });
    }
  };

  createDropDownItem = () => {
    const { user } = this.props;
    const { filter } = this.state;
    return FILTER.funding.map((option, index) => {
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
    const currentPost = this.getPostByOption();
    this.setState(() => ({
      posts: currentPost.sort((l, r) => {
        return l.created_at < r.created_at ? sortOrder : -1 * sortOrder;
      }),
    }));
  };

  getMyPosts = () => {
    const { user } = this.props;
    const currentPost = this.getPostByOption();
    return currentPost.filter((data) => data['User.id'] === user.id);
  };

  showMyPosts = () => {
    this.setState({ posts: this.getMyPosts() });
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
    this.setState({ filter: 'Recommended', posts: this.getPostByOption() });
  };

  showPostDetail = (postId) => {
    const { history } = this.props;
    const { option } = this.state;
    const searchQuery = `?postId=${postId}&isActive=${option}`;
    history.push({ pathname: '/detail', search: searchQuery });
  };

  renderPosts = () => {
    const { posts } = this.state;
    const fundIcon = (
      <>
        <FundButton />
        <ShareButton />
      </>
    );
    return posts.map((data) => (
      <Post
        key={data.id}
        post={data}
        hoverIcon={fundIcon}
        footerOption="funding"
        onClick={() => this.showPostDetail(data.id)}
      />
    ));
  };

  render() {
    const { option, posts, filter, feedLoading } = this.state;
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
                <NoStyleButton onClick={this.optionClickHandler}>
                  Ongoing
                </NoStyleButton>
              </span>
              <span className={cx('', { selected: option === 'End' })}>
                <NoStyleButton onClick={this.optionClickHandler}>
                  End
                </NoStyleButton>
              </span>
            </div>
            <div className="fundingPage__optionBar__filter">
              <DropFilter
                filterTitle={filter}
                items={this.createDropDownItem()}
              />
            </div>
          </div>
          <MixChecker />
          <PostList
            posts={posts && !feedLoading ? this.renderPosts() : <Loader />}
          />
        </div>
      </>
    );
  }
}

FundingPage.defaultProps = defaultProps;
FundingPage.propTypes = propTypes;

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FundingPage),
);
