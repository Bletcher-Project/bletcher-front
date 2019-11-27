import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = {
  root: {
    display: "block",
    width: "16%",
    height: "65%",
    margin: "0 10px 0 10px",
    border: "3px solid",
    borderColor: "#8e24aa",
    borderRadius: "20px",
    padding: "20px 0 0 0",
    textTransform: "unset",
    zIndex: "modal",
    position: "fixed",
    "&:hover": {
      width: "16.6%",
      height: "65.6%",
      zIndex: "tooltip",
      position: "absolute"
      
    }
  },
  title: {
    fontSize: "2rem",
    margin: "20px 0 0 0"
  },
  desc: {
    fontSize: "1.1rem",
    color:  "#8e24aa",
  }
};

function TypeButton(props) {
  const { classes, Title, Description, logo } = props;
  return (
    <Button className={classes.root}>
      <img src={logo} width="130px" alt={logo}/>
      <p className={classes.title}>{Title}</p>
      <p className={classes.desc}>{Description}</p>
    </Button>
  );
}

TypeButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TypeButton);