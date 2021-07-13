import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { Grid, ListItem, ListItemText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  useSetRecoilState,
  useRecoilValue,
  useRecoilState,
  useRecoilValueLoadable,
} from "recoil";
import {
  allowsPeriodState,
  allowsDataState,
  empidState,
  loginLevelState,
} from "./data/atomdata";
import { fetchDailyAllowancesSelector } from "./data/selectordata";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import SearchIcon from "@material-ui/icons/Search";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { CustomDialog } from "../helpers/CustomDialog";
import { useDailyAllowancesContext } from "../context/dailyallowances_context";
//import { useEmployeesContext } from "../context/employees_context";
import DailyAllowsDetlsTable from "./DailyAllowsDetlsTable";

const FILTERSTRING = "Pending";

const columns = [
  {
    title: "Name",
    field: "name",
  },
  { title: "Period", field: "period" },
  { title: "Location", field: "location" },
  { title: "Manager", field: "manager_name" },
  { title: "Days", field: "no_of_days", type: "numeric" },
  { title: "Amount", field: "amount", type: "currency" },
  { title: "Status", field: "status" },
];

export default function DailyAllowancesTableViewStaff() {
  let history = useHistory();
  const classes = useStyles();
  const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tmpallowsdata, setTmpallowsdata] = useState([]);
  const allows_period = useRecoilValue(allowsPeriodState);
  const allows_empid = useRecoilValue(empidState);
  const [allowsdata, setAllowsdata] = useRecoilState(allowsDataState);
  const setEmpID = useSetRecoilState(empidState);
  const title = `Site Allowances (${allows_period})`;
  const {
    dailyallowances,
    loadEmpDailyAllowances,
    dailyallowances_loading,
    dailyallowances_error,
  } = useDailyAllowancesContext();

  useEffect(() => {
    loadEmpDailyAllowances(loginLevel.loginUserId);
  }, []);

  const handleDialogOpen = () => {
    //console.log("allowsdetls", allowsdata, allowsdataRef, singlebatch_dailyallowsdetl);
    //setAllowsdata({ singlebatch_dailyallowsdetl });
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    //getSingleBatchDailyAllowance(dailyallowance_period);
  };

  if (dailyallowances_loading) {
    return (
      <div>
        <h2>Loading... daily allowances</h2>
      </div>
    );
  }
  if (dailyallowances_error) {
    return (
      <div>
        <h2>Internet connections problem!</h2>
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <Grid container direction="row">
        {dailyallowances
          .filter((i) => i.empid === loginLevel.loginUserId)
          .map((row) => {
            return (
              <ListItem key={row.id}>
                {/* <Grid item sm={2} align="center">
                  <ListItemText>{row.name}</ListItemText>
                </Grid> */}
                <Grid item sm={2} align="center">
                  <ListItemText>{row.period}</ListItemText>
                </Grid>
                <Grid item sm={5} align="center">
                  <ListItemText>{row.no_of_days}</ListItemText>
                </Grid>
                <Grid item sm={2} align="center">
                  <ListItemText>{row.amount}</ListItemText>
                </Grid>
                <Grid item sm={3} align="center">
                  <ListItemText>{row.status}</ListItemText>
                </Grid>
              </ListItem>
            );
          })}
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
  },
  dialog: {
    width: 1000,
  },
}));
