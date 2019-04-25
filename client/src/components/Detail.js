import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import AuditList from "./AuditList/AuditList";
import LoadingSpan from "./LoadingSpan/LoadingSpan";
import Header from "./Header/Header";
import ScaleBar from "./ScaleBar/ScaleBar";
import axios from "axios";
import { getTimeStamp } from "../utils/util";

class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hpData: "",
      srpData: "",
      ldpData: "",
      type: ""
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    let params = new URLSearchParams(window.location.search);
    let type = this.props.match.url.replace("/", "");
    this.setState({ type: type });
    let timestamp = params.get("timestamp") ? params.get("timestamp") : "";
    axios
      .get(`http://localhost:5001/reports?type=${type}&timestamp=${timestamp}`)
      .then(res => {
        this.setState({ hpData: res.data.hp });
        this.setState({ srpData: res.data.srp });
        this.setState({ ldpData: res.data.ldp });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentWillReceiveProps(nextProps) {
    window.location.reload();
  }

  handleClick() {
    console.log("ReRun start =>");
    window.history.pushState(null, null, this.props.match.url.replace("/", ""));
    this.setState({
      hpData: "",
      srpData: "",
      ldpData: ""
    });

    this._getRDCData();
  }

  render() {
    const { hpData, srpData, ldpData } = this.state;
    return (
      <div className="App">
        <Header
          clickHandler={this.handleClick}
          type={this.props.match.url.replace("/", "")}
          rerun={true}
        />
        <ScaleBar />
        <div>
          <Grid container spacing={24}>
            {hpData ? (
              <AuditList history={true} data={hpData} title={"Home Page"} />
            ) : (
              <LoadingSpan />
            )}
            {srpData ? (
              <AuditList history={true} data={srpData} title={"SRP Page"} />
            ) : (
              <LoadingSpan />
            )}
            {ldpData ? (
              <AuditList history={true} data={ldpData} title={"QV Page"} />
            ) : (
              <LoadingSpan />
            )}
          </Grid>
        </div>
      </div>
    );
  }

  _getRDCData() {
    var self = this;
    const { type } = this.state;
    console.log("start fetching =>");
    let timestamp = getTimeStamp();

    axios
      .get(
        `http://localhost:5001/rdc?type=${type}&page=ldp&timestamp=${timestamp}`
      )
      .then(ldp => {
        console.log("ldp =>");
        console.log(ldp);
        self.setState({ ldpData: ldp.data.result });
      })
      .then(result => {
        axios
          .get(
            `http://localhost:5001/rdc?type=${type}&page=srp&timestamp=${timestamp}`
          )
          .then(srp => {
            console.log("srp =>");
            console.log(srp);
            self.setState({ srpData: srp.data.result });
          })
          .then(result => {
            axios
              .get(
                `http://localhost:5001/rdc?type=${type}&page=hp&timestamp=${timestamp}`
              )
              .then(hp => {
                console.log("hp =>");
                console.log(hp);
                self.setState({ hpData: hp.data.result });
              })
              .catch(error => {
                console.log(error);
              });
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  }
}

export default Detail;
