import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import {
  Button,
  Paper,
  Grid,
  Icon,
  Divider,
  TextField,
  NativeSelect,
  InputLabel,
} from "@material-ui/core";
import { useRecoilState } from "recoil";

import { useEmployeesContext } from "../context/employees_context";
import { usePayslipsContext } from "../context/payslips_context";
import { useExpensesContext } from "../context/expenses_context";
import { useDailyAllowancesContext } from "../context/dailyallowances_context";
import { payrunState, payrunIdState } from "./data/atomdata";

//const drawerWidth = 240;

const columns = [
  {
    title: "Name",
    field: "name",
    editable: "never",
    cellStyle: {
      width: 280,
      maxWidth: 280,
    },
  },
];

const selectmonths = [
  { mth: "January" },
  { mth: "February" },
  { mth: "March" },
  { mth: "April" },
  { mth: "May" },
  { mth: "June" },
  { mth: "July" },
  { mth: "August" },
  { mth: "September" },
  { mth: "October" },
  { mth: "November" },
  { mth: "December" },
];

const Payrun = () => {
  let history = useHistory();
  let date = new Date();
  let longMonth = date.toLocaleString("en-us", { month: "long" });

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [loadPaybatch, setLoadPaybatch] = useState(false);
  const { loadEmployees, employees } = useEmployeesContext();
  const { loadUnpaidExpenses, expenses, unpaidexpenses, updateExpense } =
    useExpensesContext();
  const { unpaiddailyallows, loadUnpaidDailyAllows, updateDailyAllowance } =
    useDailyAllowancesContext();
  const {
    addPayrun,
    getPayrun,
    payrun,
    payrun_loading,
    addPayslip,
    resetPayslipsData,
    singlebatch_payslip_loading,
    setPayslipPeriod,
  } = usePayslipsContext();
  const [input, setInput] = useRecoilState(payrunState);
  const [payrunId, setPayrunId] = useRecoilState(payrunIdState);
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState(false);
  const [errornoselect, setErrornoselect] = useState(false);
  const [isPayrunExist, setIsPayrunExist] = useState(false);

  useEffect(() => {
    if (!payrun_loading) {
      setLoadPaybatch(false);
    }
  }, [loadPaybatch]);

  function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString("en-GB", options);
  }

  function formatPayrun() {
    const yy =
      input.fromdate.substring(0, 4) + "-" + input.fromdate.substring(5, 7);
    const mm = input.fromdate.substring(5, 7);
    const d = input.fromdate;
  }

  const payrunExists = (data) => {
    return payrun.some(function (el) {
      return el.payrun === data;
    });
  };
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handlePayrunSubmit = (e) => {
    e.preventDefault();
    setPayrunId("");
    var count = employees.reduce((acc, r) => {
      if (r.tableData.checked) {
        return acc + 1;
      } else {
        return acc;
      }
    }, 0);
    //console.log("count", count);
    if (count === 0) {
      setErrornoselect(true);
      setTimeout(() => {
        setErrornoselect(false);
      }, 3000);
      return null;
    }

    const period =
      formatDate(input.fromdate) + " - " + formatDate(input.todate);
    const payrundata =
      input.fromdate.substring(0, 4) + "-" + input.fromdate.substring(5, 7);
    setInput({ ...input, period: period, payrun: payrundata });
    formatPayrun();
    setPayslipPeriod(payrundata);
    const isExist = payrunExists(payrundata);

    if (isExist) {
      //console.log("exist");
      setIsPayrunExist(true);
      setAlert(true);
    } else {
      //console.log("add");
      add_Payrun(period, payrundata);
      checkSelectedEmployees(period, payrundata);
      setIsPayrunExist(false);
      setAlert(true);
      setLoadPaybatch(true);
    }
  };

  const checkSelectedEmployees = (period, payrun) => {
    //console.log("payrun", payrun, period);
    resetPayslipsData();
    employees &&
      employees.forEach((emp, index) => {
        if (emp.tableData.checked) {
          let exp = 0;
          if (unpaidexpenses) {
            unpaidexpenses
              .filter((r) => r.empid === emp.id)
              .map((i) => {
                updateExpense({ id: i.id, payrun: payrun });
                return (exp = exp + i.amount);
              });
          }
          let allows = 0;
          if (unpaiddailyallows) {
            unpaiddailyallows
              .filter((r) => r.empid === emp.id)
              .map((i) => {
                updateDailyAllowance({ id: i.id, payrun: payrun });
                return (allows = allows + i.amount);
              });
          }

          const {
            id,
            name,
            bank_name,
            bank_acno,
            basic_salary,
            tap_acno,
            scp_acno,
          } = emp;
          const tmptotalallows = allows + exp;
          const tmptotalTAP = Math.ceil(basic_salary * 0.05);
          const tmptotalSCP =
            Math.round((basic_salary + Number.EPSILON) * 0.035 * 100) / 100;
          const tmpnettpay =
            basic_salary + tmptotalallows - tmptotalTAP - tmptotalSCP;
          const data = {
            name: name,
            period: period,
            pay_date: input.pay_date,
            payrun: payrun,
            wages: basic_salary,
            nett_pay: tmpnettpay,
            bank_name: bank_name,
            bank_acno: bank_acno,
            tap_acno: tap_acno,
            tap_amount: tmptotalTAP,
            scp_acno: scp_acno,
            scp_amount: tmptotalSCP,
            total_allowances: tmptotalallows,
            total_deductions: 0,
            empid: id,
            status: "Pending",
            allows_type1: "Site Allowances",
            allows_type1amt: allows,
            allows_type2: "Expenses Claims",
            allows_type2amt: exp,
            allows_type3: " ",
            allows_type3amt: 0,
            allows_type4: " ",
            allows_type4amt: 0,
            allows_type5: " ",
            allows_type5amt: 0,
            allows_type6: " ",
            allows_type6amt: 0,
            allows_type7: " ",
            allows_type7amt: 0,
            allows_type8: " ",
            allows_type8amt: 0,
            deducts_type1: " ",
            deducts_type1amt: 0,
            deducts_type2: " ",
            deducts_type2amt: 0,
            deducts_type3: " ",
            deducts_type3amt: 0,
            deducts_type4: " ",
            deducts_type4amt: 0,
            deducts_type5: " ",
            deducts_type5amt: 0,
            deducts_type6: " ",
            deducts_type6amt: 0,
            deducts_type7: " ",
            deducts_type7amt: 0,
            deducts_type8: " ",
            deducts_type8amt: 0,
          };
          addPayslip({ ...data });
        }
      });
  };

  const handleNext = () => {
    history.push("/payrunbatch");
  };

  const add_Payrun = (period, payrun) => {
    //update payrun
    addPayrun({
      pay_freq: input.payfreq,
      from_date: input.fromdate,
      to_date: input.todate,
      pay_date: input.paydate,
      period: period,
      payrun: payrun,
      status: "Pending",
    });
    getPayrun();
  };

  useEffect(() => {
    loadEmployees();
    loadUnpaidExpenses();
    loadUnpaidDailyAllows();
    getPayrun();
  }, []);

  // useEffect(() => {
  //   loadUnpaidDailyAllows();
  // }, []);

  // useEffect(() => {
  //   console.log("useEffect here", input.payrun);

  //   // getSingleBatchPayslip(input.payrun);
  //   if (singlebatchpayslip) {
  //     checkSelectedEmployees(input.period, input.payrun);
  //     setLoadPaybatch(false);
  //   }
  // }, [loadPaybatch]);

  //   useEffect(() => {
  //     if (input.period && input.payrun) {
  //       //add_Payrun();

  //       setAlert(true);
  //     }
  //   }, [input]);

  return (
    <Paper className={fixedHeightPaper} style={{ backgroundColor: "black" }}>
      <section className={classes.section}>
        <Grid
          direction="row"
          container
          spacing={1}
          // style={{ border: "1px solid white" }}
        >
          <Grid
            container
            item
            sm={3}
            style={{ border: "1px solid white" }}
            direction="column"
            align="left"
          >
            <article className={classes.jobinfo}>
              <h2>Pay Run</h2>
              <form onSubmit={handlePayrunSubmit}>
                <div>
                  {/* <InputLabel
                    htmlFor="deduct-customized-native-simple"
                    className={classes.formLabel}
                  >
                    Copy From
                  </InputLabel>
                  <NativeSelect
                    name="copyfrom"
                    value={"New"}
                    style={{
                      padding: 4,
                      marginLeft: 5,
                      width: "100%",
                      textAlign: "left",
                    }}
                    onChange={(e) => handleChange(e)}
                  >
                    <option value="">New</option>
                    {payrun.map((row) => {
                      return (
                        <option key={row.id} value={row.payrun}>
                          {row.payrun}
                        </option>
                      );
                    })}
                  </NativeSelect> */}
                </div>
                <div>
                  <TextField
                    label="Pay Frequency"
                    variant="filled"
                    required
                    defaultValue="Monthly"
                    style={{ width: "100%" }}
                    name="payfreq"
                    value={input.payfreq}
                    onChange={(e) => handleChange(e)}
                    // select
                  >
                    {/* <MenuItem value="Weekly">Weekly</MenuItem> */}
                    {/* <MenuItem value="Monthly">Monthly</MenuItem> */}
                  </TextField>
                </div>
                {/* <div>
                  <InputLabel
                    htmlFor="deduct-customized-native-simple"
                    className={classes.formLabel}
                  >
                    Month
                  </InputLabel>
                  <NativeSelect
                    name="selectmonth"
                    defaultValue={longMonth}
                    // value={input.selectmonth}
                    style={{
                      padding: 4,
                      marginLeft: 5,
                      width: "100%",
                      textAlign: "left",
                    }}
                    onChange={(e) => handleChange(e)}
                  >
                    {selectmonths.map((row, i) => {
                      return (
                        <option key={i} value={row.mth}>
                          {row.mth}
                        </option>
                      );
                    })}
                  </NativeSelect>
                </div> */}
                <div>
                  <TextField
                    label="From Date"
                    variant="filled"
                    name="fromdate"
                    type="date"
                    value={input.fromdate}
                    required
                    style={{ width: "100%" }}
                    onChange={(e) => handleChange(e)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
                <div>
                  <TextField
                    label="To Date"
                    variant="filled"
                    type="date"
                    name="todate"
                    value={input.todate}
                    required
                    onChange={(e) => handleChange(e)}
                    style={{ width: "100%" }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
                <div>
                  <TextField
                    label="Payment Date"
                    variant="filled"
                    type="date"
                    name="paydate"
                    value={input.paydate}
                    required
                    style={{ width: "100%" }}
                    onChange={(e) => handleChange(e)}
                    InputLabelProps={{
                      shrink: true,
                    }}
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
                  {alert && !isPayrunExist && (
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={handleNext}
                    >
                      Next <Icon className={classes.rightIcon}>send</Icon>
                    </Button>
                  )}
                </div>
                <div>
                  {alert && !isPayrunExist && !singlebatch_payslip_loading && (
                    <h3>New Payrun being added!</h3>
                  )}
                  {alert && isPayrunExist && (
                    <h3>This payrun already existed!</h3>
                  )}
                </div>
                <div>
                  {error && <h3>This Payrun period already existed!</h3>}
                  {errornoselect && <h3>You must select employees!</h3>}
                </div>
              </form>
            </article>
          </Grid>
          <Divider
            orientation="vertical"
            flexItem
            style={{ background: "white" }}
          />
          <Grid
            container
            item
            sm={3}
            style={{ border: "1px solid white" }}
            align="right"
          >
            <MaterialTable
              columns={columns}
              data={employees}
              title="Payrun History"
              options={{
                filtering: false,
                search: false,
                toolbar: false,
                selection: true,
                headerStyle: {
                  backgroundColor: "orange",
                  color: "primary",
                },
                showTitle: false,
              }}
            />
          </Grid>
        </Grid>
      </section>
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
    marginTop: 5,
  },
}));

export default Payrun;
