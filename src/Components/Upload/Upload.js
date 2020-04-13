import React, { Component } from "react";
import { connect } from "react-redux";

import * as PostAction from "../../Redux/Actions/PostAction";

import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import backIcon from "../../Assets/icons/signup_back.svg";
import defaultUpload from "../../Assets/icons/creator-upload.png";

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
      content: "",
      crop: {
        aspect: 16 / 9, //default
        croppedImageUrl: null
      }
    };
    this.handleCropImage = this.handleCropImage.bind(this);
  }

  render() {
    const { content } = this.state;
    return (
      <div className="postUpload">
        <img
          alt="back"
          src={backIcon}
          width="35px"
          style={{ cursor: "pointer" }}
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
              <div>
                {/* //TODO 비율 선택 함수 여러개 만들지 말고 한 개로 함축하기 */}
                <div className="postUpload__creator-ratioSelect">
                  <Button onClick={this.handleCropRatio1to1}>1:1</Button>
                  <Button onClick={this.handleCropRatio4to3}>4:3</Button>
                  <Button onClick={this.handleCropRatio16to9}>16:9</Button>
                  <Button onClick={this.handleCropRatioFree}>Free</Button>
                </div>
                <div className="postUpload__creator-previewPic">
                  <Button onClick={this.handleCropImage}>Crop Image</Button>
                  <Cropper
                    alt="original"
                    ref={cropper => {
                      this.cropper = cropper;
                    }}
                    src={
                      this.state.pictureImgUrl
                        ? this.state.pictureImgUrl
                        : defaultUpload
                    }
                    style={{ width: "100%", maxHeight: "300px" }}
                    // Cropper.js options
                    aspectRatio={this.state.crop.aspect}
                  />
                  <img
                    alt="cropped"
                    style={{ width: "100%", height: "auto" }}
                    src={this.state.crop.croppedImageUrl}
                  />
                </div>
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

  /*
  Crop Image functions
*/
  handleCropImage() {
    if (typeof this.cropper.getCroppedCanvas() === "undefined") {
      return;
    }
    const croppedResultUrl = this.cropper.getCroppedCanvas().toDataURL();
    this.setState({
      crop: Object.assign({}, this.state.crop, {
        croppedImageUrl: croppedResultUrl
      })
    });
  }

  handleCropRatio1to1 = v => {
    this.setState({
      crop: Object.assign({}, this.state.crop, { aspect: 1 / 1 })
    });
  };
  handleCropRatio4to3 = v => {
    this.setState({
      crop: Object.assign({}, this.state.crop, { aspect: 4 / 3 })
    });
  };
  handleCropRatio16to9 = v => {
    this.setState({
      crop: Object.assign({}, this.state.crop, { aspect: 16 / 9 })
    });
  };
  handleCropRatioFree = v => {
    this.setState({
      crop: Object.assign({}, this.state.crop, { aspect: null })
    });
  };

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
      this.cropper
        .getCroppedCanvas({ imageSmoothingQuality: "high" })
        .toBlob(async croppedImg => {
          const params = new FormData();
          params.append("img", croppedImg);
          params.append("content", this.state.content);
          params.append("UserId", this.props.userId);
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
