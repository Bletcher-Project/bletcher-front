import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as PostAction from 'Redux/post';

import PropTypes from 'prop-types';

import RoundLoader from 'Components/Loader/Round';
import NoStyleButton from 'Components/Form/NoStyleButton';
import ImageCropper from 'Components/Upload/ImageCropper';

import plusButton from 'Assets/images/plus.svg';

import { Modal } from 'reactstrap';
import TextField from '@material-ui/core/TextField';

const defaultProps = {
  user: null,
  token: null,
};
const propTypes = {
  isUploading: PropTypes.bool.isRequired,
  uploadPost: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
    nickname: PropTypes.string,
  }),
  token: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
    user: state.authReducer.user,
    isUploading: state.postReducer.uploadState.isUploading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    uploadPost: (image, params, token) =>
      dispatch(PostAction.uploadPost(image, params, token)),
  };
};

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageFormData: null,
      content: '',
      modal: false,
    };
  }

  handlePictureWithCropper = (imageFormData) => {
    this.setState({
      imageFormData,
    });
  };

  handleContent = (e) => {
    this.setState({ content: e.target.value });
  };

  handlePostUpload = async () => {
    const { user, uploadPost, token } = this.props;
    const { imageFormData, content } = this.state;
    if (user) {
      const params = new URLSearchParams();

      params.append('title', content);
      params.append('user_id', user.id);
      params.append('description', content);
      params.append('category_id', 5);
      params.append('is_public', true);
      const postUpload = await uploadPost(imageFormData, params, token);
      if (postUpload) window.location.reload();
    } else {
      // TO DO :: implement login modal !
    }
  };

  toggle = () => {
    const { modal } = this.state;
    this.setState({ modal: !modal });
  };

  render() {
    const { content, modal } = this.state;
    const { isUploading } = this.props;
    return (
      <>
        {isUploading && <RoundLoader />}
        <>
          <button
            type="button"
            onClick={this.toggle}
            className="uploadModalButton"
          >
            <img src={plusButton} alt="+" />
          </button>
          <Modal isOpen={modal} toggle={this.toggle}>
            <div className="uploadPost">
              <div className="uploadPost__header">
                <div className="uploadPost__header__title">
                  Upload Your Masterpiece!
                </div>
              </div>
              <div className="uploadPost__content">
                <div className="uploadPost__content__border">
                  <ImageCropper imgHandler={this.handlePictureWithCropper} />
                </div>
                <div className="uploadPost__content__input">
                  <TextField
                    id="outlined-multiline"
                    placeholder="Art's title"
                    value={content}
                    multiline
                    rows="3"
                    rowsMax="10"
                    variant="outlined"
                    onChange={this.handleContent}
                  />
                </div>
              </div>
              <div className="uploadPost__footer">
                <NoStyleButton onClick={this.handlePostUpload}>
                  <div className="uploadPost__footer__upload">
                    <div className="uploadPost__footer__upload__text">
                      upload!
                    </div>
                  </div>
                </NoStyleButton>
              </div>
            </div>
          </Modal>
        </>
      </>
    );
  }
}

Upload.defaultProps = defaultProps;
Upload.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
