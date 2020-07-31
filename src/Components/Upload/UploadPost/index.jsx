import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as PostAction from 'Redux/post';

import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import backIcon from 'Assets/images/back.svg';

const defaultProps = {};
const propTypes = {};

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
    user: state.authReducer.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    uploadPost: (params, token) =>
      dispatch(PostAction.uploadPost(params, token)),
    uploadSketcherPost: (params, token) =>
      dispatch(PostAction.uploadSketcherPost(params, token)),
  };
};

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pictureImg: null,
      pictureImgUrl: null,
      croppedImgUrl: null,
      contentImg: null,
      contentImgUrl: null,
      styleImg: null,
      styleImgUrl: null,
      content: '',
    };
  }

  render() {
    const { content } = this.state;
    return (
      <div className="postUpload">
        <img
          className="backBtn"
          alt="backBtn"
          src={backIcon}
          onClick={this.props.handlePrevStep}
        />

        {parseInt(this.props.userType) === 1 ? (
          /* Upload Section for Creator */
          <div className="postUpload__creator">
            <input
              accept="image/*"
              type="file"
              name="img"
              id="art-upload"
              style={{ display: 'none' }}
              onChange={this.handlePictureImg}
            />
            <div className="postUpload__creator-uploadPic">
              <Button
                size="small"
                fullWidth
                disableRipple={true}
                disableFocusRipple={true}
              >
                <label htmlFor="art-upload">upload image</label>
              </Button>
            </div>
            {this.state.pictureImgUrl === null ? null : (
              <div className="postUpload__creator-previewPic">
                <Cropper
                  className="cropper"
                  alt="original"
                  src={this.state.pictureImgUrl}
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
        ) : (
          /* Upload Section for Sketcher */
          <div className="postUpload__sketcher">
            <input
              accept="image/*"
              type="file"
              name="content"
              id="content-upload"
              style={{ display: 'none' }}
              onChange={this.uploadContentImg}
            />
            <input
              accept="image/*"
              type="file"
              name="style"
              id="style-upload"
              style={{ display: 'none' }}
              onChange={this.uploadStyleImg}
            />
            <div className="postUpload__sketcher-uploadPic">
              <div>
                <Button>
                  <label htmlFor="content-upload">upload image</label>
                </Button>
                {this.state.contentImgUrl === null ? null : (
                  <img
                    alt="content"
                    width="100%"
                    src={this.state.contentImgUrl}
                  />
                )}
              </div>
              <div>
                <Button>
                  <label htmlFor="style-upload">select style image</label>
                </Button>
                {/* It is sample picture for later */}
                {this.state.styleImgUrl === null ? null : (
                  <img alt="style" width="100%" src={this.state.styleImgUrl} />
                )}
              </div>
            </div>

            <div className="postUpload__sketcher-content">
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
        )}

        <div className="postUpload__upload">
          <Button size="small" onClick={this.handlePostUpload}>
            Upload
          </Button>
        </div>
      </div>
    );
  }

  uploadContentImg = (e) => {
    this.setState(
      {
        contentImg:
          e.target.files[0] !== undefined
            ? e.target.files[0]
            : this.state.contentImg,
      },
      () => {
        this.setState({
          contentImgUrl: URL.createObjectURL(this.state.contentImg),
        });
      },
    );
  };

  uploadStyleImg = (e) => {
    this.setState(
      {
        styleImg:
          e.target.files[0] !== undefined
            ? e.target.files[0]
            : this.state.styleImg,
      },
      () => {
        this.setState({
          styleImgUrl: URL.createObjectURL(this.state.styleImg),
        });
      },
    );
  };

  handlePictureImg = (e) => {
    this.setState(
      {
        pictureImg:
          e.target.files[0] !== undefined
            ? e.target.files[0]
            : this.state.pictureImg,
      },
      () => {
        this.setState({
          pictureImgUrl: URL.createObjectURL(this.state.pictureImg),
        });
      },
    );
  };

  /*
  Post Upload functions
*/
  handleContent = (e) => {
    this.setState({ content: e.target.value });
  };

  handlePostUpload = () => {
    switch (parseInt(this.props.userType)) {
      case 1:
        if (this.state.pictureImgUrl) {
          const imgInfo = this.cropper.getCropBoxData();
          this.cropper
            .getCroppedCanvas({ imageSmoothingQuality: 'high' })
            .toBlob(async (croppedImg) => {
              const params = new FormData();
              params.append('img', croppedImg, this.state.pictureImg.name);
              params.append('content', this.state.content);
              params.append('UserId', this.props.userId);
              params.append('width', imgInfo.width);
              params.append('height', imgInfo.height);
              const postUpload = await this.props.uploadPost(
                params,
                this.props.token,
              );
              return postUpload
                ? window.location.reload()
                : alert('upload failed!');
            });
        } else {
          alert('Please upload your art first :)');
        }
        break;
      case 0:
        if (this.state.contentImgUrl && this.state.styleImgUrl) {
          const params = new FormData();
          params.append(
            'img',
            this.state.contentImg,
            this.state.contentImg.name,
          );
          params.append('img', this.state.styleImg, this.state.styleImg.name);
          params.append('content', this.state.content);
          params.append('UserId', this.props.userId);
          params.append('width', parseInt(200));
          params.append('height', parseInt(300));
          const postSketcherUpload = async () => {
            const upload = await this.props.uploadSketcherPost(
              params,
              this.props.token,
            );
            return upload ? window.location.reload() : alert('upload failed!');
          };
          postSketcherUpload();
        } else {
          alert('Please upload your art first :)');
        }
        break;

      default:
        alert('Wrong Access!');
    }
  };
}

Upload.defaultProps = defaultProps;
Upload.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
