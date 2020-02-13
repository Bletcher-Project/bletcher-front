import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";

const useStyles = makeStyles({
  root: {
    maxWidth: 600,
    flexGrow: 1,
    "& .MuiMobileStepper-progress": { width: "100%" }
  }
});

export default function SignupStep(props) {
  const classes = useStyles();
  const theme = useTheme();
  const step = props.step;
  return (
    <div className={props.className}>
      <MobileStepper
        variant="progress"
        steps={4}
        position="static"
        activeStep={
          step === "typePage"
            ? 1
            : step === "infoPage"
            ? 2
            : step === "profilePage"
            ? 3
            : null
        }
        className={classes.root}
      />
    </div>
  );
}
