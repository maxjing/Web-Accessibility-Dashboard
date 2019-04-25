import React from "react";
import Grid from "@material-ui/core/Grid";
import ScoreBar from "../ScoreBar/ScoreBar";
import List from "./List/List";
import { _getAuditItems, _getHPAuditItems } from "../../utils/util";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";

class Audits extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      time: "",
      score: 0,
      fails: [],
      passes: []
    };
  }
  componentDidMount() {
    if (this.props.title === "Home Page") {
      let items = _getHPAuditItems(this.props.data);
      this.setState({
        url: items[0],
        time: items[1],
        score: items[2],
        fails: items[3],
        passes: items[4]
      });
    } else {
      let items = _getAuditItems(this.props.data);
      this.setState({
        url: items[0],
        time: items[1],
        score: items[2],
        fails: items[3],
        passes: items[4]
      });
    }
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { score, fails, passes, url, time } = this.state;
    return (
      <Grid item xs={4}>
        <Card>
          <CardHeader
            style={{ paddingBottom: "0px" }}
            title={this.props.title}
            subheader={time}
            action={
              <Grid container justify="space-between" spacing={40}>
                <Grid item xs={6}>
                  <ScoreBar score={score} />
                </Grid>
              </Grid>
            }
          />
          <CardContent style={{ paddingTop: "0px" }}>
            <Typography>
              <Tooltip title={url} interactive>
                <a
                  variant="contained"
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  EndPoint
                </a>
              </Tooltip>
            </Typography>
          </CardContent>
          {<List fails={fails} passes={passes} />}
        </Card>
      </Grid>
    );
  }
}

export default Audits;
