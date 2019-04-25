import React from "react";
import Grid from "@material-ui/core/Grid";
import { Facebook } from "react-content-loader";

class LoadingSpan extends React.Component {
  render() {
    return (
      <Grid item xs={4}>
        <Facebook />
      </Grid>
    );
  }
}

export default LoadingSpan;
