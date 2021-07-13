import React from "react";
import { Button, Icon, TextField, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useRecoilState } from "recoil";
import { loginLevelState } from "./data/atomdata";
import MenuItem from "@material-ui/core/MenuItem";
import { useEmployeesContext } from "../context/employees_context";
import { useExpensesContext } from "../context/expenses_context";
import { Controller, useForm } from "react-hook-form";
import { useExpenses } from "./expenses/useExpenses";
import { useAddExpenses } from "./expenses/useAddExpenses";
import { useDeleteExpenses } from "./expenses/useDeleteExpenses";
import { useUpdateExpenses } from "./expenses/useUpdateExpenses";

const initial_values = {
  name: "",
  date: "",
  purchased_date: "",
  purchased_from: "",
  description: "",
  remark: "",
  status: "Pending",
  amount: 0,
};

const ExpenseForm = ({ formdata, setFormdata, handleDialogClose }) => {
  const classes = useStyles();
  const { expenses, filter, setFilter, setExpenseId } = useExpenses();
  const updateExpenses = useUpdateExpenses();
  const addExpenses = useAddExpenses();
  const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);
  const {
    isExpenseEditing,
    editExpenseID,
  } = useExpensesContext();

  const { handleSubmit, control } = useForm();

  const onSubmit = (data, e) => {
    e.preventDefault();
    if (isExpenseEditing) {
      updateExpenses({ id: editExpenseID, ...data });
    } else {
      addExpenses({ empid: loginLevel.loginUserId, ...data });
    }

    handleDialogClose();
  };

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          EXPENSES CLAIM FORM
        </Typography>
        <Typography component="p">Expense Claim Application</Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Controller
              name="name"
              control={control}
              defaultValue={loginLevel.loginUser}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    label="Name"
                    id="margin-normal1"
                    name="name"
                    defaultValue={loginLevel.loginUser}
                    className={classes.textField}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    InputProps={{
                      readOnly: true,
                    }}
                  ></TextField>
                );
              }}
            />
          </div>
          <div>
            <Controller
              name="date"
              control={control}
              defaultValue={formdata.date}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    label="Date"
                    type="date"
                    id="margin-normal2"
                    name="formdata.date"
                    value={value}
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
              rules={{ required: "From Date is required" }}
            />
          </div>

          <div>
            <Controller
              name="purchased_from"
              control={control}
              defaultValue={formdata.purchased_from}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    label="Purchased From"
                    id="margin-normal3"
                    name="purchased_from"
                    defaultValue={formdata.purchased_from}
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
              name="description"
              control={control}
              defaultValue={formdata.description}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    label="Description"
                    id="margin-normal4"
                    name="description"
                    defaultValue={formdata.description}
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
              name="amount"
              control={control}
              defaultValue={formdata.amount}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    label="Amount"
                    type="number"
                    id="standard-number1"
                    name="amount"
                    defaultValue={formdata.amount}
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
              name="remark"
              control={control}
              defaultValue={formdata.remark}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    label="Remark"
                    id="margin-normal5"
                    name="remark"
                    defaultValue={formdata.remark}
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
                    id="margin-normal6"
                    name="status"
                    defaultValue="Pending"
                    className={classes.textField}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    InputProps={{
                      readOnly: true,
                    }}
                  ></TextField>
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
              //onClick={() => handleSubmit(onSubmit)()}
            >
              Save <Icon className={classes.rightIcon}>send</Icon>
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

export default ExpenseForm;
