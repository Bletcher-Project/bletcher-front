import React, { Component } from 'react';

import NavBar from 'Components/Main/NavBar';

const defaultProps = {};
const propTypes = {};

class NotFoundPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <NavBar isActive="notfound" />
        <div className="notFoundPage">
          <div className="notFoundPage__header">
            <div className="notFoundPage__header__notice">
              <span>요청한 페이지를 찾을 수 없습니다!</span>
            </div>
          </div>
        </div>
      </>
    );
  }
}

NotFoundPage.defaultProps = defaultProps;
NotFoundPage.propTypes = propTypes;

export default NotFoundPage;
