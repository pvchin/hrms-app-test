import React, { useState, useReducer, useEffect } from "react";
import {
  Button,
  Icon,
  TextField,
  Paper,
  Typography,
  Select,
  Divider,
  Grid,
  Toolbar,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import { useEmployeesContext } from "../context/employees_context";
import { usePayslipsContext } from "../context/payslips_context";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import Payslip_Earnings from "./Payslip_Earnings";
import Payslip_Deductions from "./Payslip_Deductions";

const initial_values = {
  name: "",
  period: "",
  date: "",
  bank_name: "",
  bank_acno: "",
  status: "Pending",
  total_earnings: 0,
  total_deductions: 0,
  tap_amount: 0,
  scp_amount: 0,
  basic_pay: 0,
  nett_pay: 0,
};

const PayslipForm = () => {
  let history = useHistory();
  const classes = useStyles();
  const {
    isPayslipEditing,
    single_payslip,
    updatePayslip,
    addPayslip,
    editPayslipID,
    loadPayslips,
    getSinglePayslip,
    single_payslip_loading,
    single_payslip_error,
    payslip_period,
    payslip_earning_amount,
    payslip_deduction_amount,
    setPayslipEarningAmount,
    setPayslipDeductionAmount,
    payslipearnings,
    payslipdeductions,
  } = usePayslipsContext();
  const { loadEmployees, employees } = useEmployeesContext();
  const [state, setState] = useState(single_payslip);

  const {
    name,
    period,
    date,
    bank_name,
    bank_acno,
    status,
    total_earnings,
    total_deductions,
    tap_amount,
    scp_amount,
    basic_pay,
    nett_pay,
  } = single_payslip;

  useEffect(async () => {
    getSinglePayslip(editPayslipID);
  }, []);

  const handleChange = (event) => {
    //const { rec_id, ...fields } = single_payslip;
    // const value =
    //   event.target.type === "number"
    //     ? parseInt(event.target.value, 10)
    //     : event.target.value;
    // setState({ ...state, [event.target.name]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(state);
  };

  const handleCalc = () => {
    console.log("calc");
    // setState({
    //   ...state,
    //   total_earnings: payslip_earning_amount,
    //   total_deductions: payslip_deduction_amount,
    // });
  };
  const calc_totals = () => {
    const totalEarnings = payslipearnings.reduce(
      (a, v) => (a = a + v.amount),
      0
    );
    const totalDeductions = payslipdeductions.reduce(
      (a, v) => (a = a + v.amount),
      0
    );
    setPayslipEarningAmount(totalEarnings);
    setPayslipDeductionAmount(totalDeductions);
    updatePayslip({
      id: editPayslipID,
      total_earnings: totalEarnings,
      total_deductions: totalDeductions,
    });
    console.log("total", totalEarnings, totalDeductions);
    getSinglePayslip(editPayslipID);
  };

  const onSubmit = (data) => {
    const { rec_id, ...fields } = single_payslip;
    updatePayslip(...fields);

    // if (isPayslipEditing) {
    //   updatePayslip({ id: editPayslipID, ...data });
    // } else {
    //   addPayslip({ ...data });
    // }
    // loadPayslips();
    // history.push("/batchpayslips");
  };

  if (single_payslip_loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Paper className={classes.root}>
          <Grid container className={classes.root} spacing={15}>
            <div>
              <Typography variant="h5" component="h3">
                PAYSLIP FORM
              </Typography>
              <Typography component="p">Payslip Preparation</Typography>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Submit <Icon className={classes.rightIcon}>send</Icon>
              </Button>
            </div>
          </Grid>

          <Grid item xs={12}>
            <div>
              <TextField
                label="Name"
                id="margin-normal"
                name="name"
                value={name}
                className={classes.textField}
                onChange={handleChange}
                // select
              >
                {/* {employees.map((e) => {
                  return (
                    <MenuItem key={e.name} value={e.name}>
                      {e.name}
                    </MenuItem>
                  );
                })} */}
              </TextField>
            </div>
            <div>
              <TextField
                label="Period"
                id="margin-normal"
                name="period"
                value={period}
                className={classes.textField}
                onChange={handleChange}
                InputProps={{
                  readOnly: true,
                }}
              />

              <TextField
                label="Date"
                type="date"
                id="margin-normal"
                name="date"
                value={date}
                className={classes.textField}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div>
              <TextField
                label="Bank Name"
                id="margin-normal"
                name="bank_name"
                value={bank_name}
                className={classes.textField}
                onChange={handleChange}
              />

              <TextField
                label="Bank AC No"
                id="margin-normal"
                name="bank_acno"
                value={bank_acno}
                className={classes.textField}
                onChange={handleChange}
              />
            </div>
            <div>
              <TextField
                label="TAP Contrinution"
                type="number"
                id="standard-number"
                name="tap_amount"
                value={tap_amount}
                className={classes.textField}
                //onChange={onChange}
                onChange={(e) => {
                  handleChange(parseInt(e.target.value, 10));
                }}
              />

              <TextField
                label="SCP Contribution"
                type="number"
                id="standard-number"
                name="scp_amount"
                value={scp_amount}
                className={classes.textField}
                //onChange={onChange}
                onChange={(e) => {
                  handleChange(parseInt(e.target.value, 10));
                }}
              />
            </div>
            <div>
              <TextField
                label="Total Earnings"
                type="number"
                id="standard-number"
                name="total_earnings"
                value={total_earnings}
                className={classes.textField}
                //onChange={onChange}
                onChange={(e) => {
                  handleChange(parseInt(e.target.value, 10));
                }}
              />

              <TextField
                label="Total Deductions"
                type="number"
                id="standard-number"
                name="total_deductions"
                value={total_deductions}
                className={classes.textField}
                //onChange={onChange}
                onChange={(e) => {
                  handleChange(parseInt(e.target.value, 10));
                }}
              />
            </div>
            <div>
              <TextField
                label="Basic Pay"
                type="number"
                id="standard-number"
                name="basic_pay"
                value={basic_pay}
                className={classes.textField}
                onChange={handleChange}
                // onChange={(e) => {
                //   handleChange(parseInt(e.target.value, 10));
                // }}
              />

              <TextField
                label="Nett Pay"
                type="number"
                id="standard-number"
                name="nett_pay"
                value={nett_pay}
                className={classes.textField}
                //onChange={onChange}
                onChange={(e) => {
                  handleChange(parseInt(e.target.value, 10));
                }}
              />
            </div>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={calc_totals}
            >
              Calc <Icon className={classes.rightIcon}>send</Icon>
            </Button>
          </Grid>
          <Divider />
          <div>
            <Grid container alignItems="center" className={classes.grid}>
              {/* <Grid item xs={4} style={{ textAlign: "center" }}> */}
              <Grid xs={12}>
                <Payslip_Earnings />
              </Grid>
              <Divider orientation="vertical" flexItem />
              {/* <Grid item xs={4} style={{ textAlign: "center" }}> */}
              <Grid xs={12}>
                <Payslip_Deductions />
              </Grid>
            </Grid>
          </div>
          <Divider />
        </Paper>
      </form>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  iconSmall: {
    fontSize: 20,
  },
  root: {
    padding: theme.spacing(3, 2),
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400,
  },
  grid: {
    padding: theme.spacing(3, 2),
    // justifyContent: "center",
  },
  box: {
    height: 100,
    display: "flex",
    border: "1px solid black",
    padding: 8,
  },
}));

export default PayslipForm;
