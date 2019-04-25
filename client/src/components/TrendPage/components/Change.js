import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  chartHeadingSelect: {
    color: "#000000",
    fontWeight: "200",
    letterSpacing: "2px",
    fontSize: "20px",
    backgroundColor: "transparent",
    border: "1px solid #000000",
    borderWidth: "0 0 1px 0",
    marginLeft: "10px",
    borderRadius: "0",
    padding: "2px 26px 2px 6px",
    lineHeight: "1.2",
    // appearance: "none",
    cursor: "pointer",
    "& option": {
      backgroundColor: "#ffffff",
      color: "#000000"
    },
    "&:focus": {
      borderWidth: "0 0 1px 0",
      borderColor: " rgb(255,170,0)",
      outline: "none"
    }
  }
});

//handle day and type change
class Change extends Component {
  constructor(props) {
    super(props);

    this.state = {
      days: "10",
      type: "prod"
    };
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleDaysChange = this.handleDaysChange.bind(this);
  }
  handleTypeChange = event => {
    this.setState({ type: event.target.value });
    this.props.clickHandler(event.target.value, this.state.days);
  };

  handleDaysChange = event => {
    this.setState({ days: event.target.value });
    this.props.clickHandler(this.state.type, event.target.value);
  };
  selects = () => {
    const { classes } = this.props;
    //type selection
    const select_options = typeOptions.map(function(option) {
      return (
        <option key={option[1]} value={option[1]}>
          {option[0]}
        </option>
      );
    });
    //days selection
    const select_days = dayOptions.map(function(option) {
      return (
        <option key={option[1]} value={option[1]}>
          {option[0]}
        </option>
      );
    });
    return (
      <div>
        <div style={{ position: "absolute", left: "5%", marginTop: "10px" }}>
          <select
            className={classes.chartHeadingSelect}
            value={this.state.days}
            onChange={this.handleDaysChange}
          >
            {select_days}
          </select>
        </div>
        <div style={{ position: "absolute", right: "5%", marginTop: "10px" }}>
          <select
            className={classes.chartHeadingSelect}
            value={this.state.type}
            onChange={this.handleTypeChange}
          >
            {select_options}
          </select>
        </div>
      </div>
    );
  };
  render() {
    return <span>{this.selects()}</span>;
  }
}
const typeOptions = [
  ["Production", "prod"],
  ["Beta", "beta"],
  ["Beta.x", "betax"]
];

const dayOptions = [
  ["10 Days", "10"],
  ["15 Days", "15"],
  ["30 Days", "30"],
  ["60 Days", "60"]
];

export default withStyles(styles)(Change);
