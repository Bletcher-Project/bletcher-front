import React, { Component } from "react";
import { connect } from "react-redux";

import * as PostAction from "../../Redux/Actions/PostAction";

import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import backIcon from "../../Assets/icons/signup_back.svg";

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return {
    token: state.authReducer.token,
    user: state.authReducer.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    uploadPost: (params, token) =>
      dispatch(PostAction.uploadPost(params, token))
  };
};

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pictureImg: null,
      pictureImgUrl: null,
      croppedImgUrl: null,
      content: ""
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
              style={{ display: "none" }}
              onChange={this.handlePictureImg}
            />
            <div className="postUpload__creator-uploadPic">
              <Button
                size="small"
                fullWidth
                disableRipple={true}
                disableFocusRipple={true}
              >
                <label htmlFor="art-upload">select image</label>
              </Button>
            </div>
            {this.state.pictureImgUrl === null ? null : (
              <div className="postUpload__creator-previewPic">
                <Cropper
                  className="cropper"
                  alt="original"
                  src={this.state.pictureImgUrl}
                  ref={cropper => {
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
          <div className="postUpload__sketcher">It's for Sketcher</div>
        )}

        <div className="postUpload__upload">
          <Button size="small" onClick={this.handlePostUpload}>
            Upload
          </Button>
        </div>
      </div>
    );
  }

  handlePictureImg = e => {
    this.setState(
      {
        pictureImg:
          e.target.files[0] !== undefined
            ? e.target.files[0]
            : this.state.pictureImg
      },
      () => {
        this.setState({
          pictureImgUrl: URL.createObjectURL(this.state.pictureImg)
        });
      }
    );
  };

  /*
  Post Upload functions
*/
  handleContent = e => {
    this.setState({ content: e.target.value });
  };

  handlePostUpload = () => {
    if (this.state.pictureImg) {
      const imgInfo = this.cropper.getCropBoxData();
      this.cropper
        .getCroppedCanvas({ imageSmoothingQuality: "high" })
        .toBlob(async croppedImg => {
          const params = new FormData();
          params.append("img", croppedImg, this.state.pictureImg.name);
          params.append("content", this.state.content);
          params.append("UserId", this.props.userId);
          params.append("width", imgInfo.width);
          params.append("height", imgInfo.height);
          const postUpload = await this.props.uploadPost(
            params,
            this.props.token
          );
          return postUpload
            ? window.location.reload()
            : alert("upload failed!");
        });
    } else {
      alert("Please upload your art first :)");
    }
  };
}

Upload.defaultProps = defaultProps;
Upload.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
