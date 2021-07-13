import React, { useState } from "react";
import {
  Button,
  Icon,
  TextField,
  Paper,
  Typography,
 } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const initial_values = {
  name: "",
  age: 0,
};

const TableForm = ({ title }) => {
  const classes = useStyles();
  const [state, setState] = useState(initial_values);

  const handleInput = (e) => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    setState({ [name]: val });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = { state };
    console.log(data);
  };

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          {title}
        </Typography>

        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              label="Name"
              id="margin-normal"
              name="name"
              defaultValue={state.name}
              className={classes.textField}
              onChange={handleInput}
            />
          </div>
          <div>
            <TextField
              label="Age"
              id="margin-normal"
              type="number"
              name="age"
              Value={state.age}
              className={classes.textField}
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

export default TableForm;
