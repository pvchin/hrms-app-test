import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { allowsPeriodState } from "./data/atomdata";
import { Paper, Grid, Button, Toolbar, Typography } from "@material-ui/core";
import { useDailyAllowancesContext } from "../context/dailyallowances_context";
import { periods } from "../utils/constants";

const DailyAllowancesPeriods = () => {
  let history = useHistory();
  const classes = useStyles();
  const { setDailyAllowancePeriod } = useDailyAllowancesContext();
  const setAllowsPeriod = useSetRecoilState(allowsPeriodState);

  const handlePeriod = (name) => {
    setDailyAllowancePeriod(name);
    setAllowsPeriod(name);
    history.push("/batchdailyallowances");
  };

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
          return (
            <Grid item xs={3} inline="true" key={e.name}>
              <Paper className={classes.paper}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  onClick={() => handlePeriod(e.name)}
                >
                  {e.name}
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
export default DailyAllowancesPeriods;
