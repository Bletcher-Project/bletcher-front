import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';

import { NavItem, NavLink } from 'reactstrap';
import { searchIcon } from 'Assets/icons/svg';
import Input from '../Common/Input';

const defaultProps = {};
const propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { word: '' };
  }

  handleChange = (e) => {
    this.setState({
      word: e.target.value,
    });
  };

  handleSearchPage = () => {
    const { history } = this.props;
    const { word } = this.state;
    history.push({ pathname: `/search?query=${word}` });
  };

  handleEnter = (e) => {
    if (!(e.key === 'Enter' && e.shiftKey) && e.key === 'Enter') {
      this.handleSearchPage();
    }
  };

  render() {
    return (
      <>
        <Input
          type="text"
          placeholder="search"
          helperText={null}
          width="130px"
          onKeyPress={this.handleEnter}
          onChange={this.handleChange}
        />
        <NavItem>
          <NavLink href="#" onClick={this.handleSearchPage}>
            {searchIcon}
          </NavLink>
        </NavItem>
      </>
    );
  }
}

Search.defaultProps = defaultProps;
Search.propTypes = propTypes;

export default Search;
