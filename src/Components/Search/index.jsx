import React, { Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';

import { Input } from '@material-ui/core';
import searchIcon from 'Assets/icons/search';

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
    history.push({
      pathname: '/search',
      search: `?query=${word}`,
    });
  };

  handleEnter = (e) => {
    if (!(e.key === 'Enter' && e.shiftKey) && e.key === 'Enter') {
      this.handleSearchPage();
    }
  };

  render() {
    return (
      <div className="search">
        <button
          className="search__button"
          type="button"
          onClick={this.handleSearchPage}
        >
          {searchIcon}
        </button>
        <Input
          disableUnderline
          onChange={this.handleChange}
          onKeyPress={this.handleEnter}
        />
      </div>
    );
  }
}

Search.defaultProps = defaultProps;
Search.propTypes = propTypes;

export default Search;
