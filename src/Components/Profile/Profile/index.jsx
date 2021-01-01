import React from 'react';

import RoundInput from 'Components/Form/RoundInput';

function Profile() {
  return (
    <div className="profile">
      <div>image area</div>
      <div>
        Bletcher users will be able to identify you with the information below.
      </div>
      <div>
        <RoundInput />
      </div>
    </div>
  );
}

export default Profile;
