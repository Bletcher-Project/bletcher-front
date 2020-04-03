import React, { Component } from "react";
import { connect } from "react-redux";

import * as PostAction from "../../Redux/Actions/PostAction";

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
      content: ""
    };
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
          <div className="postUpload__creator">
            <input
              accept="image/*"
              type="file"
              name="img"
              id="art-upload"
              style={{ display: "none" }}
              onChange={this.handlePictureImg}
            />
            <div className="postUpload__creator-picture">
              <label htmlFor="art-upload">
                <img
                  alt="post"
                  src={
                    this.state.pictureImgUrl
                      ? this.state.pictureImgUrl
                      : defaultUpload
                  }
                  width="100%"
                />
              </label>
            </div>
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
