import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startRecompose } from 'Redux/post';

import NoStyleButton from 'Components/Form/NoStyleButton';
import MixHandler from 'Components/Mix/MixHandler';
import SignInModal from 'Components/Sign/SignInModal';

import mixImage from 'Assets/images/mixButton.png';

import { basicType } from 'PropTypes/post';

import { Modal } from 'reactstrap';

const defaultProps = {
  originPost: null,
};
const propTypes = {
  originPost: basicType,
};

function MixButton(props) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [chosenSubPost, setChosenSubPost] = useState(null);
  const [chosenOriginPost, setChosenOriginPost] = useState(null);
  const [openSignIn, setOpenSignin] = useState(false);
  const mixState = useSelector((state) => state.postReducer.mixState);
  const isLogin = useSelector((state) => state.authReducer.isLogin);
  const { isMixing, mixId, recomposeFlag, originId } = mixState;
  const useMountEffect = (func) => useEffect(func);

  const toggle = () => {
    if (isLogin) {
      const { originPost } = props;
      if (isOpen) setChosenOriginPost(null);
      else setChosenOriginPost(originPost);
      setIsOpen(!isOpen);
    } else {
      setOpenSignin(true);
    }
  };

  const modalOnClose = () => {
    setChosenSubPost(null);
    setIsOpen(false);
  };

  const postSubPost = (subPost) => {
    setChosenSubPost(subPost);
  };

  const recompose = async () => {
    const { originPost } = props;
    if (originPost) {
      const post = originPost;
      setChosenOriginPost(post);
      setIsOpen(true);
      dispatch(startRecompose());
    }
  };

  useMountEffect(() => {
    const { originPost } = props;
    if (recomposeFlag && originId && originId === originPost.id) recompose();
    if (isLogin) setOpenSignin(false);
  });

  return (
    <>
      <NoStyleButton onClick={toggle}>
        <img className="postButton mix" src={mixImage} alt="mix" />
      </NoStyleButton>
      <SignInModal
        isOpen={openSignIn}
        toggle={() => setOpenSignin(!openSignIn)}
      />
      {isLogin && chosenOriginPost && (
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
