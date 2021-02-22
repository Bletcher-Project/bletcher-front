import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getNewPosts } from 'Redux/fetch-post';

import NoStyleButton from 'Components/Form/NoStyleButton';

import { basicType } from 'PropTypes/post';

import cx from 'classnames';

const defaultProps = {
  subPosts: [],
};

const propTypes = {
  postSubPost: PropTypes.func.isRequired,
  getPostList: PropTypes.func.isRequired,
  originPostId: PropTypes.number.isRequired,
  subPosts: PropTypes.arrayOf(basicType),
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPostList: () => {
      return dispatch(getNewPosts());
    },
  };
};

const mapStateToProps = (state) => {
  return {
    subPosts: state.fetchPostReducer.newPost,
  };
};

class MixTable extends Component {
  subPostListRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
      subPostList: [],
    };
  }

  toggle = () => {
    const { isExpanded } = this.state;
    this.setState({ isExpanded: !isExpanded });
  };

  getSrc = (post) => {
    if (post.Image !== undefined) return post.Image.path;
    return post['Image.path'];
  };

  initSubPostList = async () => {
    const { subPosts, originPostId, postSubPost } = this.props;
    const tmpSubPostList = subPosts.filter((post) => {
      return post.id !== originPostId;
    });
    this.setState({
      subPostList: tmpSubPostList.map((post) => {
        return (
          <div className="mixTable__content__postList__post" key={post.id}>
            <NoStyleButton
              onClick={() => {
                postSubPost(post);
              }}
            >
              <img src={this.getSrc(post)} alt="subPost" />
            </NoStyleButton>
          </div>
        );
      }),
    });
  };

  showPostAfterRender = () => {
    setTimeout(() => {
      if (this.subPostListRef.current)
        this.subPostListRef.current.style.display = 'flex';
    }, 1000);
  };

  componentDidMount = async () => {
    const { getPostList } = this.props;

    await getPostList();
    await this.initSubPostList();
    this.showPostAfterRender();
  };

  render() {
    const { subPostList, isExpanded } = this.state;
    return (
      <>
        <div
          className={cx('mixTable', {
            expanded: isExpanded,
          })}
        >
          <div className="mixTable__header">
            <NoStyleButton onClick={this.toggle}>
              <span className="mixTable__header__buttonText">
                <div className={isExpanded ? 'arrDown' : 'arrUp'}>
                  <span className="arrow" />
                </div>
              </span>
            </NoStyleButton>
          </div>
          <div className="mixTable__content">
            <div
              className="mixTable__content__postList"
              ref={this.subPostListRef}
              style={{ display: 'none' }}
            >
              {subPostList}
            </div>
          </div>
        </div>
      </>
    );
  }
}

MixTable.propTypes = propTypes;
MixTable.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(MixTable);
