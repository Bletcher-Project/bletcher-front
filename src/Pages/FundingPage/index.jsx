import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

import FILTER from 'Constants/filter-option';

import { DropdownItem } from 'reactstrap';
import cx from 'classnames';

const defaultProps = {
  user: null,
  fundingPost: [],
};

const propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    nickname: PropTypes.string,
  }),
  getPosts: PropTypes.func.isRequired,
  fundingPost: PropTypes.arrayOf(
    PropTypes.shape({
      Category: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }),
      Image: PropTypes.shape({
        id: PropTypes.number.isRequired,
        path: PropTypes.string,
      }),
      User: PropTypes.shape({
        id: PropTypes.number.isRequired,
        nickname: PropTypes.string.isRequired,
      }),
      created_at: PropTypes.string.isRequired,
      description: PropTypes.string,
      id: PropTypes.number.isRequired,
      is_public: PropTypes.bool.isRequired,
      title: PropTypes.string.isRequired,
      updated_at: PropTypes.string.isRequired,
    }).isRequired,
  ),
};

const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user,
    fundingPost: state.fetchPostReducer.fundingPost,
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

  fetchFundingPosts = async () => {
    const { getPosts } = this.props;
    await getPosts();
    const { fundingPost } = this.props;
    if (fundingPost) {
      this.filterDueDate();
      this.setState({
        feedLoading: false,
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
    this.setState((prevState) => ({
      posts: prevState.posts.sort((l, r) => {
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
    this.setState({ posts: myPosts });
  };

  filterDueDate = () => {
    const { option } = this.state;
    const { fundingPost } = this.props;
    const filteredPosts = fundingPost.filter((data) => {
      const dueDate = new Date(data.created_at);
      dueDate.setDate(dueDate.getDate() + 31);
      if (option === 'Ongoing') {
        return dueDate > new Date() ? data : null;
      }
      return dueDate <= new Date() ? data : null;
    });

    this.setState({
      posts: filteredPosts,
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

export default connect(mapStateToProps, mapDispatchToProps)(FundingPage);
