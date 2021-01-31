import React from 'react';
import PropTypes from 'prop-types';
import { basicType } from 'PropTypes/post';

import MixPalette from 'Components/Mix/MixPalette';
import MixTable from 'Components/Mix/MixTable';
import Post from 'Components/Post/Post';

import { makeStyles } from '@material-ui/core/styles';

const defaultProps = {
  chosenOriginPost: null,
  chosenSubPost: null,
};
const propTypes = {
  chosenOriginPost: basicType,
  chosenSubPost: basicType,
  subPostFunc: PropTypes.func.isRequired,
};

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    transform: 'translate(-50%, -50%)',
    left: '50%',
    top: '30%',
    zIndex: 1005,
    backgroundColor: '#fff9e7',
    borderRadius: '10px',
  },
});

function MixHandler(props) {
  const { chosenSubPost, chosenOriginPost, subPostFunc } = props;
  const classes = useStyles();
  return chosenSubPost ? (
    <MixPalette originPost={chosenOriginPost} subPost={chosenSubPost} />
  ) : (
    <>
      <div className={classes.root}>
        <Post post={chosenOriginPost} />
      </div>
      <MixTable originPostId={chosenOriginPost.id} postSubPost={subPostFunc} />
    </>
  );
}

MixHandler.defaultProps = defaultProps;
MixHandler.propTypes = propTypes;

export default MixHandler;
