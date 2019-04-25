import React, { Component } from "react";
import Header from "../Header/Header";
import TrendGraph from "./components/TrendGraph";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import Change from "./components/Change";
import LinearProgress from "@material-ui/core/LinearProgress";

const styles = theme => ({
  linearColorPrimary: {
    backgroundColor: "#b2dfdb"
  },
  linearBarColorPrimary: {
    backgroundColor: "#00695c"
  }
});
class Trend extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupData: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = (type, days) => {
    this.setState({ groupData: "" });
    axios
      .get(`http://localhost:5001/trend?type=${type}&days=${days}`)
      .then(res => {
        this.setState({ groupData: res.data });
      })
      .catch(error => {
        console.log(error);
      });
  };
  handleDaysChange = type => {
    this.setState({ groupData: "" });
    axios
      .get(`http://localhost:5001/trend?type=${type}&days=10`)
      .then(res => {
        this.setState({ groupData: res.data });
      })
      .catch(error => {
        console.log(error);
      });
  };
  componentDidMount() {
    axios
      .get(`http://localhost:5001/trend?type=prod&days=10`)
      .then(res => {
        this.setState({ groupData: res.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { groupData } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <Header rerun={false} />

        <Change clickHandler={this.handleChange} />

        {groupData ? (
          <div style={{ margin: "10px 30px 30px 30px" }}>
            <TrendGraph groupData={groupData} />
          </div>
        ) : (
          <LinearProgress
            classes={{
              colorPrimary: classes.linearColorPrimary,
              barColorPrimary: classes.linearBarColorPrimary
            }}
            style={{ marginTop: "5px" }}
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Trend);
