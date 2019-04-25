import React from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { _getAuditScore, _getScoreColor } from "../../../../utils/util";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  listItem: {
    wordWrap: "break-word",
    "& span": {
      color: "hsl(174, 100%, 27%)",
      fontSize: "0.875rem"
    }
  },
  listDescription: {
    wordWrap: "break-word",
    "& span": {
      fontSize: "0.875rem"
    }
  },
  panelSummary: {
    padding: "0px 16px",
    minHeight: "0px",
    "& div": {
      padding: "0px"
    }
  }
});

class FailList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  listItemBackgroundColor = index => {
    let backgroundColor = index % 2 === 0 ? "" : "#f1f3f4";
    return backgroundColor;
  };

  itemHeader = (title, auditId, index) => {
    const { classes } = this.props;
    return (
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        className={classes.panelSummary}
        style={{ backgroundColor: this.listItemBackgroundColor(index) }}
      >
        <Grid container justify="space-between" spacing={24}>
          <Grid item xs={11}>
            <Typography>{`${index + 1}. ${title} `}</Typography>
          </Grid>
          <Grid
            item
            xs={1}
            style={{
              background: _getScoreColor(_getAuditScore(auditId)),
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Typography
              style={{
                color: "black"
              }}
            >
              {_getAuditScore(auditId)}
            </Typography>
          </Grid>
        </Grid>
      </ExpansionPanelSummary>
    );
  };

  itemDescription = (description, index) => {
    const { classes } = this.props;
    if (index % 2 === 0) {
      return (
        <ListItem style={{ paddingTop: "0px", marginBottom: "10px" }}>
          <ListItemText
            primary={`${description}`}
            className={classes.listDescription}
          />
        </ListItem>
      );
    } else {
      return (
        <ListItem
          style={{
            backgroundColor: "#f1f3f4",
            paddingTop: "0px",
            marginBottom: "16px"
          }}
        >
          <ListItemText
            primary={`${description}`}
            className={classes.listDescription}
          />
        </ListItem>
      );
    }
  };

  render() {
    const { classes } = this.props;
    const { fails } = this.props;
    return (
      <div className={classes.root}>
        {fails.map((fail, index) => (
          <ExpansionPanel key={`section-${fail.id}-${index}`}>
            {this.itemHeader(`${fail.title} `, `${fail.id}`, index)}
            <ExpansionPanelDetails style={{ display: "block", padding: "0px" }}>
              <List>
                {this.itemDescription(
                  `${fail.description.split("[")[0]}`,
                  index
                )}
                {fail.details.items.map((item, index) => (
                  <ListItem key={`item-${fail.id}-${index}`}>
                    <ListItemText
                      primary={`${item.node.snippet}`}
                      className={classes.listItem}
                    />
                  </ListItem>
                ))}
              </List>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(FailList);
