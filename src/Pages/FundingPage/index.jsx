import React, { Component } from 'react';

import cx from 'classnames';

import Post from 'Components/Post/Post';
import NavBar from 'Components/Common/NavBar';
import Jumbotron from 'Components/Common/Jumbotron';
import NoStyleButton from 'Components/Form/Button/NoStyleButton';
import DropFilter from 'Components/Common/DropFilter';
import Upload from 'Components/Upload/UploadPost';

import FILTER from 'Constants/filter-option';

import { DropdownItem } from 'reactstrap';

import dummyPost, { dummyDueDate } from 'Dummies/dummyPost';

const defaultProps = {};
const propTypes = {};

class FundingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 'Filter',
      option: 'Ongoing',
      filteredPosts: dummyPost.posts.filter(
        (data) => new Date(data.createdAt) < dummyDueDate,
      ),
    };
  }

  createDropDownItem = () => {
    return FILTER.map((option) => (
      <DropdownItem key={option[1]} onClick={this.dropDownHandler}>
        {option[0]}
      </DropdownItem>
    ));
  };

  orderPost = (sortOption) => {
    const sortOrder = sortOption === 'Latest' ? -1 : 1;
    this.setState((prevState) => ({
      filteredPosts: prevState.filteredPosts.sort((l, r) => {
        return l.createdAt < r.createdAt ? sortOrder : -1 * sortOrder;
      }),
    }));
  };

  filterDueDate = () => {
    const { option } = this.state;
    const filtered =
      option === 'Ongoing'
        ? dummyPost.posts.filter(
            (data) => new Date(data.createdAt) < dummyDueDate,
          )
        : dummyPost.posts.filter(
            (data) => new Date(data.createdAt) >= dummyDueDate,
          );
    this.setState({
      filteredPosts: filtered,
    });
  };

  dropDownHandler = (e) => {
    const target = e.target.innerText;
    if (target === 'Popular') {
      // sort by funding Favorite
    } else if (target === 'Recommended') {
      // sort by our favorite
    } else {
      this.orderPost(target);
    }
    this.setState({ filter: target });
  };

  optionClickHandler = async (e) => {
    await new Promise((accept) =>
      this.setState({ option: e.target.innerText }, accept),
    );
    this.filterDueDate();
  };

  render() {
    const { option, filteredPosts, filter } = this.state;
    return (
      <>
        <NavBar isActive="funding" />
        <Jumbotron
          title="Funding"
          description="One vote for a favorite work, launching a work"
        />
        <Upload
          userId={1}
          token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJkb2dAbmF2ZXIuY29tIiwiaWF0IjoxNTk3OTk0ODYzLCJleHAiOjE1OTg1OTk2NjMsImlzcyI6ImJsZXRjaGVyIiwic3ViIjoidXNlckluZm8ifQ.RhmakhIB5O1ubIjisr4SM2zrF3nttfzM1QQFlYmeqC8"
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
            <div className="fundingPage__optionBar__recommend">
              <DropFilter
                filterTitle={filter}
                items={this.createDropDownItem()}
              />
            </div>
          </div>
          <div className="fundingPage__postList">
            {filteredPosts.map((data) => {
              return (
                <Post
                  postId={data.id}
                  postImg={data.postImgName}
                  postTitle={data.postTitle}
                  isFavorite={data.isFavorite}
                  userId={data.UserId}
                  createdAt={data.createdAt}
                  key={data.id}
                  isActive={option === 'End' ? 'fundingEnd' : 'funding'}
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
