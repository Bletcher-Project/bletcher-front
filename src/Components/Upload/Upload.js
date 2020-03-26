import React from "react";

import { ServerEndPoint } from "../../Configs/Server";

import { Thumbnail } from "../../Components";

import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import backIcon from "../../Assets/icons/signup_back.svg";

export default function Upload(props) {
  return (
    <div>
      <img
        alt="back"
        src={backIcon}
        width="35px"
        style={{ cursor: "pointer" }}
        onClick={props.handlePrevStep}
      />
      <Thumbnail
        size="50"
        src={
          props.userProfileImg !== null
            ? `${ServerEndPoint}image/profile/${props.userProfileImg}`
            : null
        }
        type={props.userType}
      />
      <div className="postUpload__content">
        <TextField
          id="outlined-multiline"
          placeholder="Type your art..."
          multiline
          rows="8"
          rowsMax="10"
          variant="outlined"
        />
      </div>
      <CardActions>
        <Button size="small">Upload</Button>
      </CardActions>
    </div>
  );
}
