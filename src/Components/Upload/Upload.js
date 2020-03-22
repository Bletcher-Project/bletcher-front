import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Zoom from "@material-ui/core/Zoom";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import uploadButton from "../../Assets/images/upload-pencil.svg";

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 450,
    minHeight: 300,
    "& :focus": {
      outline: "none"
    }
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  field: {
    width: "100%"
  },
  modal: {
    "& .MuiPaper-root:focus": {
      outline: "none"
    },
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  center: {
    justifyContent: "center"
  }
}));

export default function Upload(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={props.style}>
      <img
        onClick={handleOpen}
        width="50px"
        src={uploadButton}
        alt="pencil-post"
        style={{ cursor: "pointer" }}
      />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Zoom in={open} timeout={350}>
          <Card className={classes.root}>
            <CardHeader
              avatar={<Avatar />}
              title={props.user ? props.user : "Bletcher"}
            />
            <CardContent>
              <TextField
                className={classes.field}
                id="outlined-multiline"
                placeholder="Type your art..."
                multiline
                rows="8"
                rowsMax="10"
                variant="outlined"
              />
            </CardContent>
            <CardActions className={classes.center}>
              <Button size="small">Upload</Button>
            </CardActions>
          </Card>
        </Zoom>
      </Modal>
    </div>
  );
}
