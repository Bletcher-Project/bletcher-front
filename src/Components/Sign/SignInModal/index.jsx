import React, { useState } from 'react';

import { Modal } from 'reactstrap';
import SignUpContainer from 'Components/Sign/SignUpContainer';

function SignInModal() {
  const [modal, setModal] = useState(true);
  const toggle = () => setModal(!modal);

  return (
    <Modal className="signInModal" isOpen={modal} toggle={toggle} centered>
      <div className="signInModal__header">Please log in and use it.</div>
      <SignUpContainer />
    </Modal>
  );
}

export default SignInModal;
