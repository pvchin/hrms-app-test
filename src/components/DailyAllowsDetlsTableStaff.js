import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import MaterialTable, { MTableToolbar } from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Icon, Grid, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  loginLevelState,
  allowsDataState,
  allowsDataDetlsState,
  empidState,
  allowsPeriodState,
  allowsDataIdState,
} from "./data/atomdata";
import { useDailyAllowancesContext } from "../context/dailyallowances_context";
import { useDailyAllowsDetls } from "./dailyallowsdetls/useDailyAllowsDetls"
import { useAddDailyAllowsDetls } from "./dailyallowsdetls/useAddDailyAllowsDetls";
import { useUpdateDailyAllowsDetls } from "./dailyallowsdetls/useUpdateDailyAllowsDetls";
import { useDeleteDailyAllowsDetls } from "./dailyallowsdetls/useDeleteDailyAllowsDetls";

const columns = [
  {
    title: "Date",
    field: "date",
    type: "date",
    dateSetting: { locale: "en-GB" },
    // editable: "never",
    cellStyle: {
      width: 120,
      maxWidth: 120,
    },
    editComponent: (props) => (
      <TextField
        defaultValue={props.value || null}
        onChange={(e) => props.onChange(e.target.value)}
        type="date"
      />
    ),
  },
  { title: "District", field: "district" },
  { title: "Operation Type", field: "typeoperation" },
  { title: "Client", field: "client" },
  { title: "Location/Rig", field: "location" },
  { title: "Ticket No/Job No", field: "jobno" },
  { title: "Crew Operation", field: "crewoperation" },
  {
    title: "Job Bonus",
    field: "jobbonus",
    type: "currency",
    cellStyle: {
      width: 8,
      maxWidth: 8,
    },
    headerStyle: {
      width: 8,
      maxWidth: 8,
    },
  },
  {
    title: "Per Diem",
    field: "perdiem",
    type: "currency",
    cellStyle: {
      width: 8,
      maxWidth: 8,
    },
    headerStyle: {
      width: 8,
      maxWidth: 8,
    },
  },
  { title: "Delete", field: "isdelete", type: "boolean" },
];

