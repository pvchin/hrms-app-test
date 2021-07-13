import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import { Controller, useForm } from "react-hook-form";
import clsx from "clsx";
import axios from "axios";
import { useAsync } from "react-async";
import { useHistory } from "react-router-dom";
import {
  Button,
  Checkbox,
  Paper,
  Grid,
  Divider,
  TextField,
  MenuItem,
  ListSubheader,
} from "@material-ui/core";
import { employees_url } from "../utils/constants";
import { useEmployeesContext } from "../context/employees_context";
import {
  usePayslipsContext,
  updatePayslipsData,
} from "../context/payslips_context";
import { useTablesContext } from "../context/tables_context";
import { payrunState, paydataState } from "./data/atomdata";
import { useRecoilValue } from "recoil";

const drawerWidth = 240;
const url = "https://course-api.com/react-tabs-project";

// const loadEmp = async () =>
//   await fetch(employees_url)
//     .then((res) => (res.ok ? res : Promise.reject(res)))
//     .then((res) => res.json());

// const loadEmp = async () => {
//   const { data } = await axios.get(employees_url);
//   return data;
// };

const formdata_initial = [
  {
    empid: "",
    empname: "",
    wages: 0,
    tapamount: 0,
    scpamount: 0,
    allowances: 0,
    deductions: 0,
    nettpay: 0,
    rowindex: 0,
    payitem1: "",
    payitem1amt: 0,
    payitem2: "",
    payitem2amt: 0,
    payitem3: "",
    payitem3amt: 0,
    payitem4: "",
    payitem4amt: 0,
    payitem5: "",
    payitem5amt: 0,
    payitem6: "",
    payitem6amt: 0,
    payitem7: "",
    payitem7amt: 0,
    payitem8: "",
    payitem8amt: 0,
  },
];

