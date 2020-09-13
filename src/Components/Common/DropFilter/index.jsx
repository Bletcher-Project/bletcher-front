import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

const propTypes = {
  items: PropTypes.arrayOf(PropTypes.element).isRequired,
  filterTitle: PropTypes.string.isRequired,
};

class DropFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  toggle = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };

  render() {
    const { isOpen } = this.state;
    const { items, filterTitle } = this.props;
    return (
      <div className="DropFilter">
        <Dropdown isOpen={isOpen} toggle={this.toggle}>
          <DropdownToggle>{filterTitle}</DropdownToggle>
          <DropdownMenu
            style={{
              left: '50%',
              transform: 'translateX(-50%)',
              top: '89%',
              zIndex: '1',
              position: 'absolute',
            }}
          >
            {items}
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

DropFilter.propTypes = propTypes;

export default DropFilter;
