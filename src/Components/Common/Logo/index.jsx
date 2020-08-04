import React from 'react';

import logoImg from 'Assets/logo/bletcher-logo.png';

function Logo() {
  return (
    <div className="logo">
      <img src={logoImg} width="33px" alt="logo" />
    </div>
  );
}

export default Logo;
