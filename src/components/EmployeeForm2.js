import React, { useState, useReducer, useEffect } from "react";
import { Button, Icon, TextField, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import { useEmployeesContext } from "../context/employees_context";
import { useForm } from "react-hook-form";

const initial_values = {
  name: "",
  gender: "",
  ic_no: "",
  email: "",
  age: 0,
};

const EmployeeForm = () => {
  const classes = useStyles();
  const { isEditing, single_employee } = useEmployeesContext();
  const { name, gender, ic_no, email, age } = single_employee || initial_values;

  const [formInput, setFormInput] = useState(initial_values);

  const handleInput = (e) => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    setFormInput({ [name]: val });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = { formInput };
    console.log(data);
  };

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          EMPLOYEE FORM
        </Typography>
        <Typography component="p">Employee Particulars</Typography>

        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              label="Name"
              id="margin-normal"
              name="name"
              defaultValue={formInput.name}
              className={classes.textField}
              helperText="Enter your full name"
              onChange={handleInput}
            />
          </div>
          <div>
            <TextField
              label="IC No"
              id="margin-normal"
              name="ic_no"
              defaultValue={formInput.ic_no}
              className={classes.textField}
              helperText="Enter your I/C No"
              onChange={handleInput}
            />
          </div>
          <div>
            <TextField
              label="Gender"
              id="margin-normal"
              name="gender"
              defaultValue={formInput.gender}
              className={classes.textField}
              helperText="Enter your gender"
              onChange={handleInput}
              select
            >
              <MenuItem value="Maine">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </TextField>
          </div>
          <div>
            <TextField
              label="Age"
              id="margin-normal"
              type="number"
              name="age"
              defaultValue={formInput.age}
              className={classes.textField}
              helperText="Enter your age"
              onChange={handleInput}
            />
          </div>
          <div>
            <TextField
              label="Email"
              id="margin-normal"
              name="email"
              defaultValue={formInput.name}
              className={classes.textField}
              helperText="e.g. name@gmail.com"
              onChange={handleInput}
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

export default EmployeeForm;
