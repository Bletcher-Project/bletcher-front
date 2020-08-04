import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import ReactRouterPropTypes from 'react-router-prop-types';

import queryString from 'query-string';

import NavBar from 'Components/Common/NavBar';

const defaultProps = {};
const propTypes = {
  location: ReactRouterPropTypes.location.isRequired,
};

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { location } = this.props;
    const query = queryString.parse(location.search);
    return (
      <>
        <NavBar isActive="search" />
        <div className="searchPage">
          <div className="searchPage__header">
            {` '${query ? query.query : ''}' 검색 결과입니다.`}
          </div>
          <div className="searchPage__content"> 결과창 </div>
        </div>
      </>
    );
  }
}

SearchPage.defaultProps = defaultProps;
SearchPage.propTypes = propTypes;

export default withRouter(SearchPage);
