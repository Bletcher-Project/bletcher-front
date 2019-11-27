import React from "react";
import PropTypes from "prop-types";
import { withStyles, transitions } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = {
  root: {
    display: "block",
    width: "16%",
    height: "65%",
    margin: "0 10px 0 10px",
    padding: "20px 0 0 0",
    border: "3px solid",
    borderColor: "#8e24aa",
    borderRadius: "20px",
    textTransform: "unset",
    transition: "all 0.2s",
    "&:hover": {
      transform: "scale(1.1,1.1)"
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
}

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