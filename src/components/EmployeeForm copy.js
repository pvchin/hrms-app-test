import React, { useState, useEffect } from "react";
import {
  Button,
  Icon,
  TextField,
  Paper,
  Typography,
  Grid,
  Divider,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import { useEmployeesContext } from "../context/employees_context";
import { Controller, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { loginLevelState } from "./data/atomdata";

import { useEmployees } from "./employees/useEmployees";
import { useAddEmployees } from "./employees/useAddEmployees";
import { useUpdateEmployees } from "./employees/useUpdateEmployees";
import { useDepartments } from "./departments/useDepartments";
import { useDesignations } from "./designations/useDesignations";
import EmpFamily from "./EmpFamily";
import EmpEducations from "./EmpEducations";
import EmpExperiences from "./EmpExperiences";
import EmpTrainings from "./EmpTrainings";

const initial_values = {
  name: "",
  gender: "",
  ic_no: "",
  email: "",
  age: 0,
  nationality: "",
  address: "",
  basic_salary: 0,
  bank_name: "",
  bank_acno: "",
  tap_checkbox: true,
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
  siteallows_fee: 0,
  perdiem_fee: 0,
  empno: "",
};

const EmployeeForm = () => {
  const classes = useStyles();
  const { employees, employeeId, setEmployeeId } = useEmployees();
  const addEmployees = useAddEmployees();
  const updateEmployees = useUpdateEmployees();
  const { designations } = useDesignations();
  const { departments } = useDepartments();
  const [alert, setAlert] = useState(false);
  const { handleSubmit, control } = useForm();
  const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);
  const {
    isEditing,
    single_employee,
    updateEmployee,
    addEmployee,
    editEmployeeID,
    single_employee_loading,
  } = useEmployeesContext();
  const {
    name,
    ic_no,
    gender,
    age,
    email,
    nationality,
    address,
    basic_salary,
    bank_name,
    bank_acno,
    tap_checkbox,
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
    siteallows_fee,
    perdiem_fee,
    empno,
  } = employees || initial_values;

  const onSubmit = (data) => {
    if (isEditing) {
      updateEmployees({ id: editEmployeeID, ...data });
    } else {
      addEmployees({ ...data });
    }
    // setAlert(true);
    // setTimeout(() => {
    //   setAlert(false);
    // }, 3000);
    //loadEmployees();
    // <Alert severity="success">
    //   <AlertTitle>Success</AlertTitle>
    //   This is a success alert — <strong>check it out!</strong>
    // </Alert>;
    //history.push("/allemployees");
  };
  useEffect(() => {
    setEmployeeId(editEmployeeID);
  }, []);

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
                  defaultValue={employees.name}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Name"
                        id="margin-normal"
                        name="name"
                        defaultValue={employees.name}
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
                  name="empno"
                  control={control}
                  defaultValue={employees.empno}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Emp No"
                        id="margin-normal"
                        name="empno"
                        value={employees.empno}
                        className={classes.textField}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    );
                  }}
                  //rules={{ required: "Name required" }}
                />
              </div>
              <div>
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
                        label="Nationnality"
                        id="standard-nationality"
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
              </div>
              <div>
                <Controller
                  name="address"
                  control={control}
                  defaultValue={address}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Address"
                        id="standard-address"
                        name="address"
                        defaultValue={address}
                        className={classes.textField}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                      />
                    );
                  }}
                  //rules={{ required: "IC No required" }}
                />
              </div>
            </div>
            <Divider className={classes.divider} />
            <div>
              <div>
                {loginLevel.loginLevel !== "Admin" && (
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
                )}
              </div>
              <div>
                {loginLevel.loginLevel !== "Admin" && (
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
                )}
                {loginLevel.loginLevel !== "Admin" && (
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
                )}
              </div>
              <div>
                <Controller
                  name="tap_checkbox"
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={tap_checkbox}
                            onChange={onChange}
                            name="tap_checkbox"
                          />
                        }
                        label="TAP/SCP Contribution"
                      />
                    );
                  }}
                  //rules={{ required: "IC No required" }}
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
                        select
                      >
                        {designations &&
                          designations.map((r) => {
                            return <MenuItem value={r.name}>{r.name}</MenuItem>;
                          })}
                      </TextField>
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
                        select
                      >
                        {departments &&
                          departments.map((r) => {
                            return <MenuItem value={r.name}>{r.name}</MenuItem>;
                          })}
                      </TextField>
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

      <div>
        <Grid xs={12}>
          <EmpFamily />
        </Grid>
        <Grid xs={12}>
          <EmpEducations />
        </Grid>
        <Grid xs={12}>
          <EmpExperiences />
        </Grid>
        <Grid xs={12}>
          <EmpTrainings />
        </Grid>
      </div>
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

export default EmployeeForm;
