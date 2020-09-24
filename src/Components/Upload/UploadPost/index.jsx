import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as PostAction from 'Redux/post';

import PropTypes from 'prop-types';

import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import plusButton from 'Assets/images/plus.svg';

const defaultProps = {
  user: null,
  token: null,
};
const propTypes = {
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
      pictureImg: null,
      pictureImgUrl: null,
      content: '',
      modal: false,
    };
  }

  handlePictureImg = async (e) => {
    if (e.target.files[0] !== undefined) {
      await new Promise((accept) =>
        this.setState({ pictureImg: e.target.files[0] }, accept),
      );
      const { pictureImg } = this.state;
      this.setState({
        pictureImgUrl: URL.createObjectURL(pictureImg),
      });
    }
  };

  handleContent = (e) => {
    this.setState({ content: e.target.value });
  };

  handlePostUpload = async () => {
    const { user, uploadPost, token } = this.props;
    const { pictureImgUrl, pictureImg, content } = this.state;
    if (user) {
      if (pictureImgUrl) {
        this.cropper.getCroppedCanvas({ imageSmoothingQuality: 'high' }).toBlob(
          async (croppedImg) => {
            const image = new FormData();
            const params = new URLSearchParams();
            image.append('img', croppedImg, pictureImg.name);
            params.append('title', content);
            params.append('user_id', user.id);
            params.append('description', content);
            params.append('category_id', 5);
            params.append('is_public', true);
            const postUpload = await uploadPost(image, params, token);
            if (postUpload) window.location.reload();
            // TO DO :: notify failed to upload image
          },
          undefined,
          1,
        );
      } else {
        // TO DO :: notify uploading image !
      }
    } else {
      // TO DO :: implement login modal !
    }
  };

  toggle = () => {
    const { modal } = this.state;
    this.setState({ modal: !modal });
  };

  render() {
    const { content, modal, pictureImgUrl } = this.state;
    return (
      <>
        <button
          type="button"
          onClick={this.toggle}
          className="uploadModalButton"
        >
          <img src={plusButton} alt="+" />
        </button>
        <Modal isOpen={modal} toggle={this.toggle} className="className">
          <ModalHeader toggle={this.toggle}>
            Upload Your Masterpiece!
          </ModalHeader>
          <ModalBody>
            <div className="postUpload">
              <div className="postUpload__creator">
                <div className="postUpload__creator-uploadPic">
                  <Button
                    size="small"
                    fullWidth
                    disableRipple
                    disableFocusRipple
                  >
                    <label htmlFor="art-upload">
                      upload image
                      <input
                        accept="image/*"
                        type="file"
                        name="img"
                        id="art-upload"
                        style={{ display: 'none' }}
                        onChange={this.handlePictureImg}
                      />
                    </label>
                  </Button>
                </div>
                {pictureImgUrl === null ? null : (
                  <div className="postUpload__creator-previewPic">
                    <Cropper
                      className="cropper"
                      alt="original"
                      src={pictureImgUrl}
                      ref={(cropper) => {
                        this.cropper = cropper;
                      }}
                      // Cropper.js options
                      center
                    />
                  </div>
                )}
                <div className="postUpload__creator-content">
                  <TextField
                    id="outlined-multiline"
                    placeholder="Type your art..."
                    value={content}
                    multiline
                    rows="3"
                    rowsMax="10"
                    variant="outlined"
                    fullWidth
                    onChange={this.handleContent}
                  />
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handlePostUpload}>
              Upload
            </Button>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

Upload.defaultProps = defaultProps;
Upload.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
