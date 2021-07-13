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
    payslip_period,
  } = usePayslipsContext();

  const { loadEmployees, employees } = useEmployeesContext();
  const [state, setState] = useState(initial_values);
  const { handleSubmit, control } = useForm();
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
  } = single_payslip || initial_values;

  useEffect(() => {
    getSinglePayslip(editPayslipID);
  }, []);

  const calc_totals = () => {
    const totalEarnings = payslipearings.reduce(
      (a, v) => (a = a + v.amount),
      0
    );
    const totalDeductions = payslipdeductions.reduce(
      (a, v) => (a = a + v.amount),
      0
    );
    setPayslipEarningAmount(totalEarnings);
    setPayslipDeductionAmount(totalDeductions);
    console.log("total", totalearnings, totaldeductions);
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
    return (
      <div>
        <h2>Loading...Payslip</h2>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
              <Controller
                name="name"
                control={control}
                defaultValue={name}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => {
                  return (
                    <TextField
                      label="Name"
                      id="margin-normal"
                      name="name"
                      defaultValue={name}
                      className={classes.textField}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      select
                    >
                      {employees.map((e) => {
                        return (
                          <MenuItem key={e.name} value={e.name}>
                            {e.name}
                          </MenuItem>
                        );
                      })}
                    </TextField>
                  );
                }}
                rules={{ required: "Name required" }}
              />
            </div>
            <div>
              <Controller
                name="period"
                control={control}
                defaultValue={period}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => {
                  return (
                    <TextField
                      label="Period"
                      id="margin-normal"
                      name="period"
                      defaultValue={period}
                      className={classes.textField}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  );
                }}
                rules={{ required: "Period is required" }}
              />

              <Controller
                name="date"
                control={control}
                defaultValue={date}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => {
                  return (
                    <TextField
                      label="Date"
                      type="date"
                      id="margin-normal"
                      name="date"
                      defaultValue={date}
                      className={classes.textField}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  );
                }}
                rules={{ required: "Date is required" }}
              />
            </div>
            <div>
              <Controller
                name="bank_name"
                control={control}
                defaultValue={bank_name}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => {
                  return (
                    <TextField
                      label="Bank Name"
                      id="margin-normal"
                      name="bank_name"
                      defaultValue={bank_name}
                      className={classes.textField}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  );
                }}
                // rules={{ required: "Reason is required" }}
              />

              <Controller
                name="bank_acno"
                control={control}
                defaultValue={bank_acno}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => {
                  return (
                    <TextField
                      label="Bank AC No"
                      id="margin-normal"
                      name="bank_acno"
                      defaultValue={bank_acno}
                      className={classes.textField}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  );
                }}
                // rules={{ required: "Reason is required" }}
              />
            </div>
            <div>
              <Controller
                name="tap_amount"
                control={control}
                defaultValue={tap_amount}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => {
                  return (
                    <TextField
                      label="TAP Contrinution"
                      type="number"
                      id="standard-number"
                      name="tap_amount"
                      defaultValue={tap_amount}
                      className={classes.textField}
                      //onChange={onChange}
                      onChange={(e) => {
                        onChange(parseInt(e.target.value, 10));
                      }}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  );
                }}
                //rules={{ required: "IC No required" }}
              />
              <Controller
                name="scp_amount"
                control={control}
                defaultValue={scp_amount}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => {
                  return (
                    <TextField
                      label="SCP Contribution"
                      type="number"
                      id="standard-number"
                      name="scp_amount"
                      defaultValue={scp_amount}
                      className={classes.textField}
                      //onChange={onChange}
                      onChange={(e) => {
                        onChange(parseInt(e.target.value, 10));
                      }}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  );
                }}
                //rules={{ required: "IC No required" }}
              />
            </div>
            <div>
              <Controller
                name="total_earnings"
                control={control}
                defaultValue={total_earnings}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => {
                  return (
                    <TextField
                      label="Total Earnings"
                      type="number"
                      id="standard-number"
                      name="total_earnings"
                      defaultValue={total_earnings}
                      className={classes.textField}
                      //onChange={onChange}
                      onChange={(e) => {
                        onChange(parseInt(e.target.value, 10));
                      }}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  );
                }}
                //rules={{ required: "IC No required" }}
              />
              <Controller
                name="total_deductions"
                control={control}
                defaultValue={total_deductions}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => {
                  return (
                    <TextField
                      label="Total Deductions"
                      type="number"
                      id="standard-number"
                      name="total_deductions"
                      defaultValue={total_deductions}
                      className={classes.textField}
                      //onChange={onChange}
                      onChange={(e) => {
                        onChange(parseInt(e.target.value, 10));
                      }}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  );
                }}
                //rules={{ required: "IC No required" }}
              />
            </div>
            <div>
              <Controller
                name="basic_pay"
                control={control}
                defaultValue={basic_pay}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => {
                  return (
                    <TextField
                      label="Basic Pay"
                      type="number"
                      id="standard-number"
                      name="basic_pay"
                      defaultValue={basic_pay}
                      className={classes.textField}
                      //onChange={onChange}
                      onChange={(e) => {
                        onChange(parseInt(e.target.value, 10));
                      }}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  );
                }}
                //rules={{ required: "IC No required" }}
              />
              <Controller
                name="nett_pay"
                control={control}
                defaultValue={nett_pay}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => {
                  return (
                    <TextField
                      label="Nett Pay"
                      type="number"
                      id="standard-number"
                      name="nett_pay"
                      defaultValue={nett_pay}
                      className={classes.textField}
                      //onChange={onChange}
                      onChange={(e) => {
                        onChange(parseInt(e.target.value, 10));
                      }}
                      error={!!error}
                      helperText={error ? error.message : null}
                    />
                  );
                }}
                //rules={{ required: "IC No required" }}
              />
            </div>

            {/* <div>
              <Controller
                name="status"
                control={control}
                defaultValue="Pending"
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => {
                  return (
                    <TextField
                      label="Status"
                      id="margin-normal"
                      name="status"
                      defaultValue={status}
                      className={classes.textField}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      select
                    >
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Cancel">Cancel</MenuItem>
                      <MenuItem value="Approved">Approved</MenuItem>
                      <MenuItem value="Rejected">Rejected</MenuItem>
                    </TextField>
                  );
                }}
                //rules={{ required: "Status is required" }}
              />
            </div> */}
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
