import React from "react";
import {
  Button,
  Icon,
  TextField,
  Paper,
  Typography,
  Grid,
  Divider,
} from "@material-ui/core";
//import { Alert, AlertTitle } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import { useEmployeesContext } from "../context/employees_context";
import { Controller, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { loginLevelState } from "./data/atomdata";

const initial_values = {
  name: "",
  gender: "",
  ic_no: "",
  email: "",
  age: 0,
  basic_salary: 0,
  bank_name: "",
  bank_acno: "",
  tap_acno: "",
  scp_acno: "",
  date_of_join: null,
  date_of_resign: null,
  designation: "",
  department: "",
  passportno: "",
  passport_expirydate: null,
  workpermitno: "",
  workpermit_expirydate: null,
  nationality: "",
  marital_status: "",
  siteallows_fee: 0,
  perdiem_fee: 0,
  reporting_to: "",
};

const Emp_Personal = ({ handleDialogClose }) => {
  const classes = useStyles();
  const {
    isEditing,
    single_employee,
    updateEmployee,
    addEmployee,
    editEmployeeID,
    single_employee_loading,
    getSingleEmployee,
  } = useEmployeesContext();
  const {
    name,
    ic_no,
    ic_expirydate,
    gender,
    age,
    email,
    basic_salary,
    bank_name,
    bank_acno,
    tap_acno,
    scp_acno,
    date_of_join,
    date_of_resign,
    designation,
    department,
    passportno,
    passport_expirydate,
    workpermitno,
    workpermit_expirydate,
    nationality,
    marital_status,
    siteallows_fee,
    perdiem_fee,
    reporting_to,
  } = single_employee || initial_values;
  const { handleSubmit, control } = useForm();
  const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);
  
  const onSubmit = (data) => {
    if (isEditing) {
      updateEmployee({ id: editEmployeeID, ...data });
    } else {
      addEmployee({ ...data });
    }
    setLoginLevel({
      ...loginLevel,
      loginEmail: data.email,
      leave_bal: data.leave_bal,
      siteallows_fee: data.siteallows_fee,
      perdiem_fee: data.perdiem_fee,
      reporting_to: data.reporting_to,
    });
    getSingleEmployee(loginLevel.loginUserId);
    handleDialogClose();
    //loadEmployees();
    // <Alert severity="success">
    //   <AlertTitle>Success</AlertTitle>
    //   This is a success alert — <strong>check it out!</strong>
    // </Alert>;
    //history.push("/allemployees");
  };

  if (single_employee_loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper className={classes.root}>
          <Grid container className={classes.root} spacing={15}>
            <div>
              <Typography variant="h5" component="h3">
                EMPLOYEE FORM
              </Typography>

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
          <Divider className={classes.divider} />
          <Grid item xs={12}>
            <div>
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
                      />
                    );
                  }}
                  rules={{ required: "Name required" }}
                />

                <Controller
                  name="email"
                  control={control}
                  defaultValue={email}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Email"
                        id="margin-normal"
                        name="email"
                        defaultValue={email}
                        className={classes.textField}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    );
                  }}
                  rules={{ required: "Email is required" }}
                />
                <div>
                  <Controller
                    name="ic_no"
                    control={control}
                    defaultValue={ic_no}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => {
                      return (
                        <TextField
                          label="IC No"
                          id="margin-normal"
                          name="ic_no"
                          defaultValue={ic_no}
                          className={classes.textField}
                          onChange={onChange}
                          error={!!error}
                          helperText={error ? error.message : null}
                        />
                      );
                    }}
                    //rules={{ required: "IC No required" }}
                  />
                  <Controller
                    name="ic_expirydate"
                    control={control}
                    defaultValue={ic_expirydate}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => {
                      return (
                        <TextField
                          label="IC Expiry Date"
                          id="margin-normal"
                          name="ic_expirydate"
                          type="date"
                          defaultValue={ic_expirydate}
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
                    //rules={{ required: "IC No required" }}
                  />
                </div>
              </div>
              <div>
                <Controller
                  name="gender"
                  control={control}
                  defaultValue={gender}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Gender"
                        id="margin-normal"
                        name="gender"
                        defaultValue={gender}
                        className={classes.textField}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                        select
                      >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                      </TextField>
                    );
                  }}
                  //rules={{ required: "IC No required" }}
                />

                <Controller
                  name="age"
                  control={control}
                  defaultValue={age}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Age"
                        type="number"
                        id="standard-number"
                        name="age"
                        defaultValue={age}
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
                  name="nationality"
                  control={control}
                  defaultValue={nationality}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Nationality"
                        id="margin-normal"
                        name="nationality"
                        defaultValue={nationality}
                        className={classes.textField}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    );
                  }}
                  //rules={{ required: "IC No required" }}
                />
                <Controller
                  name="marital_status"
                  control={control}
                  defaultValue={marital_status}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Marital Status"
                        id="margin-normal"
                        name="marital_status"
                        defaultValue={marital_status}
                        className={classes.textField}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                        select
                      >
                        <MenuItem value="Single">Single</MenuItem>
                        <MenuItem value="Married">Married</MenuItem>
                        <MenuItem value="Divorced">Divorced</MenuItem>
                      </TextField>
                    );
                  }}
                  //rules={{ required: "IC No required" }}
                />
              </div>
              <div>
                <Controller
                  name="passportno"
                  control={control}
                  defaultValue={passportno}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Passport No"
                        id="margin-normal"
                        name="passportno"
                        defaultValue={passportno}
                        className={classes.textField}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    );
                  }}
                  //rules={{ required: "Name required" }}
                />
                <Controller
                  name="passport_expirydate"
                  control={control}
                  defaultValue={passport_expirydate}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Passport Expiry Date"
                        id="margin-normal"
                        name="passport_expirydate"
                        type="date"
                        defaultValue={passport_expirydate}
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
                  //rules={{ required: "Name required" }}
                />
              </div>
            </div>
            <Divider className={classes.divider} />
            <div>
              <div>
                <Controller
                  name="basic_salary"
                  control={control}
                  defaultValue={basic_salary}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Basic Salary"
                        type="number"
                        id="standard-number"
                        name="basic_pay"
                        defaultValue={basic_salary}
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
                  name="siteallows_fee"
                  control={control}
                  defaultValue={siteallows_fee}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Site Allowances Fee"
                        type="number"
                        id="standard-number"
                        name="siteallows_fee"
                        defaultValue={siteallows_fee}
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
                  name="perdiem_fee"
                  control={control}
                  defaultValue={perdiem_fee}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Perdiem Fee"
                        type="number"
                        id="standard-number"
                        name="perdiem_fee"
                        defaultValue={perdiem_fee}
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
                  //rules={{ required: "Email is required" }}
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
                        label="Bank Ac No"
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
                  // rules={{ required: "Email is required" }}
                />
              </div>
              <div>
                <Controller
                  name="tap_acno"
                  control={control}
                  defaultValue={tap_acno}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="TAP Ac No"
                        id="margin-normal"
                        name="tap_acno"
                        defaultValue={tap_acno}
                        className={classes.textField}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    );
                  }}
                  //rules={{ required: "Email is required" }}
                />

                <Controller
                  name="scp_acno"
                  control={control}
                  defaultValue={scp_acno}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="SCP Ac No"
                        id="margin-normal"
                        name="scp_acno"
                        defaultValue={scp_acno}
                        className={classes.textField}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    );
                  }}
                  //rules={{ required: "Email is required" }}
                />
              </div>
              <div>
                <Controller
                  name="workpermitno"
                  control={control}
                  defaultValue={workpermitno}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Work Permit No"
                        id="margin-normal"
                        name="workpermitno"
                        defaultValue={workpermitno}
                        className={classes.textField}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    );
                  }}
                  //rules={{ required: "Name required" }}
                />
                <Controller
                  name="workpermit_expirydate"
                  control={control}
                  defaultValue={workpermit_expirydate}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Work Permit Expiry Date"
                        id="margin-normal"
                        name="workpermit_expirydate"
                        type="date"
                        defaultValue={workpermit_expirydate}
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
                  //rules={{ required: "Name required" }}
                />
              </div>
              <Divider className={classes.divider} />
              <div>
                <Controller
                  name="date_of_join"
                  control={control}
                  defaultValue={date_of_join}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Joining Date"
                        id="margin-normal"
                        name="date_of_join"
                        type="date"
                        defaultValue={date_of_join}
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
                  //rules={{ required: "Email is required" }}
                />
                <Controller
                  name="date_of_resign"
                  control={control}
                  defaultValue={date_of_resign}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Resign Date"
                        id="margin-normal"
                        name="date_of_resign"
                        type="date"
                        defaultValue={date_of_resign}
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
                  //rules={{ required: "Email is required" }}
                />
              </div>
              <div>
                <Controller
                  name="designation"
                  control={control}
                  defaultValue={designation}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Designation"
                        id="margin-normal"
                        name="designation"
                        defaultValue={designation}
                        className={classes.textField}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    );
                  }}
                  //rules={{ required: "Email is required" }}
                />
                <Controller
                  name="department"
                  control={control}
                  defaultValue={department}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Department"
                        id="margin-normal"
                        name="department"
                        defaultValue={department}
                        className={classes.textField}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    );
                  }}
                  //rules={{ required: "Email is required" }}
                />
              </div>
              <div>
                <Controller
                  name="reporting_to"
                  control={control}
                  defaultValue={reporting_to}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Reporting To"
                        id="margin-normal"
                        name="reporting_to"
                        defaultValue={reporting_to}
                        className={classes.textField}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    );
                  }}
                  //rules={{ required: "Email is required" }}
                />
              </div>
              <Divider className={classes.divider} />
            </div>
          </Grid>
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
    flexDirection: "row",
    flexWrap: "wrap",
  },
  divider: {
    padding: 4,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 350,
  },
}));

export default Emp_Personal;
