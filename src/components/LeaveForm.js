import React, { useState, useEffect } from "react";
import {
  Button,
  Icon,
  TextField,
  Paper,
  Typography,
  Divider,
} from "@material-ui/core";
import { useRecoilState } from "recoil";
import { loginLevelState } from "./data/atomdata";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import { useEmployeesContext } from "../context/employees_context";
import { useLeavesContext } from "../context/leaves_context";
import { Controller, useForm } from "react-hook-form";
import { useLeaves } from "./leaves/useLeaves";
import { useAddLeaves } from "./leaves/useAddLeaves";
import { useDeleteLeaves } from "./leaves/useDeleteLeaves";
import { useUpdateLeaves } from "./leaves/useUpdateLeaves";

const initial_state = {
  name: "",
  to_date: "",
  from_date: "",
  reason: "",
  status: "Pending",
  no_of_days: 0,
  leave_bal: 0,
};

const LeaveForm = ({ formdata, setFormdata, handleDialogClose }) => {
  const classes = useStyles();
  const { leaves, filter, setFilter, setLeaveId } = useLeaves();
  const updateLeaves = useUpdateLeaves();
  const addLeaves = useAddLeaves();
  const [state, setState] = useState(initial_state);
  const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);
  const { handleSubmit, control } = useForm();
  const initialValues = Object.values(initial_state).join("");
  const { isLeaveEditing, editLeaveID } =
    useLeavesContext();

  const onSubmit = (data) => {
    if (isLeaveEditing) {
      updateLeaves({ id: editLeaveID, ...data });
    } else {
      addLeaves({ ...data, empid: loginLevel.loginUserId });
    }

    //history.push("/leave");
    handleDialogClose();
  };

  // useEffect(() => {
  //   setState(initial_state);
  //   setState({ ...formdata });
  //   setState({ ...formdata });
  //   console.log("laeve form",state)
  // }, [initialValues]);

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          LEAVE FORM
        </Typography>
        <Typography component="p">Leave Application</Typography>
        <Divider />
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
                    id="margin-normal"
                    name="name"
                    defaultValue={loginLevel.loginUser}
                    //value={value}
                    className={classes.textField}
                    onChange={(e) => {
                      console.log(e.target.value);
                      onChange(e.target.value);
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                    error={!!error}
                    helperText={error ? error.message : null}
                    //select
                  >
                    {/* {employees.map((e) => {
                      return (
                        <MenuItem key={e.name} value={e.name}>
                          {e.name}
                        </MenuItem>
                      );
                    })} */}
                  </TextField>
                );
              }}
              // rules={{ required: "Name required" }}
            />
          </div>
          <div>
            <Controller
              name="from_date"
              control={control}
              defaultValue={formdata.from_date}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    label="From Date"
                    type="date"
                    id="margin-normal"
                    name="from_date"
                    defaultValue={formdata.from_date}
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
              name="to_date"
              control={control}
              defaultValue={formdata.to_date}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    label="To Date"
                    id="margin-normal"
                    type="date"
                    name="to_date"
                    defaultValue={formdata.to_date}
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
              rules={{ required: "To Date is required" }}
            />
          </div>
          <div>
            <Controller
              name="leave_bal"
              control={control}
              defaultValue={loginLevel.leave_bal}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    disable
                    label="Leave Balance"
                    type="number"
                    id="standard-number"
                    name="leave_bal"
                    defaultValue={loginLevel.leave_bal}
                    className={classes.textField}
                    //onChange={onChange}
                    onChange={(e) => {
                      onChange(parseInt(e.target.value, 10));
                    }}
                    error={!!error}
                    helperText={error ? error.message : null}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                );
              }}
              //rules={{ required: "IC No required" }}
            />
          </div>
          <div>
            <Controller
              name="no_of_days"
              control={control}
              defaultValue={formdata.no_of_days}
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
                    defaultValue={formdata.no_of_days}
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
              name="reason"
              control={control}
              defaultValue={formdata.reason}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    label="Reason"
                    id="margin-normal"
                    name="reason"
                    defaultValue={formdata.reason}
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
              defaultValue={formdata.status}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => {
                return (
                  <TextField
                    label="Status"
                    id="margin-normal"
                    name="status"
                    defaultValue={formdata.status}
                    className={classes.textField}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    InputProps={{
                      readOnly: true,
                    }}
                    // select
                  >
                    {/* <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Cancel">Cancel</MenuItem>
                    <MenuItem value="Approve">Approve</MenuItem>
                    <MenuItem value="Reject">Reject</MenuItem> */}
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
              onClick={handleSubmit(onSubmit)}
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

export default LeaveForm;
