import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { postType } from 'PropTypes';

import MixPalette from 'Components/Mix/MixPalette';
import MixTable from 'Components/Mix/MixTable';

import { Modal } from 'reactstrap';

const defaultProps = {
  chosenOriginPost: null,
  chosenSubPost: null,
};
const propTypes = {
  chosenOriginPost: postType.basicType,
  chosenSubPost: postType.basicType,
  subPostFunc: PropTypes.func.isRequired,
};

function MixHandler(props) {
  const [isOpen, setIsOpen] = useState(false);

  const { chosenSubPost, chosenOriginPost, subPostFunc } = props;
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      {chosenSubPost ? (
        <MixPalette originPost={chosenOriginPost} subPost={chosenSubPost} />
      ) : (
        <MixTable
          originPostId={chosenOriginPost && chosenOriginPost.id}
          postSubPost={subPostFunc}
        />
      )}
    </Modal>
  );
}

MixHandler.defaultProps = defaultProps;
MixHandler.propTypes = propTypes;

export default MixHandler;
