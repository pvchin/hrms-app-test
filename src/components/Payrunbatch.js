import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Heading, Text} from "@chakra-ui/react"
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Paper,
  Grid,
  Icon,
  Divider,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import PayForm from "./PayForm";
import PaySummary from "./PaySummary";
import { usePayslipsContext } from "../context/payslips_context";
import { useTablesContext } from "../context/tables_context";
import { useSetRecoilState, useRecoilState } from "recoil";
import {
  payrunState,
  paydataState,
  payrunIdState,
  payrunStatusState,
} from "./data/atomdata";
import { useRecoilValue } from "recoil";

const drawerWidth = 240;

const Payrunbatch = () => {
  let history = useHistory();
  const classes = useStyles();
  const componentRef = useRef();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  //const { register, handleSubmit, control, setValue, reset, watch } = useForm();

  const {
    payrun,
    getSingleBatchPayslip,
    singlebatchpayslip,
    payslip_period,
    updatePayslip,
    updatePayrun,
    singlebatch_payslip_loading,
    singlebatch_payslip_error,
  } = usePayslipsContext();
  const { loadPayitems, payitems } = useTablesContext();
  const payrundata = useRecoilValue(payrunState);
  const [payrunId, setPayrunId] = useRecoilState(payrunIdState);
  const [payrunstatus, setPayrunStatus] = useRecoilState(payrunStatusState);
  const [loadFormdata, setLoadFormdata] = useState(false);
  const [loadUpdatedata, setLoadUpdatedata] = useState(false);
  const [formdata, setFormdata] = useState([]);
  const [rowindex, setRowIndex] = useState(0);
  const [showSumm, setShowSumm] = useState(false);
  const [showSaveAlert, setShowSaveAlert] = useState(false);
  const [showVerifyAlert, setShowVerifyAlert] = useState(false);
  const [isCalc, setIsCalc] = useState(false);

  useEffect(() => {
    loadPayitems();
    getSingleBatchPayslip(payslip_period);
  }, []);

  useEffect(() => {
    setLoadFormdata(false);
  }, [loadUpdatedata]);

  const handleShowSumm = (e) => {
    e.preventDefault();
    setShowSumm(!showSumm);
  };

  const handlePrintSummary = (e) => {
    e.preventDefault();
  };

  const handleSavePayslips = (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-lone-blocks
    {
      singlebatchpayslip.forEach((rec) => {
        const { id, rec_id, tableData, ...fields } = rec;
        updatePayslip({ id, ...fields });
      });
    }
    //update payrun
    handleSavePayrun();
    setShowSaveAlert(true);
    setTimeout(() => {
      setShowSaveAlert(false);
    }, 3000);
  };

  const handleSavePayrun = () => {
    // eslint-disable-next-line no-lone-blocks
    {
      payrun
        .filter((r) => r.payrun === payslip_period)
        .map((rec) => {
          //update payrun
          return updatePayrun({
            id: rec.id,
            totalpayroll: payrundata.totalpayroll,
            totalwages: payrundata.totalwages,
            totaltap: payrundata.totaltap,
            totalscp: payrundata.totalscp,
            totalallows: payrundata.totalallows,
            totaldeducts: payrundata.totaldeducts,
          });
        });
    }
  };

  const handleVerifyPayslips = (e) => {
    e.preventDefault();
    setPayrunStatus("Verified");
    updatePayrun({ id: payrunId, status: "Verified" });
    setShowVerifyAlert(true);
    setTimeout(() => {
      setShowVerifyAlert(false);
    }, 3000);
  };

  const handleEmpButtonClick = (index) => {
    const paydata = singlebatchpayslip[index];
    setFormdata({ ...paydata });
    setFormdata({ ...paydata });
    setIsCalc(true);
    setLoadFormdata(true);
  };

  if (singlebatch_payslip_loading) {
    return (
      <Paper className={fixedHeightPaper} style={{ backgroundColor: "black" }}>
        <div>
          <h2>Loading...Payslips</h2>
        </div>
      </Paper>
    );
  }

  if (singlebatch_payslip_error) {
    return (
      <Paper className={fixedHeightPaper} style={{ backgroundColor: "black" }}>
        <div>
          <h2>Internet connection problem!</h2>
        </div>
      </Paper>
    );
  }

  return (
    <Paper
      className={fixedHeightPaper}
      style={{ backgroundColor: "lightcyan" }}
    >
      <section className={classes.section}>
        <Grid container direction="row" style={{ border: "1px solid black" }}>
          <Grid
            item
            sm={2}
            align="center"
            style={{ border: "1px solid black" }}
          >
            <Heading as="h4" size="md">
              Employees
            </Heading>
          </Grid>
          <Grid item sm={10} style={{ border: "1px solid black" }}>
            <div
              style={{
                marginLeft: 14,
                display: "inline-flex",
                flexDirection: "row",
              }}
            >
              <div
                style={{
                  marginLeft: 14,
                  display: "inline-flex",
                  flexDirection: "row",
                }}
              >
                <Heading as="h4" size="md">
                  Payroll Details
                </Heading>
              </div>

              <div style={{ marginTop: 10, marginLeft: 20 }}>
                {showSaveAlert && (
                  <Alert severity="success">Changes have been saved!</Alert>
                )}
                {showVerifyAlert && (
                  <Alert severity="success">Payslips has been verified!</Alert>
                )}
              </div>
            </div>
          </Grid>
          <Grid
            item
            sm={2}
            align="center"
            style={{ border: "1px solid black" }}
          >
            <div>
              {singlebatchpayslip &&
                singlebatchpayslip.map((item, index) => {
                  return (
                    <div>
                      <Button
                        className={classes.empbtn}
                        // ${index === value && "activebtn"}
                        onClick={(e) => {
                          setRowIndex(index);
                          handleEmpButtonClick(index);
                        }}
                      >
                        <div key={item.id}> {item.name}</div>
                      </Button>
                      <Divider
                        variant="fullWidth"
                        className={classes.divider}
                      />
                    </div>
                  );
                })}
            </div>
          </Grid>
          <Grid
            item
            sm={10}
            align="center"
            style={{ border: "1px solid black" }}
          >
            <Grid
              container
              direction="row"
              style={{ border: "1px solid black" }}
            >
              <Grid
                item
                sm={12}
                align="left"
                style={{ border: "1px solid black" }}
              >
                <div style={{ padding: 5 }}>
                  <ButtonGroup
                    color="primary"
                    aria-label="outlined primary button group"
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={(e) => handleShowSumm(e)}
                      style={{ marginLeft: 10 }}
                    >
                      Details <Icon className={classes.rightIcon}>send</Icon>
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={(e) => handleShowSumm(e)}
                      className={classes.button}
                      style={{ marginLeft: 10 }}
                    >
                      Summary <Icon className={classes.rightIcon}>send</Icon>
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      style={{ marginLeft: 5 }}
                      onClick={(e) => handleSavePayslips(e)}
                    >
                      Save <Icon className={classes.rightIcon}>send</Icon>
                    </Button>
                    {/* <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      style={{ marginLeft: 5 }}
                      onClick={(e) => handlePrintSummary(e)}
                    >
                      Print <Icon className={classes.rightIcon}>send</Icon>
                    </Button> */}
                    {payrunId && (
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        style={{ marginLeft: 5 }}
                        onClick={(e) => handleVerifyPayslips(e)}
                      >
                        Verify <Icon className={classes.rightIcon}>send</Icon>
                      </Button>
                    )}
                  </ButtonGroup>
                </div>
              </Grid>
            </Grid>
            {!showSumm && (
              <PayForm
                formdata={formdata}
                setFormdata={setFormdata}
                loadFormdata={loadFormdata}
                setLoadFormdata={setLoadFormdata}
                payitems={payitems}
                setLoadUpdatedata={setLoadUpdatedata}
                rowindex={rowindex}
                isCalc={isCalc}
                setIsCalc={setIsCalc}
              />
            )}
            {showSumm && (
              <PaySummary
                payrundata={payrundata}
                singlebatchpayslip={singlebatchpayslip}
              />
            )}
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
    paddingTop: theme.spacing(10),
    // display: "flex",
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    border: "1px solid",
    width: "100%",
    color: "primary",
    bcakgroundColor: "white",
  },
  card: {
    backgroundColor: "white",
  },
  section: {
    width: "80vw",
    margin: "1rem auto",
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
  empscenter: {
    width: "80vw",
    margin: "0 auto",
    maxWidth: "var(--max-width)",
    flexDirection: "row",
  },
  empcontainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: "4rem",
    flexWrap: "wrap",
  },
  empbtn: {
    background: "transparent",
    borderColor: "transparent",
    textTransform: "capitalize",
    fontSize: "1rem",
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
  empinfo: {
    fontWeight: "400",
  },
  divider: {
    // Theme Color, or use css color in quote
    background: "white",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 350,
  },
}));

export default Payrunbatch;
