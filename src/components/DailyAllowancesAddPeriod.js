import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { differenceInDays, addDays } from "date-fns";
import { Heading } from "@chakra-ui/react";
import { useCustomToast } from "../helpers/useCustomToast";
import clsx from "clsx";
import { Button, Paper, Grid, Icon, TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useRecoilState } from "recoil";
import { siteallowsState, loginLevelState } from "./data/atomdata";
import { useDailyAllowancesContext } from "../context/dailyallowances_context";
import { useDailyAllows } from "./dailyallows/useDailyAllows";
import { useAddDailyAllows } from "./dailyallows/useAddDailyAllows";
import { useDailyAllowsDetls } from "./dailyallowsdetls/useDailyAllowsDetls";
import { useAddDailyAllowsDetls } from "./dailyallowsdetls/useAddDailyAllowsDetls";

//const drawerWidth = 240;
const selectYear = [{ name: "2021" }, { name: "2022" }];
const selectMonth = [
  { name: "January" },
  { name: "February" },
  { name: "March" },
  { name: "April" },
  { name: "May" },
  { name: "June" },
];

const DailyAllowancesAddPeriod = ({ handleDialogClose }) => {
  let date = new Date();
  let longMonth = date.toLocaleString("en-us", { month: "long" });
  //console.log("date", date, longMonth);
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const toast = useCustomToast();
  const { dailyallows } = useDailyAllows();
  const { dailyallowsdetls } = useDailyAllowsDetls();
  const addDailyAllows = useAddDailyAllows();
  const addDailyAllowsDetls = useAddDailyAllowsDetls();
  const [input, setInput] = useRecoilState(siteallowsState);
  const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);
  const [allowsPeriod, setAllowsPeriod] = useState("");
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState(false);
  // const { dailyallowances, addDailyAllowance, addDailyAllowsDetl } =
  //   useDailyAllowancesContext();
  // function daysInMonth(month, year) {
  //   return new Date(year, month, 0).getDate();
  // }

  useEffect(() => {
    setInput({
      ...input,
      empid: loginLevel.loginUserId,
      name: loginLevel.loginUser,
      jobbonus: loginLevel.siteallows_fee,
      perdiem: loginLevel.perdiem_fee,
      manager: loginLevel.reporting_to,
      clieng: "",
    });
  }, []);

  const periodExists = (data) => {
    return dailyallows.some(function (el) {
      return el.period === data;
    });
  };

  const buildSiteAllows = () => {
    const period =
      input.fromdate.substring(0, 4) + "-" + input.fromdate.substring(5, 7);

    const isExist = periodExists(period);
    if (isExist) {
      toast({
        title: "Site Allowance period is existed!",
        status: "warning",
      });
      // setError(true);
      return null;
    }

    // build siteallowsbatch

    const diffInDays = differenceInDays(
      new Date(input.todate),
      new Date(input.fromdate)
    );

    let amount = 0;
    for (let i = 0; i <= diffInDays; i++) {
      amount = amount + input.jobbonus + input.perdiem;
      const data = addDays(new Date(input.fromdate), i);
      addDailyAllowsDetls({
        empid: loginLevel.loginUserId,
        name: loginLevel.loginUser,
        period: period,
        date: data,
        district: input.district,
        typeoperation: input.typeoperation,
        client: input.client,
        location: input.location,
        jobno: input.jobno,
        crewoperation: input.crewoperation,
        jobbonus: input.jobbonus,
        perdiem: input.perdiem,
        status: "Pending",
      });
    }
    //add daily allowances batch
    addDailyAllows({
      period: period,
      location: input.location,
      manager: input.manager,
      name: loginLevel.loginUser,
      empid: loginLevel.loginUserId,
      status: "Pending",
      no_of_days: diffInDays,
      amount: amount,
    });

    // dailyallowances.push({
    //   period: period,
    //   location: input.location,
    //   manager: input.manager,
    //   name: loginLevel.loginUser,
    //   empid: loginLevel.loginUserId,
    //   status: "Pending",
    //   no_of_days: diffInDays,
    //   amount: amount,
    // });
    handleDialogClose();
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    setInput({ ...input, [name]: val });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const period =
      input.fromdate.substring(0, 4) + "-" + input.fromdate.substring(5, 7);
    setInput({
      ...input,
      period: period,
    });

    buildSiteAllows();
  };

  return (
    <Paper
      className={fixedHeightPaper}
      style={{ backgroundColor: "secondary" }}
    >
      <form onSubmit={(e) => handleSubmit(e)}>
        <Grid
          container
          spacing={0}
          direction="row"
          alignItems="center"
          justify="center"
          style={{ border: "1px solid white" }}
        >
          <Heading color="blue" style={{ padding: 10 }}>
            Build Site Allowances
          </Heading>
        </Grid>
        <Grid
          container
          spacing={0}
          direction="row"
          alignItems="center"
          justify="center"
          style={{ border: "1px solid white" }}
        >
          <div>
            <Grid
              item
              sm={12}
              style={{ border: "1px solid white" }}
              align="left"
            >
              {/* <div style={{ display: "flex", flexDirection: "row" }}>
                <TextField
                  label="Year"
                  id="margin-normal"
                  name="year"
                  required
                  defaultValue={input.year}
                  className={classes.textField}
                  onChange={(e) => handleChange(e)}
                  style={{ width: "100%", marginTop: 10, marginLeft: 10 }}
                  error={!!error}
                  helperText={error ? error.message : null}
                  select
                >
                  {selectYear.map((item) => {
                    return <MenuItem value={item.name}>{item.name}</MenuItem>;
                  })}
                </TextField>
                <TextField
                  label="Month"
                  id="margin-normal"
                  name="month"
                  required
                  defaultValue={input.month}
                  style={{ width: "100%", marginTop: 10, marginLeft: 0 }}
                  className={classes.textField}
                  onChange={(e) => handleChange(e)}
                  error={!!error}
                  helperText={error ? error.message : null}
                  select
                >
                  {selectMonth.map((item) => {
                    return <MenuItem value={item.name}>{item.name}</MenuItem>;
                  })}
                </TextField>
              </div> */}
              <div style={{ display: "flex", flexDirection: "row" }}>
                <TextField
                  label="From Date"
                  variant="filled"
                  required
                  style={{ width: "100%" }}
                  name="fromdate"
                  value={input.fromdate}
                  type="date"
                  className={classes.textField}
                  onChange={(e) => handleChange(e)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                ></TextField>
                <TextField
                  label="To Date"
                  variant="filled"
                  required
                  style={{ width: "100%" }}
                  name="todate"
                  value={input.todate}
                  type="date"
                  className={classes.textField}
                  onChange={(e) => handleChange(e)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                ></TextField>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                {/* <TextField
                  label="Period"
                  variant="filled"
                  required
                  style={{ width: "100%" }}
                  name="period"
                  value={input.period}
                  className={classes.textField}
                  onChange={(e) => handleChange(e)}
                ></TextField> */}
                {/* <Divider className={classes.divider} /> */}
                <TextField
                  label="Manager"
                  variant="filled"
                  //required
                  style={{ width: "100%" }}
                  name="manager"
                  value={input.manager}
                  className={classes.textField}
                  onChange={(e) => handleChange(e)}
                ></TextField>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <TextField
                  label="District"
                  variant="filled"
                  //required
                  value={input.district}
                  style={{ width: "100%" }}
                  name="district"
                  className={classes.textField}
                  onChange={(e) => handleChange(e)}
                ></TextField>
                <TextField
                  label="Location/Rig"
                  variant="filled"
                  //required
                  value={input.location}
                  style={{ width: "100%" }}
                  name="location"
                  className={classes.textField}
                  onChange={(e) => handleChange(e)}
                ></TextField>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <TextField
                  label="Operation Type"
                  variant="filled"
                  //required
                  value={input.typeoperation}
                  style={{ width: "100%" }}
                  name="typeoperation"
                  className={classes.textField}
                  onChange={(e) => handleChange(e)}
                ></TextField>
                <TextField
                  label="Client"
                  variant="filled"
                  //required
                  value={input.client}
                  style={{ width: "100%" }}
                  name="client"
                  className={classes.textField}
                  onChange={(e) => handleChange(e)}
                ></TextField>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <TextField
                  label="Ticket No/Job No"
                  variant="filled"
                  //required
                  value={input.jobno}
                  style={{ width: "100%" }}
                  name="jobno"
                  className={classes.textField}
                  onChange={(e) => handleChange(e)}
                ></TextField>
                <TextField
                  label="Crew Operation"
                  variant="filled"
                  //required
                  value={input.creqoperation}
                  style={{ width: "100%" }}
                  name="crewoperation"
                  className={classes.textField}
                  onChange={(e) => handleChange(e)}
                ></TextField>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <TextField
                  label="Job Bonus"
                  variant="filled"
                  required
                  value={input.jobbonus}
                  style={{ width: "100%" }}
                  name="jobbonus"
                  type="number"
                  className={classes.textField}
                  onChange={(e) => handleChange(e)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                ></TextField>
                <TextField
                  label="Per Diem"
                  variant="filled"
                  required
                  value={input.perdiem}
                  style={{ width: "100%" }}
                  name="perdiem"
                  type="number"
                  className={classes.textField}
                  onChange={(e) => handleChange(e)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                ></TextField>
              </div>
            </Grid>
          </div>
        </Grid>
        <Grid
          container
          spacing={0}
          direction="row"
          alignItems="center"
          justify="center"
          style={{ border: "1px solid white" }}
        >
          <div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Build <Icon className={classes.rightIcon}>send</Icon>
            </Button>
          </div>
          <div>
            {error && (
              <Alert severity="error" onClose={() => setError(false)}>
                Period already existed!
              </Alert>
            )}
          </div>
        </Grid>
      </form>
    </Paper>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(1),
  },
  container: {
    margin: 0,
    padding: 0,
    width: "80vw",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,250px)",
    gridAutoRows: "10px",
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    justifyContent: "center",
    backgroundColor: "primary",
  },
  fixedHeight: {
    height: 800,
  },
  paper: {
    padding: theme.spacing(10),
    // display: "flex",
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    border: "1px solid",
    width: "100%",
    color: "primary",
    bcakgroundColor: "black",
  },
  card: {
    backgroundColor: "black",
  },
  section: {
    width: "95vw",
    margin: "5rem auto",
    maxWidth: "var(--max-width)",
  },
  underline: {
    width: "5rem",
    height: "0.25rem",
    marginBottom: "1.25rem",
    background: "var(--clr-primary-5)",
    marginLeft: "auto",
    marginRight: "auto",
  },
  title: {
    marginbottom: "4rem",
    textAlign: "center",
  },
  jobscenter: {
    width: "80vw",
    margin: "0 auto",
    maxWidth: "var(--max-width)",
    flexDirection: "row",
  },
  btncontainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: "4rem",
    flexWrap: "wrap",
  },
  jobbtn: {
    background: "transparent",
    borderColor: "transparent",
    textTransform: "capitalize",
    fontSize: "1.25rem",
    letterSpacing: "var(--spacing)",
    margin: "0 0.5rem",
    transition: "var(--transition)",
    cursor: "pointer",
    padding: "0.25rem 0",
    lineHeight: "1",
    outlineColor: "var(--clr-primary-10)",
    "&:hover": {
      color: "var(--clr-primary-5)",
      boxShadow: "0 2px var(--clr-primary-5)",
    },
  },
  activebtn: {
    color: "var(--clr-primary-5)",
    boxShadow: "0 2px var(--clr-primary-5)",
  },
  jobinfo: {
    fontWeight: "400",
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  formLabel: {
    fontSize: 12,
    textAlign: "left",
    marginLeft: 8,
    marginTop: 8,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default DailyAllowancesAddPeriod;
