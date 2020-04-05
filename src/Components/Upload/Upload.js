import React, { Component } from "react";
import { connect } from "react-redux";

import * as PostAction from "../../Redux/Actions/PostAction";

import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import backIcon from "../../Assets/icons/signup_back.svg";
import defaultUpload from "../../Assets/icons/creator-upload.png";

const mapDispatchToProps = dispatch => {
  return {
    uploadPost: params => dispatch(PostAction.uploadPost(params))
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
        unit: "%",
        width: 60,
        aspect: 16 / 9
      }
    };
  }

  render() {
    const { content, crop } = this.state;
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
                //TODO 비율 선택 함수 여러개 만들지 말고 한 개로 함축하기
                <div className="postUpload__creator-ratioSelect">
                  <Button onClick={this.handleCropRatio1to1}>1:1</Button>
                  <Button onClick={this.handleCropRatio4to3}>4:3</Button>
                  <Button onClick={this.handleCropRatio16to9}>16:9</Button>
                  <Button onClick={this.handleCropRatioFree}>Free</Button>
                </div>
                <div className="postUpload__creator-previewPic">
                  <ReactCrop
                    alt="post"
                    src={
                      this.state.pictureImgUrl
                        ? this.state.pictureImgUrl
                        : defaultUpload
                    }
                    crop={crop}
                    ruleOfThirds
                    onChange={this.onCropChange}
                    width="100%"
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

  onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  };

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

  handleContent = e => {
    this.setState({ content: e.target.value });
  };

  handlePostUpload = async () => {
    if (this.state.pictureImg) {
      const params = new FormData();
      params.append("img", this.state.pictureImg);
      params.append("content", this.state.content);
      params.append("UserId", this.props.userId);
      const postUpload = await this.props.uploadPost(params);

      return postUpload ? window.location.reload() : alert("upload failed!");
    } else {
      alert("Please upload your art first :)");
    }
  };
}

export default connect(null, mapDispatchToProps)(Upload);
