import React from "react";
import PropTypes from "prop-types";
import { withStyles, transitions } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = {
  root: {
    display: "block",
    width: "280px",
    height: "340px",
    margin: "0 10px 0 10px",
    padding: "20px 0 0 0",
    border: "3px solid",
    borderColor: "#8e24aa",
    borderRadius: "20px",
    textTransform: "unset",
    transition: "all 0.2s",
    "&:hover": {
      transform: "scale(1.015,1.015)"
    },
    "&:focus": {
      outline: "none"
    }
  },
  title: {
    fontSize: "2rem",
    margin: "20px 0 0 0"
  },
  desc: {
    fontSize: "1.1rem",
    color: "#8e24aa",
    padding: "0 10px 0 10px"
  }
};

function TypeButton(props) {
  const { classes, title, content, logo, onClick, value } = props;
  return (
    <Button className={classes.root} onClick={onClick} value={value}>
      <img src={logo} width="100px" alt={logo} />
      <p className={classes.title}>{title}</p>
      <p className={classes.desc}>{content}</p>
    </Button>
  );
}

TypeButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TypeButton);
