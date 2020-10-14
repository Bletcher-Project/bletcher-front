import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NoStyleButton from 'Components/Form/NoStyleButton';

import dummyPost from 'Dummies/dummyPost';

import cx from 'classnames';

const propTypes = {
  modalRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
};

class BottomSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
    };
  }

  toggle = () => {
    const { isExpanded } = this.state;
    this.setState({ isExpanded: !isExpanded });
  };

  tmpMapper = () => {
    const tmp = [
      <img alt="img" src={dummyPost.posts[0].postImgName} />,
      <img alt="img" src={dummyPost.posts[1].postImgName} />,
      <img alt="img" src={dummyPost.posts[2].postImgName} />,
      <img alt="img" src={dummyPost.posts[3].postImgName} />,
      <img alt="img" src={dummyPost.posts[4].postImgName} />,
      <img alt="img" src={dummyPost.posts[5].postImgName} />,
      <img alt="img" src={dummyPost.posts[6].postImgName} />,
      <img alt="img" src={dummyPost.posts[0].postImgName} />,
      <img alt="img" src={dummyPost.posts[1].postImgName} />,
      <img alt="img" src={dummyPost.posts[2].postImgName} />,
      <img alt="img" src={dummyPost.posts[3].postImgName} />,
      <img alt="img" src={dummyPost.posts[4].postImgName} />,
      <img alt="img" src={dummyPost.posts[5].postImgName} />,
      <img alt="img" src={dummyPost.posts[6].postImgName} />,
    ];
    return tmp.map((post) => {
      return <div className="bottomSheet__content__postList__post">{post}</div>;
    });
  };

  render() {
    const { isExpanded } = this.state;
    const { modalRef } = this.props;
    return (
      <>
        <div className="blackMask" />
        <div
          ref={modalRef}
          className={cx('bottomSheet', {
            expanded: isExpanded,
          })}
        >
          <div className="bottomSheet__header">
            <NoStyleButton onClick={this.toggle}>
              <span className="bottomSheet__header__buttonText">
                {isExpanded ? '∨' : '∧'}
              </span>
            </NoStyleButton>
          </div>
          <div className="bottomSheet__content">
            <div className="bottomSheet__content__postList">
              {this.tmpMapper()}
            </div>
          </div>
        </div>
      </>
    );
  }
}

BottomSheet.propTypes = propTypes;

export default BottomSheet;
