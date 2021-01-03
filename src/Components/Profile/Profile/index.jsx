import React from 'react';

import Thumbnail from 'Components/Thumbnail';
import Input from 'Components/Form/Input';

function Profile() {
  return (
    <div className="profile">
      <div className="profile__form">
        <div className="profile__form-photo">
          <Thumbnail />
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
        />
        <Input
          placeholder="Website"
          type="text"
          autoComplete="url"
          width="100%"
        />
        <Input placeholder="Short Introduce" type="text" width="100%" />
      </div>
    </div>
  );
}

export default Profile;
