import React, { Component } from "react";

import { ServerEndPoint } from "../../Configs/Server";

import { Thumbnail } from "../../Components";

import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import backIcon from "../../Assets/icons/signup_back.svg";

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pictureImg: null,
      pictureImgUrl: null
    };
  }

  render() {
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
                  src={
                    this.state.pictureImgUrl
                      ? this.state.pictureImgUrl
                      : "https://cdn1.iconfinder.com/data/icons/hawcons/32/699085-icon-93-inbox-upload-512.png"
                  }
                  width="100%"
                />
              </label>
            </div>
            <TextField
              id="outlined-multiline"
              placeholder="Type your art..."
              multiline
              rows="3"
              rowsMax="10"
              variant="outlined"
              fullWidth
            />
          </div>
        ) : (
          <div className="postUpload__sketcher">It's for Sketcher</div>
        )}

        <div className="postUpload__upload">
          <Button size="small">Upload</Button>
        </div>
      </div>
    );
  }

  handlePictureImg = e => {
    this.setState({ pictureImg: e.target.files[0] }, () => {
      return this.state.pictureImg
        ? this.setState({
            pictureImgUrl: URL.createObjectURL(this.state.pictureImg)
          })
        : null;
    });
  };
}

export default Upload;
