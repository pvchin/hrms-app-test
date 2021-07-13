import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { payrunIdState,payPeriodState, payPeriodEndMonthState } from "./data/atomdata";
import { usePayslipsContext } from "../context/payslips_context";
import { useTablesContext } from "../context/tables_context";
import { useEmployeesContext } from "../context/employees_context";
import { periods } from "../utils/constants";
import BatchPayslips from "./BatchPayslips";

const PayslipsPeriods = () => {
  let history = useHistory();
  const classes = useStyles();
  const setPayPeriod = useSetRecoilState(payPeriodState);
  const setPayPeriodEndMonth = useSetRecoilState(payPeriodEndMonthState);
  const { setPayslipPeriod, setPayslipEndMonthDate } = usePayslipsContext();
  const { loadEmployees, employees } = useEmployeesContext();
  const { loadAllowances, allowances, loadDeductions, deductions } =
    useTablesContext();

  const handlePeriod = (name, monthenddate) => {
    setPayPeriod(name);
     setPayPeriodEndMonth(monthenddate);
    setPayslipPeriod(name);
    setPayslipEndMonthDate(monthenddate);
    history.push("/batchpayslips");
  };

  useEffect(() => {
    loadAllowances();
    loadDeductions();
    loadEmployees()
  }, []);

  return (
    <div className={classes.root}>
      <Toolbar>
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          <h2>Payroll Period</h2>
        </Typography>
      </Toolbar>
      <Grid container spacing={3}>
        {periods.map((e) => {
          const { name, monthenddate } = e;
          return (
            <Grid item xs={3} inline>
              <Paper className={classes.paper}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  onClick={() => handlePeriod(name, monthenddate)}
                >
                  {name}
                </Button>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  title: {
    flex: "1 1 100%",
    textAlign: "center",
  },
}));
export default PayslipsPeriods;
