import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import NoStyleButton from 'Components/Form/NoStyleButton';
import MixHandler from 'Components/Mix/MixHandler';

import mixImage from 'Assets/images/mixButton.png';

import { basicType } from 'PropTypes/post';

import { Modal } from 'reactstrap';
import queryString from 'query-string';

const defaultProps = {
  originPost: null,
};
const propTypes = {
  originPost: basicType,
};

function MixButton(props) {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [chosenSubPost, setChosenSubPost] = useState(null);
  const [chosenOriginPost, setChosenOriginPost] = useState(null);
  const mixState = useSelector((state) => state.postReducer.mixState);

  const { isMixing, mixId } = mixState;

  const toggle = () => {
    const { originPost } = props;
    if (isOpen) setChosenOriginPost(null);
    else setChosenOriginPost(originPost);
    setIsOpen(!isOpen);
  };

  const modalOnClose = () => {
    setChosenSubPost(null);
    setIsOpen(false);
  };

  const postSubPost = (subPost) => {
    setChosenSubPost(subPost);
  };

  useEffect(() => {
    function addLocationListener() {
      history.listen((location) => {
        if (location) {
          const query = queryString.parse(location.search);
          const originId = query.recompose;
          if (originId !== undefined) setChosenOriginPost(originId);
        }
      });
    }
    addLocationListener();
  }, [props, history]);

  return (
    <>
      <NoStyleButton onClick={toggle}>
        <img className="postButton mix" src={mixImage} alt="mix" />
      </NoStyleButton>
      {chosenOriginPost && (
        <Modal
          isOpen={chosenOriginPost && isOpen && !(isMixing || mixId)}
          toggle={toggle}
          onClosed={modalOnClose}
        >
          <MixHandler
            chosenSubPost={chosenSubPost}
            chosenOriginPost={chosenOriginPost}
            subPostFunc={postSubPost}
          />
        </Modal>
      )}
    </>
  );
}

MixButton.defaultProps = defaultProps;
MixButton.propTypes = propTypes;

export default MixButton;
