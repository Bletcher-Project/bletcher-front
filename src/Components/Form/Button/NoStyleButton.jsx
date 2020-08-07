import React, { Component } from 'react';

import PropTypes from 'prop-types';

const defaultProps = {
  onClick: null,
  content: null,
};

const propTypes = {
  onClick: PropTypes.func,
  content: PropTypes.node,
};

class NoStyleButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { onClick, content } = this.props;
    return (
      <div
        className="none-style-button"
        role="button"
        onClick={onClick}
        onKeyPress={onClick}
        tabIndex={0}
      >
        {content}
      </div>
    );
  }
}

NoStyleButton.propTypes = propTypes;
NoStyleButton.defaultProps = defaultProps;

export default NoStyleButton;
