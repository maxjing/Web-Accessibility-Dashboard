import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import AuditList from "./AuditList/AuditList";
import LoadingSpan from "./LoadingSpan/LoadingSpan";
import Header from "./Header/Header";
import ScaleBar from "./ScaleBar/ScaleBar";
import CustomizeTest from "./CustomizeTest/CustomizeTest";
import axios from "axios";

class OnDemand extends Component {
  constructor(props) {
    super(props);

    this.state = {
      testResult: "",
      isClicked: false
    };

    this.handleOnDemandTest = this.handleOnDemandTest.bind(this);
  }

  handleOnDemandTest(url, cookies) {
    this.setState({ testResult: "", isClicked: true });
    cookies === ""
      ? axios
          .get(`http://localhost:5001/ondemand?url=${url}`)
          .then(res => {
            console.log(res);
            this.setState({ testResult: res.data.result });
          })
          .catch(error => {
            console.log(error);
          })
      : axios
          .get(`http://localhost:5001/ondemand?url=${url}&cookie=${cookies}`)
          .then(res => {
            console.log(res);
            this.setState({ testResult: res.data.result });
          })
          .catch(error => {
            console.log(error);
          });
  }

  render() {
    const { testResult, isClicked } = this.state;
    return (
      <div className="App">
        <Header clickHandler={this.handleClick} />
        <ScaleBar />
        <div>
          <Grid container spacing={24}>
            <CustomizeTest clickHandler={this.handleOnDemandTest} />
            {testResult ? (
              <AuditList
                history={false}
                data={testResult}
                title={testResult.requestedUrl.split("//")[1].split("/")[0]}
              />
            ) : isClicked ? (
              <LoadingSpan />
            ) : null}
          </Grid>
        </div>
      </div>
    );
  }
}

export default OnDemand;
