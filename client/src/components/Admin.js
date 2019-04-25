import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Header from "./Header/Header_admin";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import _ from "lodash";

const styles = theme => ({
  button: {
    float: "left",
    backgroundColor: "Green",
    padding: "15px 35px",
    marginTop: "20px"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100%"
  }
});

const textFieldLabel = [
  "Production_Homepage",
  "Production_SRP",
  "Production_QV",
  "Beta_Homepage",
  "Beta_SRP",
  "Beta_QV",
  "Beta.x_Homepage",
  "Beta.x_SRP",
  "Beta.x_QV"
];

const getConfigData = config => {
  let data = [];
  _.map(config.prod, obj => {
    data.push(obj);
  });
  _.map(config.beta, obj => {
    data.push(obj);
  });
  _.map(config.betax, obj => {
    data.push(obj);
  });
  return data;
};
class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSetClick = this.handleSetClick.bind(this);
  }

  componentDidMount() {
    let version = this.props.match.params.version ? "default" : "";
    axios
      .get(`http://localhost:5001/config?version=${version}`)
      .then(res => {
        this.setState({ config: res.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentWillReceiveProps(nextProps) {
    window.location.reload();
  }
  handleChange = e => {
    const { config } = this.state;
    let data = [];
    for (let i in config) {
      data.push(config[i]);
    }
    let id = parseInt(e.target.id);
    let type;
    let page;
    let item = e.target.name;
    if (id === 0 || id === 0 || id === 2) {
      type = "prod";
      page = id;
    } else if (id === 3 || id === 4 || id === 5) {
      type = "beta";
      page = id - 3;
    } else {
      type = "betax";
      page = id - 6;
    }

    if (page === 0) {
      page = "hp";
    } else if (page === 1) {
      page = "srp";
    } else {
      page = "ldp";
    }
    config[`${type}`][`${page}`][`${item}`] = e.target.value;
    this.setState({
      config: config
    });
  };
  handleSetClick = () => {
    var self = this;
    axios
      .post(`http://localhost:5001/config`, {
        data: self.state.config
      })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { config } = this.state;
    const ConfigTextField = getConfigData(config).map((item, index) => {
      return (
        <Grid container spacing={24} key={`config-${index}`}>
          <Grid item xs={10}>
            <TextField
              id={"" + index}
              name="url"
              label={textFieldLabel[index]}
              style={{ margin: 8 }}
              fullWidth
              defaultValue={item.url}
              margin="normal"
              variant="outlined"
              // value={item.url}
              onChange={this.handleChange}
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              id={"" + index}
              name="cookie"
              label="Cookies"
              defaultValue={item.cookie}
              style={{ margin: 8 }}
              onChange={this.handleChange}
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
        </Grid>
      );
    });

    return (
      <div className="App">
        <Header
          clickSetHandler={this.handleSetClick}
          clickDefaultHandler={this.handleDefaultClick}
        />
        <div style={{ marginTop: "30px", marginLeft: "20px" }}>
          {ConfigTextField}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Admin);
