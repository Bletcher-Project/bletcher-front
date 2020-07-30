import React from 'react';

import logoImg from 'Assets/logo/logo.svg';

function Logo() {
  return (
    <div className="logo">
      <img src={logoImg} width="33px" alt="logo" />
      <span>Bletcher</span>
    </div>
  );
}

export default Logo;
