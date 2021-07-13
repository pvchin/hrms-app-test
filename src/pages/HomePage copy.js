import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import CardLayout3 from "../helpers/CardLayout3";
import Copyright from "../components/Copyright";
import LeaveTableView from "../components/LeaveTableView"
const drawerWidth = 240;

const HomePage = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <div>
      <div className={classes.appBarSpacer} />
      <div style={{ paddingLeft: 50 }}>
        <h2>Welcome Admin!</h2>
        <h3>Dashboard</h3>
      </div>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12} md={8} lg={12}>
            {/* <Paper className={fixedHeightPaper}>
              <div>Chart</div>
            </Paper> */}
            <CardLayout3
              title="Chart"
              // handleClick={handleEarningsDialogOpen}
            >
              <h2>Chart</h2>
              {/* <Payslip_ViewEarnings /> */}
            </CardLayout3>
          </Grid>
          {/* Recent Deposits */}
          <Grid item xs={6} md={8} lg={6}>
            <CardLayout3
              title="Leaves pending for approval"
              // handleClick={handleEarningsDialogOpen}
            >
             
              <LeaveTableView />
            </CardLayout3>
          </Grid>
          {/* Recent Orders */}
          <Grid item xs={6} md={8} lg={6}>
            <CardLayout3
              title="Leaves"
              // handleClick={handleEarningsDialogOpen}
            >
              <h2>Expenses pending for approval</h2>
              {/* <Payslip_ViewEarnings /> */}
            </CardLayout3>
          </Grid>
        </Grid>
        <Box pt={4}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default HomePage;
