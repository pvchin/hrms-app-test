import React, { useEffect } from "react";
import {
  Button,
  Icon,
  TextField,
  Paper,
  Typography,
  } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import { useEmployeesContext } from "../context/employees_context";
import { useDailyAllowancesContext } from "../context/dailyallowances_context";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

const initial_values = {
  name: "",
  period: "",
  location: "",
  manager_name: "",
  status: "Pending",
  no_of_days: 0,
  amount: 0,
};

const DailyAllowanceForm = () => {
  let history = useHistory();
  const classes = useStyles();
  const {
    isDailyAllowanceEditing,
    single_dailyallowance,
    updateDailyAllowance,
    addDailyAllowance,
    editDailyAllowanceID,
    loadDailyAllowances,
    single_dailyallowance_loading,
    dailyallowance_period,
  } = useDailyAllowancesContext();
  const { loadEmployees, employees } = useEmployeesContext();
  const { name, period, location, manager_name, status, no_of_days, amount } =
    single_dailyallowance || initial_values;
  const { handleSubmit, control } = useForm();

  useEffect(() => {
    loadEmployees();
  }, []);

  const onSubmit = (data) => {
    if (isDailyAllowanceEditing) {
      updateDailyAllowance({ id: editDailyAllowanceID, ...data });
    } else {
      addDailyAllowance({ ...data });
    }
    loadDailyAllowances();
    history.push("/batchdailyallowances");
  };

  if (single_dailyallowance_loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          DAILY ALLOWANCES CLAIM FORM
        </Typography>
        <Typography component="p">
          Daily Allowances Claim Application
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
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
              defaultValue={
                isDailyAllowanceEditing ? period : dailyallowance_period
              }
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    label="Period"
                    id="margin-normal"
                    name="period"
                    defaultValue={
                      isDailyAllowanceEditing ? period : dailyallowance_period
                    }
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
          </div>
          <div>
            <Controller
              name="location"
              control={control}
              defaultValue={location}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    label="Location"
                    id="margin-normal"
                    name="location"
                    defaultValue={location}
                    className={classes.textField}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                );
              }}
              rules={{ required: "Purchased Date is required" }}
            />
          </div>
          <div>
            <Controller
              name="manager_name"
              control={control}
              defaultValue={manager_name}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    label="Manager Name"
                    id="margin-normal"
                    name="manager_name"
                    defaultValue={manager_name}
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
              name="no_of_days"
              control={control}
              defaultValue={no_of_days}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    label="No Of Days"
                    type="number"
                    id="standard-number"
                    name="no_of_days"
                    defaultValue={no_of_days}
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
              name="amount"
              control={control}
              defaultValue={amount}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    label="Amount"
                    type="number"
                    id="standard-number"
                    name="amount"
                    defaultValue={amount}
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
          </div>

          <div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Submit <Icon className={classes.rightIcon}>send</Icon>
            </Button>
          </div>
        </form>
      </Paper>
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
}));

export default DailyAllowanceForm;
