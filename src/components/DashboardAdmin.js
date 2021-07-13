import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import Chart from "./Chart";
// import Deposits from "./Deposits";
// import Orders from "./Orders";
import Appbanner from "./Appbanner";
import Example from "./Example7";
import SideDrawer from "./SideDrawer";
import SingleEmployee from "./SingleEmployee";
import SingleEmployeeStaff from "./SingleEmployeeStaff old";
import SingleLeave from "./SingleLeave";
import SingleExpense from "./SingleExpense";
import SingleDailyAllowance from "./SingleDailyAllowance";
import SingleDailyAllowsDetls from "./SingleDailyAllowsDetls";
import BatchDailyAllowances from "./BatchDailyAllowances";
import SinglePayslip from "./SinglePayslip";
import Login from "./LoginForm";
import Payrun from "./Payrun";
import Payrunbatch from "./Payrunbatch";

import {
  Home,
  AllEmployees,
  Leave,
  Expenses,
  Payslip,
  BatchPayslips,
  Payroll,
  Departments,
  Designation,
  Tables,
  Clients,
  Allowances,
  DailyAllowances,
  // PrivateRoute,
  Error,
} from "../pages";

const drawerWidth = 240;

export default function DashboardAdmin() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [login, setLogin] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  //  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  if (!login) {
    return <Login setLogin={setLogin} />;
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Router>
        <Appbanner
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
          open={open}
          setLogin={setLogin}
          title="Human Resource Management System - AppSmiths Sutera Sdn Bhd"
        />

        <SideDrawer
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
          open={open}
        />

        <main className={classes.content}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            {/* <Route exact path="/home">
              <Home />
            </Route> */}
            <Route exact path="/allemployees">
              <AllEmployees />
            </Route>

            <Route exact path="/departments">
              <Departments />
            </Route>
            <Route exact path="/designation">
              <Designation />
            </Route>
            <Route exact path="/tables">
              <Tables />
            </Route>
            <Route exact path="/allowances">
              <Allowances />
            </Route>
            <Route exact path="/clients">
              <Clients />
            </Route>
            <Route exact path="/example">
              <Example />
            </Route>
            <Route exact path="/singleemployee">
              <SingleEmployee />
            </Route>
            <Route exact path="/singleleave">
              <SingleLeave />
            </Route>
            <Route exact path="/singleexpense">
              <SingleExpense />
            </Route>
            <Route exact path="/error">
              <Error />
            </Route>
            {/* <Route
              exact
              path="/employees/:empId"
              children={<SingleEmployee />}
            /> */}
            <Route path="*">
              <Error />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
}

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
