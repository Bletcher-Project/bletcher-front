import React, { useState } from 'react';

import PropTypes from 'prop-types';

import { Modal } from 'reactstrap';
import SignUpContainer from 'Components/Sign/SignUpContainer';

function SignInModal(props) {
  const [modal, setModal] = useState(true);
  const defaultToggle = () => setModal(!modal);
  const { isOpen, toggle } = props;
  return (
    <Modal
      className="signInModal"
      isOpen={isOpen !== null ? isOpen : modal}
      toggle={toggle || defaultToggle}
      centered
    >
      <div className="signInModal__header">Please log in and use it.</div>
      <SignUpContainer />
    </Modal>
  );
}

SignInModal.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
};

SignInModal.defaultProps = {
  isOpen: null,
  toggle: null,
};

export default SignInModal;
