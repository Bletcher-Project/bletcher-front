import React from 'react';

import logoImg from 'Assets/logo/logo.svg';

function Logo(isActive) {
  return (
    <>
      <img src={logoImg} width="33px" alt="logo" />
      {isActive === 'main' || <span>Bletcher</span>}
    </>
  );
}

export default Logo;
