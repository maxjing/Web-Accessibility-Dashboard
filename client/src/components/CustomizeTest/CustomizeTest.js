import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  button: {
    float: "left",
    backgroundColor: "rgb(245, 0, 87)",
    color: "white",
    padding: "10px 20px",
    marginTop: "20px"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100%"
  }
});

class CustmizeTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "", cookies: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleEnterKeyPress = this.handleChange.bind(this);
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleCookie = event => {
    this.setState({ cookies: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const testUrl = encodeURIComponent(this.state.value);
    const cookies = this.state.cookies;
    return (
      <Grid item xs={6}>
        <Grid container spacing={24}>
          <Grid item xs={10}>
            <TextField
              required
              id="outlined-required"
              label="Required"
              placeholder="https://www.realtor.com"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              value={this.state.value}
              onChange={this.handleChange}
              onKeyPress={e => {
                if (
                  e.key === "Enter" &&
                  this.state.value.indexOf("http") === 0
                ) {
                  this.props.clickHandler(testUrl, cookies);
                  //clear the value
                  this.setState({ value: "" });
                } else if (e.key === "Enter") {
                  alert("please give correct url start with 'http' or 'https'");
                }
              }}
            />
            <TextField
              id="outlined-required"
              label="Cookies(Optional)"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              placeholder="split_tcv=100"
              onChange={this.handleCookie}
              onKeyPress={e => {
                if (
                  e.key === "Enter" &&
                  this.state.value.indexOf("http") === 0
                ) {
                  this.props.clickHandler(testUrl, cookies);
                  //clear the value
                  this.setState({ value: "" });
                } else if (e.key === "Enter") {
                  alert("please give correct url start with 'http' or 'https'");
                }
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              type="submit"
              className={classes.button}
              onClick={
                this.state.value
                  ? () => this.props.clickHandler(testUrl, cookies)
                  : null
              }
            >
              Run
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(CustmizeTest);
