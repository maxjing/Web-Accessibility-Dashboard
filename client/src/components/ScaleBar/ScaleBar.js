import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    width: "100%"
  },
  container: {
    width: "300px",
    float: "right",
    marginTop: "12px",
    "& span": {
      float: "left",
      marginLeft: "5px"
    }
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    color: "grey"
  },
  colorSpan: {
    width: "15px",
    height: "7px",
    borderRadius: "35%",
    marginTop: "7px"
  },
  passColor: {
    backgroundColor: "hsl(139, 70%, 30%)"
  },
  averageColor: {
    backgroundColor: "hsl(31, 100%, 45%)"
  },
  failColor: {
    backgroundColor: "hsl(1, 73%, 45%)"
  }
});

const ScaleBar = props => {
  const { classes } = props;
  return (
    <div className={classes.container}>
      <span style={{ marginRight: "10px" }}>
        <Typography>Score scale: </Typography>
      </span>
      <div className={classes.item}>
        <span className={classes.colorSpan + " " + classes.passColor} />
        <span>
          <Typography>90 - 100 </Typography>
        </span>
      </div>
      <div className={classes.item}>
        <span className={classes.colorSpan + " " + classes.averageColor} />
        <span>
          <Typography>50 - 89 </Typography>
        </span>
      </div>
      <div className={classes.item}>
        <span className={classes.colorSpan + " " + classes.failColor} />
        <span>
          <Typography>0 - 49 </Typography>
        </span>
      </div>
    </div>
  );
};
export default withStyles(styles)(ScaleBar);
