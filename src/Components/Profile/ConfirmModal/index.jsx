import React from 'react';

import PropTypes from 'prop-types';

import Button from 'Components/Form/Button';
import { Modal } from 'reactstrap';

const defaultProps = {
  handleEvent: null,
};
const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  goal: PropTypes.string.isRequired,
  handleEvent: PropTypes.func,
};

function ConfirmModal(props) {
  const { isOpen, toggle, goal, handleEvent } = props;

  return (
    <Modal
      className="confirmModal"
      isOpen={isOpen}
      toggle={toggle}
      centered
      size="sm"
    >
      <div className="confirmModal__header">
        <p>
          Are you sure you want to&nbsp;
          {goal}
          &#63;
        </p>
      </div>
      <div className="confirmModal__body">
        <div className="confirmModal__body-btn">
          <Button size="small" width="80px" white onClick={() => handleEvent()}>
            Yes
          </Button>
        </div>
        <div className="confirmModal__body-btn">
          <Button size="small" width="80px" onClick={() => toggle()}>
            No
          </Button>
        </div>
      </div>
    </Modal>
  );
}

ConfirmModal.defaultProps = defaultProps;
ConfirmModal.propTypes = propTypes;

export default ConfirmModal;
