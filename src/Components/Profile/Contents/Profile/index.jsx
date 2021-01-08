import React from 'react';

import Thumbnail from 'Components/Thumbnail';
import Input from 'Components/Form/Input';

function Profile() {
  const handleChange = () => {
    // TODO: 다음 PR에서 구현 예정
  };

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

export default Profile;
