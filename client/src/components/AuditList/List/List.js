import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FailList from "./FailList/FailList";
import PassList from "./PassList/PassList";

const styles = theme => ({
  root: {
    width: "100%"
  },

  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    color: "grey"
  }
});

class ReportList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };
  render() {
    const { classes } = this.props;
    const { fails } = this.props;
    const { passes } = this.props;

    return (
      <div className={classes.root} subheader={<li />}>
        <ExpansionPanel defaultExpanded={true}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            style={{ backgroundColor: "#f1f3f4" }}
          >
            <Typography className={classes.heading}>Failed Elements</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{ padding: "0px" }}>
            <FailList fails={fails} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            style={{ backgroundColor: "#f1f3f4" }}
          >
            <Typography className={classes.heading}>Passed Elements</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{ padding: "0px" }}>
            <PassList passes={passes} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

export default withStyles(styles)(ReportList);
