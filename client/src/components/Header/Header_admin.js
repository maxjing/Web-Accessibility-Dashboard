import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import BuildIcon from "@material-ui/icons/Build";
import FaceIcon from "@material-ui/icons/Face";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import HealingIcon from "@material-ui/icons/Healing";
import { NavLink } from "react-router-dom";

const styles = theme => ({
  header: {
    backgroundColor: "#2196f3",
    color: "white"
  },
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  runButton: {
    backgroundColor: "rgb(245, 0, 87)"
  },
  list: {
    width: 250
  },
  drawer: {
    backgroundColor: "floralwhite"
  }
});

class Header_Admin extends React.Component {
  state = {
    sideMenu: false
  };

  toggleDrawer = open => () => {
    this.setState({
      sideMenu: open
    });
  };

  render() {
    const { classes } = this.props;
    const sideMenu = (
      <div className={classes.list}>
        <div className={classes.list}>
          <List style={{ marginTop: "64px" }}>
            <NavLink to="/">
              <ListItem button>
                <ListItemIcon>
                  <TrendingUpIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Trend" />
              </ListItem>
            </NavLink>
            <NavLink to="/prod">
              <ListItem button>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Production" />
              </ListItem>
            </NavLink>
            <NavLink to="/beta">
              <ListItem button>
                <ListItemIcon>
                  <BuildIcon />
                </ListItemIcon>
                <ListItemText primary="Beta" />
              </ListItem>
            </NavLink>
            <NavLink to="/betax">
              <ListItem button>
                <ListItemIcon>
                  <HealingIcon />
                </ListItemIcon>
                <ListItemText primary="Beta.x" />
              </ListItem>
            </NavLink>
            <NavLink to="/ondemand">
              <ListItem button>
                <ListItemIcon>
                  <FaceIcon />
                </ListItemIcon>
                <ListItemText primary="OnDemand" />
              </ListItem>
            </NavLink>
          </List>
        </div>
      </div>
    );

    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon onClick={this.toggleDrawer(true)} />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Admin
          </Typography>
          <NavLink to="/admin/version=default">
            <Button
              color="inherit"
              className={classes.runButton}
              style={{ marginRight: "25px" }}
              onClick={this.props.clickDefaultHandler}
            >
              Default
            </Button>
          </NavLink>

          <Button
            color="inherit"
            className={classes.runButton}
            onClick={this.props.clickSetHandler}
          >
            Set
          </Button>
        </Toolbar>
        <Drawer
          open={this.state.sideMenu}
          onClose={this.toggleDrawer(false)}
          classes={{ paper: classes.drawer }}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
          >
            {sideMenu}
          </div>
        </Drawer>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Header_Admin);
