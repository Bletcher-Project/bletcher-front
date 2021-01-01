import React from 'react';

import Thumbnail from 'Components/Thumbnail';
import RoundInput from 'Components/Form/RoundInput';

function Profile() {
  return (
    <div className="profile">
      <Thumbnail />
      <div>
        Bletcher users will be able to identify you with the information below.
      </div>
      <div>
        <RoundInput />
        <RoundInput />
      </div>
      <RoundInput />
      <RoundInput />
      <RoundInput />
    </div>
  );
}

export default Profile;