export default function DailyAllowsDetlsTableStaff() {
  let history = useHistory();
  const classes = useStyles();
  //const { dailyallowsdetls } = useDailyAllowsDetls()
  const addDailyAllowsDetls = useAddDailyAllowsDetls()
  const updateDailyAllowsDetls = useUpdateDailyAllowsDetls();
  const deleteDailyAllowsDetls = useDeleteDailyAllowsDetls();

  // const [allowsDetlsTable, setAllowsDetlsTable] =
  // useRecoilState(allowsDataDetlsState);
  //console.log("detlstable", );
  //const [allowsDetlsdata, setAllowsDetilsdata] = useRecoilStateLoadable(fetchDailyAllowsDetlsSelector);
  const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);
  const [allowsDetlsdata, setAllowsDetlsdata] =
    useRecoilState(allowsDataDetlsState);
  const allows_period = useRecoilValue(allowsPeriodState);
  const allows_empid = useRecoilValue(empidState);
  const [allowsdata, setAllowsdata] = useRecoilState(allowsDataState);
  const [allowsdataId, setAllowsdataId] = useState(allowsDataIdState);
  const [tabledeldata, setTableDelData] = useState({});
  const [totals, setTotals] = useState({
    totaldays: 0,
    totalamount: 0,
    totalbonus: 0,
    totaldiem: 0,
  });
  const [alert, setAlert] = useState(false);
  const {
    dailyallowances,
    dailyallowsdetls,
    loadEmpDailyAllowsDetls,
    updateDailyAllowance,
    updateDailyAllowsDetl,
    deleteDailyAllowsDetl,
    dailyallowsdetl_loading,
    dailyallowsdetl_error,
  } = useDailyAllowancesContext();

  // useEffect(() => {
  //   console.log("useeffect load detls")
  //   getSingleBatchDailyAllowsDetl(allows_empid, allows_period);
  // }, [allows_period]);

  // useEffect(() => {
  //   loadEmpDailyAllowsDetls(empid, period);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    //calc
    handle_calc();
  }, [dailyallowsdetls]);

  const update_AllowsDetls = (data, index) => {
    const recdata = dailyallowsdetls.filter((r) => r.tableData.id === index);
    recdata[0].typeoperation = data.typeoperation;
    recdata[0].client = data.client;
    recdata[0].district = data.district;
    recdata[0].location = data.location;
    recdata[0].jobno = data.jobno;
    recdata[0].crewoperation = data.crewoperation;
    recdata[0].jobbonus = data.jobbonus;
    recdata[0].perdiem = data.perdiem;
    //calc
    handle_calc();
  };

  const save_AllowsDetls = (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-lone-blocks
    {
      dailyallowsdetls.forEach((rec) => {
        const { id, rec_id, tableData, ...fields } = rec;
        updateDailyAllowsDetl({ id, ...fields });
      });
    }

    //save allows data details
    const { id } = allowsdata;
    updateDailyAllowance({
      id: id,
      ...allowsdata,
      no_of_days: totals.totaldays,
      amount: totals.totalamount,
    });
    const dailydata = dailyallowances.filter((r) => r.id === id);

    dailydata[0].no_of_days = totals.totaldays;
    dailydata[0].amount = totals.totalamount;
    console.log("daily detils update", dailydata, dailyallowances);
    setAlert(true);
  };

  const delete_AllowsDetls = (data, index) => {
    dailyallowsdetls.forEach((rec) => {
      if (rec.tableData.checked) {
        deleteDailyAllowsDetl(rec.id);
      }
    });
    loadEmpDailyAllowsDetls(allows_empid, allows_period);
  };

  // const delete_AllowsDetls = () => {
  //   dailyallowsdetls.forEach((rec, index) => {
  //     if (rec.tableData.checked) {
  //       const recdata = dailyallowsdetls[index];
  //       recdata.isdelete = true;
  //       setTableDelData(prevState => ({
  //         tabledeldata: [...prevState, recdata]
  //       }))
  //       console.log("delete detls", tabledeldata)
  //       //deleteDailyAllowsDetl(rec.id);
  //     }
  //   });
  //   console.log("delete allowsdetls", dailyallowsdetls);
  // };

  const handle_refresh = () => {
    //  getSingleBatchDailyAllowsDetl(allows_empid, allows_period);
  };

  const handle_calc = () => {
    const totbonus = dailyallowsdetls.reduce((acc, item) => {
      return acc + item.jobbonus;
    }, 0);
    const totdiem = dailyallowsdetls.reduce((acc, item) => {
      return acc + item.perdiem;
    }, 0);
    const totdays = dailyallowsdetls.reduce((acc, item) => {
      return acc + 1;
    }, 0);
    const total = totbonus + totdiem;
    setTotals({
      totalamount: total,
      totalbonus: totbonus,
      totaldiem: totdiem,
      totaldays: totdays,
    });
  };

  // const add_DailyAllowsDetl = async (data) => {
  //   console.log("add", data);
  //   const { description, amount } = data;
  //   addDailyAllowsDetl({
  //     description: description,
  //     amount: amount,
  //     name: single_dailyallowance.name,
  //     empid: single_dailyallowance.empid,
  //     period: dailyallowance_period,
  //   });
  // };

  // const delete_DailyAllowance = (data) => {
  //   const { id } = data;
  //   deleteDailyAllowsDetl(id);
  //   //update_Daily Allowances Details;
  //   getSingleBatchDailyAllowsDetl(
  //     single_dailyallowance.empid,
  //     dailyallowance_period
  //   );
  // };

  if (dailyallowsdetl_loading) {
    return (
      <div>
        <h2>Loading.... daily site allowances</h2>
      </div>
    );
  }
  if (dailyallowsdetl_error) {
    return (
      <div>
        <h2>Internet connection problem!</h2>
      </div>
    );
  }
  if (!dailyallowsdetl_loading) {
    //  setAllowsDetlsdata(dailyallowsdetls);

    // console.log("load allows detls", allowsDetlsdata);
    return (
      <div className={classes.root}>
        {/* <h1>Expenses Claims Application</h1> */}

        <div style={{ maxWidth: "75%", paddingTop: "5px" }}>
          <h2>Allows Detils Table</h2>
          <MaterialTable
            columns={columns}
            data={dailyallowsdetls.filter(
              (item) => item.empid === loginLevel.loginUserId && !item.isdelete
            )}
            title="Daily Allowances Details"
            editable={{
              onRowAdd: (newData) =>
                new Promise((resolve, reject) => {
                  // setTimeout(() => {
                  //   setAllowsdata([...allowsdata, newData]);
                  //   resolve();
                  // }, 1000);
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const dataUpdate = [...dailyallowsdetls];
                    const index = oldData.tableData.id;
                    dataUpdate[index] = newData;
                    update_AllowsDetls(newData, index);
                    //setAllowsDetlsTable([...dataUpdate]);
                    //editable = dataUpdate;
                    resolve();
                  }, 1000);
                }),
              // onRowDelete: (oldData) =>
              //   new Promise((resolve, reject) => {
              //     setTimeout(() => {
              //       //const dataDelete = [...allowsDetlsTable];
              //       const index = oldData.tableData.id;
              //       //dataDelete.splice(index, 1);
              //       //setAllowsDetlsTable([...dataDelete]);

              //       resolve();
              //     }, 1000);
              //   }),
            }}
            options={{
              filtering: true,
              selection: true,
               pageSize:10,
              headerStyle: {
                backgroundColor: "orange",
                color: "primary",
              },
              showTitle: true,
            }}
            components={{
              Toolbar: (props) => (
                <div>
                  <MTableToolbar {...props} />
                  <div style={{ padding: "5px 10px" }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      onClick={(e) => delete_AllowsDetls(e)}
                    >
                      delete
                    </Button>
                    {/* <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={(e) => handle_refresh(e)}
                  >
                    re-fresh
                  </Button> */}
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      onClick={(e) => handle_calc(e)}
                    >
                      re-calc
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      onClick={(e) => save_AllowsDetls(e)}
                    >
                      Update all <Icon className={classes.rightIcon}>send</Icon>
                    </Button>
                    {alert && (
                      <Alert severity="success" onClose={() => setAlert(false)}>
                        Changes being saved!
                      </Alert>
                    )}
                    <div>
                      <Grid
                        container
                        spacing={0}
                        direction="row"
                        alignItems="left"
                        //justify="left"
                        style={{ border: "1px solid white" }}
                      >
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <TextField
                            label="Total Job Bonus"
                            variant="filled"
                            style={{ width: "100%" }}
                            name="totalbonus"
                            value={totals.totalbonus}
                            type="currency"
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          ></TextField>
                          <TextField
                            label="Total Diem"
                            variant="filled"
                            style={{ width: "100%" }}
                            name="totaldiem"
                            value={totals.totaldiem}
                            type="currency"
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          ></TextField>

                          <TextField
                            label="No of Days"
                            variant="filled"
                            style={{ width: "100%" }}
                            name="totaldays"
                            value={totals.totaldays}
                            type="numeric"
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          ></TextField>
                          <TextField
                            label="Total Amount"
                            variant="filled"
                            style={{ width: "100%" }}
                            name="totalamount"
                            value={totals.totalamount}
                            type="currency"
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          ></TextField>
                        </div>
                      </Grid>
                    </div>
                  </div>
                </div>
              ),
            }}
          />
        </div>
      </div>
    );
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    width: 1500,
  },
  button: {
    margin: theme.spacing(1),
  },
}));
