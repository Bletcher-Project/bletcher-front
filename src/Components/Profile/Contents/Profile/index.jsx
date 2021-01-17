import React from 'react';
import PropTypes from 'prop-types';
import { userType } from 'PropTypes';

import Thumbnail from 'Components/Thumbnail';
import Input from 'Components/Form/Input';

const defaultProps = { user: null };
const propTypes = { user: userType };

function Profile(props) {
  const { user } = props;
  console.log(user);
  const handleChange = () => {
    // TODO: 다음 PR에서 구현 예정
  };

  return (
    <div className="profile">
      <div className="profile__form">
        <div className="profile__form-photo">
          <Thumbnail
            src={user && user.profile_image}
            userName={user && user.nickname}
          />
        </div>
        <p className="profile__form-desc">
          Bletcher users will be able to identify you with the information
          below.
        </p>
        <Input
          placeholder="User Name"
          type="text"
          autoComplete="username"
          width="100%"
          onChange={handleChange}
        />
        <Input
          placeholder="Website"
          type="text"
          autoComplete="url"
          width="100%"
          onChange={handleChange}
        />
        <Input
          placeholder="Short Introduce"
          type="text"
          width="100%"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

Profile.defaultProps = defaultProps;
Profile.propTypes = propTypes;

export default Profile;
