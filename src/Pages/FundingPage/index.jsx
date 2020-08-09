import React, { Component } from 'react';

import cx from 'classnames';

import Post from 'Components/Post/Post';
import NavBar from 'Components/Common/NavBar';
import Jumbotron from 'Components/Common/Jumbotron';
import NoStyleButton from 'Components/Form/Button/NoStyleButton';

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import dummyPost from 'Dummies/dummyPost';

const defaultProps = {};
const propTypes = {};

class FundingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      option: 'Ongoing',
    };
  }

  optionClickHandler = (e) => {
    if (e.target.innerText === 'End') {
      this.setState({ option: 'End' });
    } else {
      this.setState({ option: 'Ongoing' });
    }
  };

  toggle = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };

  render() {
    const { isOpen, option } = this.state;
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
            <div className="fundingPage__optionBar__recommend">
              <Dropdown isOpen={isOpen} toggle={this.toggle}>
                <DropdownToggle>Recommended</DropdownToggle>
                <DropdownMenu
                  modifiers={{
                    setMaxHeight: {
                      enabled: true,
                      order: 890,
                      fn: (data) => {
                        return {
                          ...data,
                          styles: {
                            ...data.styles,
                            overflow: 'auto',
                            maxHeight: '100px',
                            borderRadius: '0 0 20px 20px',
                          },
                        };
                      },
                    },
                  }}
                >
                  <DropdownItem>Latest</DropdownItem>
                  <DropdownItem>Time Limit</DropdownItem>
                  <DropdownItem>Popular</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
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
