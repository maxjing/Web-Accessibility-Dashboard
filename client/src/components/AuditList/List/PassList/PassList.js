import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
});

class PassList extends React.Component {
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
    const { passes } = this.props;
    return (
      <div className={classes.root} subheader={<li />}>
        {passes.map((pass, index) => (
          <ExpansionPanel key={`section-${passes.id}-${index}`}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>{pass.title}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>{pass.description.split(".")[0]}</Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(PassList);