const Payrunbatch = () => {
  let history = useHistory();
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const { register, handleSubmit, control } = useForm();
  const { payslipsdata, setPayslipsData } = usePayslipsContext();
  const { loadPayitems, payitems, payitems_loading, payitems_loading_error } =
    useTablesContext();
  //const [payitemsdata] = useRecoilState(paydataState);
  const payrundata = useRecoilValue(payrunState);
  const [loadFormdata, setLoadFormdata] = useState(false);
  const [formdata, setFormdata] = useState([]);
  const [rowindex, setRowIndex] = useState(0);

  const handleButtonClick = (item, index) => {
    const { id, name, basic_pay } = item;
    const newData = {
      empid: id,
      name: name,
      basic_pay: basic_pay,
      rowindex: index,
    };
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        update_Paydata(newData);
        resolve();
      }, 1000);
    });

    console.log("addpaydata", payslipsdata);
  };

  useEffect(() => {
    loadPayitems();
  }, []);

  const Update_Formdata = () => {
    setFormdata({
      empid: payslipsdata.pay[rowindex][0].empid,
      empname: payslipsdata.pay[rowindex][0].empname,
      basic_salary: payslipsdata.pay[rowindex][0].basic_salary,
      wages: payslipsdata.pay[rowindex][0].wages,
      tapamount: payslipsdata.pay[rowindex][0].tapamount,
      scpamount: payslipsdata.pay[rowindex][0].scpamount,
      allowances: payslipsdata.pay[rowindex][0].allowances,
      deductions: payslipsdata.pay[rowindex][0].deductions,
      nettpay: payslipsdata.pay[rowindex][0].nettpay,
      payitem1: payslipsdata.pay[rowindex][0].payitem1,
      payitem1amt: payslipsdata.pay[rowindex][0].payitem1amt,
      payitem2: payslipsdata.pay[rowindex][0].payitem2,
      payitem2amt: payslipsdata.pay[rowindex][0].payitem2amt,
      payitem3: payslipsdata.pay[rowindex][0].payitem3,
      payitem3amt: payslipsdata.pay[rowindex][0].payitem3amt,
      payitem4: payslipsdata.pay[rowindex][0].payitem4,
      payitem4amt: payslipsdata.pay[rowindex][0].payitem4amt,
      payitem5: payslipsdata.pay[rowindex][0].payitem5,
      payitem5amt: payslipsdata.pay[rowindex][0].payitem5amt,
      payitem6: payslipsdata.pay[rowindex][0].payitem6,
      payitem6amt: payslipsdata.pay[rowindex][0].payitem6amt,
      payitem7: payslipsdata.pay[rowindex][0].payitem7,
      payitem7amt: payslipsdata.pay[rowindex][0].payitem7amt,
      payitem8: payslipsdata.pay[rowindex][0].payitem8,
      payitem8amt: payslipsdata.pay[rowindex][0].payitem8amt,
    });
  };

  const update_Paydata = (newData) => {
    console.log("newdata", newData);
    const datapay = payslipsdata.pay[rowindex];
    const dataUpdate = [...datapay];
    dataUpdate[rowindex][0].empname = formdata.empname;
    console.log("dataupdate", dataUpdate);
    //setData([...dataUpdate]);
  };

  const onListChange = (newList) => {
    setPayslipsData(newList);
    console.log("list", payslipsdata, newList);
  };

  const onFormSubmit = (data) => {
    console.log("onsubmit", data);
    Update_Formdata();
  };

  const handleEmpButtonClick = (index) => {
    console.log("Empbutton");
    update_Paydata();
    Update_Formdata();
  };

  const handleFormChange = (e) => {
    console.log("update form", formdata);
    console.log(e.target.name, e.target.value);
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const UpdateButton = () => {
    let newArray = payslipsdata.pay;
    newArray[rowindex][0].empname = "Test2";
    //   let newArray = payslipsdata[rowindex][0].empname;
    // newArray = "Todotest";
  };

  if (payitems_loading) {
    <div>
      <h2>Loading...payitems</h2>
    </div>;
  }

  if (payitems_loading_error) {
    history.push("/error");
  }

  if (!payslipsdata.pay) {
    <div>
      <h2>Loading...</h2>
    </div>;
  }

  if (!formdata.pay) {
    <div>
      <h2>Loading...</h2>
    </div>;
  }

  if (loadFormdata) {
    <div>
      <h2>Loading...</h2>
    </div>;
  }
  return (
    <Paper className={fixedHeightPaper} style={{ backgroundColor: "black" }}>
      <section className={classes.section}>
        <Grid
          direction="row"
          container
          spacing={1}
          style={{ border: "1px solid white" }}
        >
          <Grid
            item
            xs={6}
            sm={3}
            align="center"
            style={{ border: "1px solid white" }}
          >
            <h2>Employees</h2>
          </Grid>
          <Grid
            item
            xs={6}
            sm={3}
            align="center"
            style={{ border: "1px solid white" }}
          >
            <h2>Pay Items</h2>
          </Grid>
          <Grid
            item
            xs={6}
            sm={3}
            align="center"
            style={{ border: "1px solid white" }}
          >
            <h2>Amount</h2>
          </Grid>
          <Grid
            item
            xs={6}
            sm={3}
            align="center"
            style={{ border: "1px solid white" }}
          >
            <h2>Pay Details</h2>
          </Grid>
        </Grid>

        {/* employees column */}
        {/* <form onSubmit={handleSubmit(onFormSubmit)}></form> */}
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Grid
            direction="row"
            container
            spacing={1}
            style={{ border: "1px solid white" }}
          >
            <Grid
              item
              xs={6}
              sm={3}
              align="left"
              style={{ border: "1px solid white" }}
            >
              {payslipsdata.pay.map((items, index) => {
                return items.map((subItems, sIndex) => {
                  return (
                    <div>
                      <Button
                        key={index}
                        type="submit"
                        variant="contained"
                        onClick={(e) => {
                          setRowIndex(index);
                          handleEmpButtonClick();
                          //handleSubmit(onFormSubmit);
                        }}
                        className={`classes.jobbtn`}
                        // ${index === value && "activebtn"} `}
                      >
                        <h3>{subItems.empname}</h3>
                      </Button>
                    </div>
                  );
                });
              })}
              <button onClick={UpdateButton}>Update</button>
            </Grid>

            {/* payitems columns */}
            <Grid
              item
              xs={6}
              sm={3}
              align="left"
              style={{ border: "1px solid white" }}
            >
              <form>
                <ul>
                  <div>
                    <Controller
                      name="payitem1"
                      control={control}
                      defaultValue={payslipsdata.pay[rowindex][0].payitem1}
                      render={({ field: { onChange, value } }) => (
                        <TextField
                          variant="filled"
                          type="text"
                          value={value}
                          style={{ width: 180 }}
                          value={value}
                          onChange={onChange}
                          select
                        >
                          <ListSubheader>Wages</ListSubheader>
                          {payitems
                            .filter(function (item) {
                              return item.pay_type == "Wages";
                            })
                            .map((row) => {
                              return (
                                <MenuItem
                                  key={row.id}
                                  value={row.name}
                                  style={{ width: 180 }}
                                >
                                  {row.name}
                                </MenuItem>
                              );
                            })}
                          <ListSubheader>Allowances</ListSubheader>
                          {payitems
                            .filter(function (item) {
                              return item.pay_type == "Allowances";
                            })
                            .map((row) => {
                              return (
                                <MenuItem key={row.id} value={row.name}>
                                  {row.name}
                                </MenuItem>
                              );
                            })}
                          <ListSubheader>Deductions</ListSubheader>
                          {payitems
                            .filter(function (item) {
                              return item.pay_type == "Deductions";
                            })
                            .map((row) => {
                              return (
                                <MenuItem key={row.id} value={row.name}>
                                  {row.name}
                                </MenuItem>
                              );
                            })}
                        </TextField>
                      )}
                    />
                  </div>
                  <div>
                    <Controller
                      name="payitem2"
                      control={control}
                      defaultValue={payslipsdata.pay[rowindex][0].payitem2}
                      render={({ field: { onChange, value } }) => (
                        <TextField
                          variant="filled"
                          type="text"
                          value={value}
                          style={{ width: 180 }}
                          value={value}
                          onChange={onChange}
                          select
                        >
                          <ListSubheader>Wages</ListSubheader>
                          {payitems
                            .filter(function (item) {
                              return item.pay_type == "Wages";
                            })
                            .map((row) => {
                              return (
                                <MenuItem
                                  key={row.id}
                                  value={row.name}
                                  style={{ width: 180 }}
                                >
                                  {row.name}
                                </MenuItem>
                              );
                            })}
                          <ListSubheader>Allowances</ListSubheader>
                          {payitems
                            .filter(function (item) {
                              return item.pay_type == "Allowances";
                            })
                            .map((row) => {
                              return (
                                <MenuItem key={row.id} value={row.name}>
                                  {row.name}
                                </MenuItem>
                              );
                            })}
                          <ListSubheader>Deductions</ListSubheader>
                          {payitems
                            .filter(function (item) {
                              return item.pay_type == "Deductions";
                            })
                            .map((row) => {
                              return (
                                <MenuItem key={row.id} value={row.name}>
                                  {row.name}
                                </MenuItem>
                              );
                            })}
                        </TextField>
                      )}
                    />
                  </div>
                  <div>
                    <Controller
                      name="payitem3"
                      control={control}
                      defaultValue={payslipsdata.pay[rowindex][0].payitem3}
                      render={({ field: { onChange, value } }) => (
                        <TextField
                          variant="filled"
                          type="text"
                          value={value}
                          style={{ width: 180 }}
                          value={value}
                          onChange={onChange}
                          select
                        >
                          <ListSubheader>Wages</ListSubheader>
                          {payitems
                            .filter(function (item) {
                              return item.pay_type == "Wages";
                            })
                            .map((row) => {
                              return (
                                <MenuItem
                                  key={row.id}
                                  value={row.name}
                                  style={{ width: 180 }}
                                >
                                  {row.name}
                                </MenuItem>
                              );
                            })}
                          <ListSubheader>Allowances</ListSubheader>
                          {payitems
                            .filter(function (item) {
                              return item.pay_type == "Allowances";
                            })
                            .map((row) => {
                              return (
                                <MenuItem key={row.id} value={row.name}>
                                  {row.name}
                                </MenuItem>
                              );
                            })}
                          <ListSubheader>Deductions</ListSubheader>
                          {payitems
                            .filter(function (item) {
                              return item.pay_type == "Deductions";
                            })
                            .map((row) => {
                              return (
                                <MenuItem key={row.id} value={row.name}>
                                  {row.name}
                                </MenuItem>
                              );
                            })}
                        </TextField>
                      )}
                    />
                  </div>
                  <div>
                    <Controller
                      name="payitem4"
                      control={control}
                      defaultValue={payslipsdata.pay[rowindex][0].payitem4}
                      render={({ field: { onChange, value } }) => (
                        <TextField
                          variant="filled"
                          type="text"
                          value={value}
                          style={{ width: 180 }}
                          value={value}
                          onChange={onChange}
                          select
                        >
                          <ListSubheader>Wages</ListSubheader>
                          {payitems
                            .filter(function (item) {
                              return item.pay_type == "Wages";
                            })
                            .map((row) => {
                              return (
                                <MenuItem
                                  key={row.id}
                                  value={row.name}
                                  style={{ width: 180 }}
                                >
                                  {row.name}
                                </MenuItem>
                              );
                            })}
                          <ListSubheader>Allowances</ListSubheader>
                          {payitems
                            .filter(function (item) {
                              return item.pay_type == "Allowances";
                            })
                            .map((row) => {
                              return (
                                <MenuItem key={row.id} value={row.name}>
                                  {row.name}
                                </MenuItem>
                              );
                            })}
                          <ListSubheader>Deductions</ListSubheader>
                          {payitems
                            .filter(function (item) {
                              return item.pay_type == "Deductions";
                            })
                            .map((row) => {
                              return (
                                <MenuItem key={row.id} value={row.name}>
                                  {row.name}
                                </MenuItem>
                              );
                            })}
                        </TextField>
                      )}
                    />
                  </div>
                  <div>
                    <Controller
                      name="payitem5"
                      control={control}
                      defaultValue={payslipsdata.pay[rowindex][0].payitem5}
                      render={({ field: { onChange, value } }) => (
                        <TextField
                          variant="filled"
                          type="text"
                          value={value}
                          style={{ width: 180 }}
                          value={value}
                          onChange={onChange}
                          select
                        >
                          <ListSubheader>Wages</ListSubheader>
                          {payitems
                            .filter(function (item) {
                              return item.pay_type == "Wages";
                            })
                            .map((row) => {
                              return (
                                <MenuItem
                                  key={row.id}
                                  value={row.name}
                                  style={{ width: 180 }}
                                >
                                  {row.name}
                                </MenuItem>
                              );
                            })}
                          <ListSubheader>Allowances</ListSubheader>
                          {payitems
                            .filter(function (item) {
                              return item.pay_type == "Allowances";
                            })
                            .map((row) => {
                              return (
                                <MenuItem key={row.id} value={row.name}>
                                  {row.name}
                                </MenuItem>
                              );
                            })}
                          <ListSubheader>Deductions</ListSubheader>
                          {payitems
                            .filter(function (item) {
                              return item.pay_type == "Deductions";
                            })
                            .map((row) => {
                              return (
                                <MenuItem key={row.id} value={row.name}>
                                  {row.name}
                                </MenuItem>
                              );
                            })}
                        </TextField>
                      )}
                    />
                  </div>
                  <div>
                    <Controller
                      name="payitem6"
                      control={control}
                      defaultValue={payslipsdata.pay[rowindex][0].payitem6}
                      render={({ field: { onChange, value } }) => (
                        <TextField
                          variant="filled"
                          type="text"
                          value={value}
                          style={{ width: 180 }}
                          value={value}
                          onChange={onChange}
                          select
                        >
                          <ListSubheader>Wages</ListSubheader>
                          {payitems
                            .filter(function (item) {
                              return item.pay_type == "Wages";
                            })
                            .map((row) => {
                              return (
                                <MenuItem
                                  key={row.id}
                                  value={row.name}
                                  style={{ width: 180 }}
                                >
                                  {row.name}
                                </MenuItem>
                              );
                            })}
                          <ListSubheader>Allowances</ListSubheader>
                          {payitems
                            .filter(function (item) {
                              return item.pay_type == "Allowances";
                            })
                            .map((row) => {
                              return (
                                <MenuItem key={row.id} value={row.name}>
                                  {row.name}
                                </MenuItem>
                              );
                            })}
                          <ListSubheader>Deductions</ListSubheader>
                          {payitems
                            .filter(function (item) {
                              return item.pay_type == "Deductions";
                            })
                            .map((row) => {
                              return (
                                <MenuItem key={row.id} value={row.name}>
                                  {row.name}
                                </MenuItem>
                              );
                            })}
                        </TextField>
                      )}
                    />
                  </div>
                  <div>
                    <Controller
                      name="payitem7"
                      control={control}
                      defaultValue={payslipsdata.pay[rowindex][0].payitem7}
                      render={({ field: { onChange, value } }) => (
                        <TextField
                          variant="filled"
                          type="text"
                          value={value}
                          style={{ width: 180 }}
                          value={value}
                          onChange={onChange}
                          select
                        >
                          <ListSubheader>Wages</ListSubheader>
                          {payitems
                            .filter(function (item) {
                              return item.pay_type == "Wages";
                            })
                            .map((row) => {
                              return (
                                <MenuItem
                                  key={row.id}
                                  value={row.name}
                                  style={{ width: 180 }}
                                >
                                  {row.name}
                                </MenuItem>
                              );
                            })}
                          <ListSubheader>Allowances</ListSubheader>
                          {payitems
                            .filter(function (item) {
                              return item.pay_type == "Allowances";
                            })
                            .map((row) => {
                              return (
                                <MenuItem key={row.id} value={row.name}>
                                  {row.name}
                                </MenuItem>
                              );
                            })}
                          <ListSubheader>Deductions</ListSubheader>
                          {payitems
                            .filter(function (item) {
                              return item.pay_type == "Deductions";
                            })
                            .map((row) => {
                              return (
                                <MenuItem key={row.id} value={row.name}>
                                  {row.name}
                                </MenuItem>
                              );
                            })}
                        </TextField>
                      )}
                    />
                  </div>
                  <div>
                    <Controller
                      name="payitem8"
                      control={control}
                      defaultValue={payslipsdata.pay[rowindex][0].payitem8}
                      render={({ field: { onChange, value } }) => (
                        <TextField
                          variant="filled"
                          type="text"
                          value={value}
                          style={{ width: 180 }}
                          value={value}
                          onChange={onChange}
                          select
                        >
                          <ListSubheader>Wages</ListSubheader>
                          {payitems
                            .filter(function (item) {
                              return item.pay_type == "Wages";
                            })
                            .map((row) => {
                              return (
                                <MenuItem
                                  key={row.id}
                                  value={row.name}
                                  style={{ width: 180 }}
                                >
                                  {row.name}
                                </MenuItem>
                              );
                            })}
                          <ListSubheader>Allowances</ListSubheader>
                          {payitems
                            .filter(function (item) {
                              return item.pay_type == "Allowances";
                            })
                            .map((row) => {
                              return (
                                <MenuItem key={row.id} value={row.name}>
                                  {row.name}
                                </MenuItem>
                              );
                            })}
                          <ListSubheader>Deductions</ListSubheader>
                          {payitems
                            .filter(function (item) {
                              return item.pay_type == "Deductions";
                            })
                            .map((row) => {
                              return (
                                <MenuItem key={row.id} value={row.name}>
                                  {row.name}
                                </MenuItem>
                              );
                            })}
                        </TextField>
                      )}
                    />
                  </div>
                </ul>
              </form>
            </Grid>
            {/* amount column */}
            <Grid
              item
              xs={6}
              sm={3}
              align="center"
              style={{ border: "1px solid white" }}
            >
              <ul>
                <div>
                  {/* <TextField
                    variant="filled"
                    type="currency"
                    ref={register}
                    style={{ width: 100 }}
                    defaultValue={payslipsdata.pay[rowindex][0].payitem1amt}
                    //value={value}
                    //onChange={onChange}
                  /> */}
                  {/* <Controller
                    name="payitem1amt"
                    control={control}
                    defaultValue={payslipsdata.pay[rowindex][0].payitem1amt}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        variant="filled"
                        type="currency"
                        style={{ width: 100 }}
                        defaultValue={payslipsdata.pay[rowindex][0].payitem1amt}
                        //value={value}
                        onChange={onChange}
                      />
                    )}
                  /> */}
                </div>
                <div>
                  <Controller
                    name="payitem2amt"
                    control={control}
                    defaultValue={payslipsdata.pay[rowindex][0].payitem2amt}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        variant="filled"
                        type="currency"
                        style={{ width: 100 }}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </div>
                <div>
                  <Controller
                    name="payitem3amt"
                    control={control}
                    defaultValue={payslipsdata.pay[rowindex][0].payitem3amt}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        variant="filled"
                        type="currency"
                        style={{ width: 100 }}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </div>
                <div>
                  <Controller
                    name="payitem4amt"
                    control={control}
                    defaultValue={payslipsdata.pay[rowindex][0].payitem4amt}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        variant="filled"
                        type="currency"
                        style={{ width: 100 }}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </div>
                <div>
                  <Controller
                    name="payitem5amt"
                    control={control}
                    defaultValue={payslipsdata.pay[rowindex][0].payitem5amt}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        variant="filled"
                        type="currency"
                        style={{ width: 100 }}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </div>
                <div>
                  <Controller
                    name="payitem6amt"
                    control={control}
                    defaultValue={payslipsdata.pay[rowindex][0].payitem6amt}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        variant="filled"
                        type="currency"
                        style={{ width: 100 }}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </div>
                <div>
                  <Controller
                    name="payitem7amt"
                    control={control}
                    defaultValue={payslipsdata.pay[rowindex][0].payitem7amt}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        variant="filled"
                        type="currency"
                        style={{ width: 100 }}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </div>
                <div>
                  <Controller
                    name="payitem8amt"
                    control={control}
                    defaultValue={payslipsdata.pay[rowindex][0].payitem8amt}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        variant="filled"
                        type="currency"
                        style={{ width: 100 }}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </div>
              </ul>
            </Grid>
            {/* pay details */}
            <Grid
              item
              xs={6}
              sm={3}
              align="left"
              style={{ border: "1px solid white" }}
            >
              <div>
                <div>
                  <Controller
                    name="payrun"
                    control={control}
                    defaultValue={payrundata.payrun}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        label="Pay Run"
                        variant="filled"
                        type="currency"
                        style={{ width: 100 }}
                        value={value}
                        onChange={onChange}
                        className={classes.textField}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    )}
                  />
                </div>
                <div>
                  <Controller
                    name="payperiod"
                    control={control}
                    defaultValue={payrundata.period}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        label="Pay Period"
                        variant="filled"
                        type="currency"
                        style={{ width: 100 }}
                        value={value}
                        onChange={onChange}
                        className={classes.textField}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    )}
                  />
                </div>
                <div>
                  {/* <h3>Name: {formdata.empname}</h3> */}
                  <TextField
                    label="Name"
                    variant="filled"
                    name="empname"
                    type="text"
                    style={{ width: 100 }}
                    value={formdata.empname}
                    className={classes.textField}
                    onChange={handleFormChange}
                  />
                  {/* <Controller
                    name="empname"
                    control={control}
                    defaultValue={formdata.empname}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        label="Name"
                        variant="filled"
                        type="currency"
                        style={{ width: 100 }}
                        //defaultValue={formdata.empname}
                        value={value}
                        onChange={onChange}
                        className={classes.textField}
                       
                      />
                    )}
                  /> */}
                </div>

                <div>
                  <Divider variant="fullWidth" className={classes.divider} />
                  <TextField
                    label="Wages"
                    variant="filled"
                    name="wages"
                    type="numeric"
                    style={{ width: 100 }}
                    value={formdata.wages}
                    className={classes.textField}
                    onChange={handleFormChange}
                  />
                </div>
                <div>
                  <Controller
                    name="tapamount"
                    control={control}
                    defaultValue={payslipsdata.pay[rowindex][0].tapamount}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        label="TAP Amount"
                        variant="filled"
                        type="currency"
                        style={{ width: 100 }}
                        value={value}
                        onChange={onChange}
                        className={classes.textField}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    )}
                  />
                </div>
                <div>
                  <Controller
                    name="scpamount"
                    control={control}
                    defaultValue={payslipsdata.pay[rowindex][0].scpamount}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        label="SCP Amount"
                        variant="filled"
                        type="currency"
                        style={{ width: 100 }}
                        value={value}
                        onChange={onChange}
                        className={classes.textField}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    )}
                  />
                </div>
                <div>
                  <Controller
                    name="allowances"
                    control={control}
                    defaultValue={payslipsdata.pay[rowindex][0].allowances}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        label="Total Allowances"
                        variant="filled"
                        type="currency"
                        style={{ width: 100 }}
                        value={value}
                        onChange={onChange}
                        className={classes.textField}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    )}
                  />
                </div>
                <div>
                  <Controller
                    name="deductions"
                    control={control}
                    defaultValue={payslipsdata.pay[rowindex][0].deductions}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        label="Total Deductions"
                        variant="filled"
                        type="currency"
                        style={{ width: 100 }}
                        value={value}
                        onChange={onChange}
                        className={classes.textField}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    )}
                  />
                </div>
                <div>
                  <Divider variant="fullWidth" className={classes.divider} />
                  <Controller
                    name="nettpay"
                    control={control}
                    defaultValue={payslipsdata.pay[rowindex][0].nettpay}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        label="Nett Pay"
                        variant="filled"
                        type="currency"
                        style={{ width: 100 }}
                        value={value}
                        onChange={onChange}
                        className={classes.textField}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    )}
                  />
                </div>
              </div>
            </Grid>
          </Grid>
        </form>
      </section>
    </Paper>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
