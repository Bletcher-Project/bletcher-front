import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getNewPosts } from 'Redux/fetch-post';

import NoStyleButton from 'Components/Form/NoStyleButton';
import BlackMask from 'Components/Common/BlackMask';

import cx from 'classnames';

const defaultProps = {
  subPosts: [],
};

const propTypes = {
  tableRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
  postSubPost: PropTypes.func.isRequired,
  getPostList: PropTypes.func.isRequired,
  originPostId: PropTypes.number.isRequired,
  subPosts: PropTypes.arrayOf(
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
    }),
  ),
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
              <img src={post.Image.path} alt="subPost" />
            </NoStyleButton>
          </div>
        );
      }),
    });
  };

  componentDidMount = async () => {
    const { getPostList } = this.props;
    await getPostList();
    await this.initSubPostList();
  };

  render() {
    const { subPostList, isExpanded } = this.state;
    const { tableRef } = this.props;
    return (
      <>
        <BlackMask />
        <div
          ref={tableRef}
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
            <div className="mixTable__content__postList">{subPostList}</div>
          </div>
        </div>
      </>
    );
  }
}

MixTable.propTypes = propTypes;
MixTable.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(MixTable);
