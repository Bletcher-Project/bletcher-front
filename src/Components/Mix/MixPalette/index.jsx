import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NoStyleButton from 'Components/Form/NoStyleButton';

import mixButton from 'Assets/images/mixButton.png';

import cx from 'classnames';
import post from 'Redux/post';

const postPropTypes = () => {
  return PropTypes.shape({
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
  });
};

const propTypes = {
  paletteRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
  originPost: postPropTypes().isRequired,
  subPost: postPropTypes().isRequired,
};

class MixPalette extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { paletteRef, originPost, subPost } = this.props;
    return (
      <>
        <div className="blackMask" />
        <div className="mixPalette" ref={paletteRef}>
          <div className="mixPalette__header">
            <h1 className="mixPalette__header__title">
              Please Select a work to upload
            </h1>
            <p className="mixPalette__header__description">
              Both public and private works are automatically saved on my feed.
            </p>
          </div>
          <div className="mixPalette__content">
            <img src={originPost.Image.path} alt="originPost" />
            <img src={subPost.Image.path} alt="subPost" />
          </div>
          <div className="mixPalette__footer">
            <NoStyleButton>
              <div className="mixPalette__footer__mix">
                <img src={mixButton} alt="mixbutton" />
                <div className="mixPalette__footer__mix__text">Mix with</div>
              </div>
            </NoStyleButton>
          </div>
        </div>
      </>
    );
  }
}

MixPalette.propTypes = propTypes;

export default MixPalette;
