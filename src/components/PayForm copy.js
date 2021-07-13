import React, { useState, useEffect } from "react";
import {
  Button,
  ButtonGroup,
  Grid,
  Icon,
  TextField,
  Divider,
  ListSubheader,
  MenuItem,
  Select,
  NativeSelect,
  InputLabel,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { usePayslipsContext } from "../context/payslips_context";

const initial_state = [
  {
    name: "",
    period: "",
    date: "",
    payrun: "",
    nett_pay: 0,
    bank_name: "",
    bank_acno: "",
    tap_acno: "",
    tap_amount: 0,
    scp_acno: "",
    scp_amount: 0,
    total_allowances: 0,
    total_deductions: 0,
    empid: "",
    status: "",
    allows_type1: " ",
    allows_type1amt: 0,
    allows_type2: " ",
    allows_type2amt: 0,
    allows_type3: " ",
    allows_type3amt: 0,
    allows_type4: " ",
    allows_type4amt: 0,
    allows_type5: " ",
    allows_type5amt: 0,
    allows_type6: " ",
    allows_type6amt: 0,
    allows_type7: "",
    allows_type7amt: 0,
    allows_type8: "",
    allows_type8amt: 0,
    deducts_type1: "",
    deducts_type1amt: 0,
    deducts_type2: " ",
    deducts_type2amt: 0,
    deducts_type3: " ",
    deducts_type3amt: 0,
    deducts_type4: "",
    deducts_type4amt: 0,
    deducts_type5: "",
    deducts_type5amt: 0,
    deducts_type6: "",
    deducts_type6amt: 0,
    deducts_type7: "",
    deducts_type7amt: 0,
    deducts_type8: "",
    deducts_type8amt: 0,
  },
];

const PayForm = ({
  formdata,
  setFormdata,
  loadFormdata,
  setLoadFormdata,
  payitems,
  setLoadUpdatedata,
  rowindex,
}) => {
  const classes = useStyles();
  const [state, setState] = useState(initial_state);
  const { singlebatchpayslip } = usePayslipsContext();

  useEffect(() => {
    setState(initial_state);
    setState({ ...formdata });
    setLoadFormdata(false);
    console.log("useeffect state", state);
  }, [loadFormdata]);

  const Update_Empdata = ({ name, value }) => {
    let data = singlebatchpayslip[rowindex];
    data[name] = value;
    console.log("update data", data);
    console.log("update payslip", singlebatchpayslip[rowindex]);
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    //setFormInput({ [name]: val });
    setState({ ...state, [name]: val });
    Update_Empdata({ name: name, value: val });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("submitform");
    handleCalc();
  };

  const handleCalc = (e) => {
    let data = singlebatchpayslip[rowindex];
    const totalTAP = Math.ceil(state.wages * 0.05);
    const totalSCP =
      Math.round((state.wages + Number.EPSILON) * 0.035 * 100) / 100;

    const allows =
      parseInt(state.allows_type2amt, 10) +
      parseInt(state.allows_type3amt, 10) +
      parseInt(state.allows_type4amt, 10) +
      parseInt(state.allows_type5amt, 10) +
      parseInt(state.allows_type6amt, 10) +
      parseInt(state.allows_type7amt, 10) +
      parseInt(state.allows_type8amt, 10);

    const deducts =
      parseInt(state.deducts_type1amt, 10) +
      parseInt(state.deducts_type2amt, 10) +
      parseInt(state.deducts_type3amt, 10) +
      parseInt(state.deducts_type4amt, 10) +
      parseInt(state.deducts_type5amt, 10) +
      parseInt(state.deducts_type6amt, 10) +
      parseInt(state.deducts_type7amt, 10) +
      parseInt(state.deducts_type8amt, 10);

    const nettPay = state.wages - totalTAP - totalSCP + allows - deducts;
    setState({
      ...state,
      total_allowances: allows,
      total_deductions: deducts,
      tap_amount: totalTAP,
      scp_amount: totalSCP,
      nett_pay: nettPay,
    });
    //update employee data
    data.tap_amount = totalTAP;
    data.scp_amount = totalSCP;
    data.total_allowances = allows;
    data.total_deductions = deducts;
    data.nett_pay = nettPay;
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <Grid container direction="row" style={{ border: "1px solid white" }}>
        <Grid item sm={4} align="center" style={{ border: "1px solid white" }}>
          <h2>Allowances</h2>
        </Grid>

        <Grid item sm={4} align="center" style={{ border: "1px solid white" }}>
          <h2>Deductions</h2>
        </Grid>
        <Grid item sm={4} align="center" style={{ border: "1px solid white" }}>
          <h2>Summary</h2>
        </Grid>
      </Grid>
      <Grid container direction="row" style={{ border: "1px solid white" }}>
        <Grid item sm={4} align="center" style={{ border: "1px solid white" }}>
          <Grid container direction="row" style={{ border: "1px solid white" }}>
            <Grid
              item
              sm={8}
              align="center"
              style={{ border: "1px solid white" }}
            >
              <div>
                <TextField
                  label="Allowance"
                  name="allows_type1"
                  variant="filled"
                  type="text"
                  value={state.allows_type1}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                ></TextField>
              </div>
              <div>
                <TextField
                  label="Allowance"
                  name="allows_type2"
                  variant="filled"
                  type="text"
                  displayEmpty
                  defaultValue=""
                  value={state.allows_type2}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                ></TextField>
              </div>
              <div>
                <TextField
                  label="Allowance"
                  name="allows_type3"
                  variant="filled"
                  type="text"
                  value={state.allows_type3}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                ></TextField>
              </div>
              <div>
                <TextField
                  label="Allowance"
                  name="allows_type4"
                  variant="filled"
                  type="text"
                  value={state.allows_type4}
                  onChange={handleChange}
                  style={{ width: "100%", textAlign: "left" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  select
                >
                  <ListSubheader>Wages</ListSubheader>
                  {payitems
                    .filter(function (item) {
                      return item.pay_type === "Wages";
                    })
                    .map((row) => {
                      return (
                        <MenuItem key={row.id} value={row.name}>
                          {row.name}
                        </MenuItem>
                      );
                    })}
                  <ListSubheader>Allowances</ListSubheader>
                  {payitems
                    .filter(function (item) {
                      return item.pay_type === "Allowances";
                    })
                    .map((row) => {
                      return (
                        <MenuItem key={row.id} value={row.name}>
                          {row.name}
                        </MenuItem>
                      );
                    })}
                </TextField>
              </div>
              <div>
                <TextField
                  label="Allowance"
                  name="allows_type5"
                  variant="filled"
                  type="text"
                  value={state.allows_type5}
                  onChange={handleChange}
                  style={{ width: "100%", textAlign: "left" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  select
                >
                  <ListSubheader>Wages</ListSubheader>
                  {payitems
                    .filter(function (item) {
                      return item.pay_type === "Wages";
                    })
                    .map((row) => {
                      return (
                        <MenuItem key={row.id} value={row.name}>
                          {row.name}
                        </MenuItem>
                      );
                    })}
                  <ListSubheader>Allowances</ListSubheader>
                  {payitems
                    .filter(function (item) {
                      return item.pay_type === "Allowances";
                    })
                    .map((row) => {
                      return (
                        <MenuItem key={row.id} value={row.name}>
                          {row.name}
                        </MenuItem>
                      );
                    })}
                </TextField>
              </div>
              <div>
                <TextField
                  label="Allowance"
                  name="allows_type6"
                  variant="filled"
                  type="text"
                  value={state.allows_type6}
                  onChange={handleChange}
                  style={{ width: "100%", textAlign: "left" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  select
                >
                  <ListSubheader>Wages</ListSubheader>
                  {payitems
                    .filter(function (item) {
                      return item.pay_type === "Wages";
                    })
                    .map((row) => {
                      return (
                        <MenuItem key={row.id} value={row.name}>
                          {row.name}
                        </MenuItem>
                      );
                    })}
                  <ListSubheader>Allowances</ListSubheader>
                  {payitems
                    .filter(function (item) {
                      return item.pay_type === "Allowances";
                    })
                    .map((row) => {
                      return (
                        <MenuItem key={row.id} value={row.name}>
                          {row.name}
                        </MenuItem>
                      );
                    })}
                </TextField>
              </div>
              <div>
                <TextField
                  label="Allowance"
                  name="allows_type7"
                  variant="filled"
                  type="text"
                  value={state.allows_type7}
                  onChange={handleChange}
                  style={{ width: "100%", textAlign: "left" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  select
                >
                  <ListSubheader>Wages</ListSubheader>
                  {payitems
                    .filter(function (item) {
                      return item.pay_type === "Wages";
                    })
                    .map((row) => {
                      return (
                        <MenuItem key={row.id} value={row.name}>
                          {row.name}
                        </MenuItem>
                      );
                    })}
                  <ListSubheader>Allowances</ListSubheader>
                  {payitems
                    .filter(function (item) {
                      return item.pay_type === "Allowances";
                    })
                    .map((row) => {
                      return (
                        <MenuItem key={row.id} value={row.name}>
                          {row.name}
                        </MenuItem>
                      );
                    })}
                </TextField>
              </div>
              <div>
                <TextField
                  label="Allowance"
                  name="allows_type8"
                  variant="filled"
                  type="text"
                  value={state.allows_type8}
                  onChange={handleChange}
                  style={{ width: "100%", textAlign: "left" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  select
                >
                  <ListSubheader>Wages</ListSubheader>
                  {payitems
                    .filter(function (item) {
                      return item.pay_type === "Wages";
                    })
                    .map((row) => {
                      return (
                        <MenuItem key={row.id} value={row.name}>
                          {row.name}
                        </MenuItem>
                      );
                    })}
                  <ListSubheader>Allowances</ListSubheader>
                  {payitems
                    .filter(function (item) {
                      return item.pay_type === "Allowances";
                    })
                    .map((row) => {
                      return (
                        <MenuItem key={row.id} value={row.name}>
                          {row.name}
                        </MenuItem>
                      );
                    })}
                </TextField>
              </div>
            </Grid>
            <Grid
              item
              sm={4}
              align="center"
              style={{ border: "1px solid white" }}
            >
              <div>
                <TextField
                  label="Amount"
                  name="allows_type1amt"
                  variant="filled"
                  type="number"
                  value={state.allows_type1amt}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                ></TextField>
              </div>
              <div>
                <TextField
                  label="Amount"
                  name="allows_type2amt"
                  variant="filled"
                  type="number"
                  value={state.allows_type2amt}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                ></TextField>
              </div>

              <div>
                <TextField
                  label="Amount"
                  name="allows_type3amt"
                  variant="filled"
                  type="number"
                  value={state.allows_type3amt}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                ></TextField>
              </div>
              <div>
                <TextField
                  label="Amount"
                  name="allows_type4amt"
                  variant="filled"
                  type="number"
                  value={state.allows_type4amt}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                ></TextField>
              </div>
              <div>
                <TextField
                  label="Amount"
                  name="allows_type5amt"
                  variant="filled"
                  type="number"
                  value={state.allows_type5amt}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                ></TextField>
              </div>
              <div>
                <TextField
                  label="Amount"
                  name="allows_type6amt"
                  variant="filled"
                  type="number"
                  value={state.allows_type6amt}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                ></TextField>
              </div>
              <div>
                <TextField
                  label="Amount"
                  name="allows_type7amt"
                  variant="filled"
                  type="number"
                  value={state.allows_type7amt}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                ></TextField>
              </div>
              <div>
                <TextField
                  label="Amount"
                  name="allows_type8amt"
                  variant="filled"
                  type="number"
                  value={state.allows_type8amt}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                ></TextField>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={4} align="center" style={{ border: "1px solid white" }}>
          <Grid container direction="row" style={{ border: "1px solid white" }}>
            <Grid
              item
              sm={8}
              align="center"
              style={{ border: "1px solid white" }}
            >
              <div>
                <InputLabel
                  htmlFor="age-customized-native-simple"
                  className={classes.formLabel}
                >
                  Deduction
                </InputLabel>
                <NativeSelect
                  name="deducts_type1"
                  value={state.deducts_type1}
                  style={{
                    padding: 4,
                    marginLeft: 5,
                    width: "100%",
                    textAlign: "left",
                  }}
                  onChange={handleChange}
                  // input={
                  //   <BootstrapInput
                  //     name="age"
                  //     id="age-customized-native-simple"
                  //   />
                  //}
                >
                  <option value="">None</option>
                  {payitems
                    .filter(function (item) {
                      return item.pay_type === "Deductions";
                    })
                    .map((row) => {
                      return (
                        <option key={row.id} value={row.name}>
                          {row.name}
                        </option>
                      );
                    })}
                  {/* <option value="Loan Repayment">Loan Repayment</option>
                  <option value="Unpaid Leave">Unpaid Leave</option> */}
                </NativeSelect>
                {/* <Autocomplete
                  id="combo-box-demo"
                  options={[{ name: "Loan Repayment" }, {name: "Unpaid Leave" }] }
                  getOptionLabel={(option) => option.name}
                  defaultValue={state.deducts_type1}
                  // style={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Deduction"
                      name="deducts_type1"
                      variant="filled"
                      type="text"
                      value={state.deducts_type1}
                      onChange={handleChange}
                      style={{ width: "100%", textAlign: "left" }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                /> */}
                {/* <TextField
                  label="Deduction"
                  name="deducts_type1"
                  variant="filled"
                  type="text"
                  value={state.deducts_type1}
                  onChange={handleChange}
                  style={{ width: "100%", textAlign: "left" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  select
                >
                  <MenuItem value="Loan Repayment">Loan Repayment</MenuItem>
                  <MenuItem value="Unpaid Leave">Unpaid Leave</MenuItem>
                  <ListSubheader>Deductions</ListSubheader> 
                
                {payitems
                    .filter(function (item) {
                      return item.pay_type === "Deductions";
                    })
                    .map((row) => {
                      return (
                        <MenuItem key={row.id} value={row.name}>
                          {row.name}
                        </MenuItem>
                      );
                    })} 
                </TextField> */}
              </div>
              <div>
                <TextField
                  label="Deduction"
                  name="deducts_type2"
                  variant="filled"
                  type="text"
                  value={state.deducts_type2}
                  onChange={handleChange}
                  style={{ width: "100%", textAlign: "left" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  select
                >
                  <ListSubheader>Deductions</ListSubheader>
                  {payitems
                    .filter(function (item) {
                      return item.pay_type === "Deductions";
                    })
                    .map((row) => {
                      return (
                        <MenuItem key={row.id} value={row.name}>
                          {row.name}
                        </MenuItem>
                      );
                    })}
                </TextField>
              </div>
              <div>
                <TextField
                  label="Deduction"
                  name="deducts_type3"
                  variant="filled"
                  type="text"
                  value={state.deducts_type3}
                  onChange={handleChange}
                  style={{ width: "100%", textAlign: "left" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  select
                >
                  <ListSubheader>Deductions</ListSubheader>
                  {payitems
                    .filter(function (item) {
                      return item.pay_type === "Deductions";
                    })
                    .map((row) => {
                      return (
                        <MenuItem key={row.id} value={row.name}>
                          {row.name}
                        </MenuItem>
                      );
                    })}
                </TextField>
              </div>
              <div>
                <TextField
                  label="Deduction"
                  name="deducts_type4"
                  variant="filled"
                  type="text"
                  value={state.deducts_type4}
                  onChange={handleChange}
                  style={{ width: "100%", textAlign: "left" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  select
                >
                  <ListSubheader>Deductions</ListSubheader>
                  {payitems
                    .filter(function (item) {
                      return item.pay_type === "Deductions";
                    })
                    .map((row) => {
                      return (
                        <MenuItem key={row.id} value={row.name}>
                          {row.name}
                        </MenuItem>
                      );
                    })}
                </TextField>
              </div>
              <div>
                <TextField
                  label="Deduction"
                  name="deducts_type5"
                  variant="filled"
                  type="text"
                  value={state.deducts_type5}
                  onChange={handleChange}
                  style={{ width: "100%", textAlign: "left" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  select
                >
                  <ListSubheader>Deductions</ListSubheader>
                  {payitems
                    .filter(function (item) {
                      return item.pay_type === "Deductions";
                    })
                    .map((row) => {
                      return (
                        <MenuItem key={row.id} value={row.name}>
                          {row.name}
                        </MenuItem>
                      );
                    })}
                </TextField>
              </div>
              <div>
                <TextField
                  label="Deduction"
                  name="deducts_type6"
                  variant="filled"
                  type="text"
                  value={state.deducts_type6}
                  onChange={handleChange}
                  style={{ width: "100%", textAlign: "left" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  select
                >
                  <ListSubheader>Deductions</ListSubheader>
                  {payitems
                    .filter(function (item) {
                      return item.pay_type === "Deductions";
                    })
                    .map((row) => {
                      return (
                        <MenuItem key={row.id} value={row.name}>
                          {row.name}
                        </MenuItem>
                      );
                    })}
                </TextField>
              </div>
              <div>
                <TextField
                  label="Deduction"
                  name="deducts_type7"
                  variant="filled"
                  type="text"
                  value={state.deducts_type7}
                  onChange={handleChange}
                  style={{ width: "100%", textAlign: "left" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  select
                >
                  <ListSubheader>Deductions</ListSubheader>
                  {payitems
                    .filter(function (item) {
                      return item.pay_type === "Deductions";
                    })
                    .map((row) => {
                      return (
                        <MenuItem key={row.id} value={row.name}>
                          {row.name}
                        </MenuItem>
                      );
                    })}
                </TextField>
              </div>
              <div>
                <TextField
                  label="Deduction"
                  name="deducts_type8"
                  variant="filled"
                  type="text"
                  value={state.deducts_type8}
                  onChange={handleChange}
                  style={{ width: "100%", textAlign: "left" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  select
                >
                  <ListSubheader>Deductions</ListSubheader>
                  {payitems
                    .filter(function (item) {
                      return item.pay_type === "Deductions";
                    })
                    .map((row) => {
                      return (
                        <MenuItem key={row.id} value={row.name}>
                          {row.name}
                        </MenuItem>
                      );
                    })}
                </TextField>
              </div>
            </Grid>
            <Grid
              item
              sm={4}
              align="center"
              style={{ border: "1px solid white" }}
            >
              <div>
                <TextField
                  label="Amount"
                  name="deducts_type1amt"
                  variant="filled"
                  type="number"
                  value={state.deducts_type1amt}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div>
                <TextField
                  label="Amount"
                  name="deducts_type2amt"
                  variant="filled"
                  type="number"
                  value={state.deducts_type2amt}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div>
                <TextField
                  label="Amount"
                  name="deducts_type3amt"
                  variant="filled"
                  type="number"
                  value={state.deducts_type3amt}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div>
                <TextField
                  label="Amount"
                  name="deducts_type4amt"
                  variant="filled"
                  type="number"
                  value={state.deducts_type4amt}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div>
                <TextField
                  label="Amount"
                  name="deducts_type5amt"
                  variant="filled"
                  type="number"
                  value={state.deducts_type5amt}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div>
                <TextField
                  label="Amount"
                  name="deducts_type6amt"
                  variant="filled"
                  type="number"
                  value={state.deducts_type6amt}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div>
                <TextField
                  label="Amount"
                  name="deducts_type7amt"
                  variant="filled"
                  type="number"
                  value={state.deducts_type7amt}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div>
                <TextField
                  label="Amount"
                  name="deducts_type8amt"
                  variant="filled"
                  type="number"
                  value={state.deducts_type8amt}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={4} align="center" style={{ border: "1px solid white" }}>
          <div>
            <h3>{state.name}</h3>
          </div>
          <Divider variant="fullWidth" className={classes.divider} />
          <div>
            <TextField
              label="Wages"
              name="wages"
              variant="filled"
              type="number"
              value={state.wages}
              onChange={handleChange}
              style={{ width: "100%" }}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div>
            <TextField
              label="TAP Amount"
              name="tap_amount"
              variant="filled"
              type="number"
              value={state.tap_amount}
              onChange={handleChange}
              style={{ width: "100%" }}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div>
            <TextField
              label="SCP Amounut"
              name="scp_amount"
              variant="filled"
              type="number"
              value={state.scp_amount}
              onChange={handleChange}
              style={{ width: "100%" }}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div>
            <TextField
              label="Total Allowances"
              name="total_allowances"
              variant="filled"
              type="number"
              value={state.total_allowances}
              onChange={handleChange}
              style={{ width: "100%" }}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div>
            <TextField
              label="Total Deductions"
              name="total_deductions"
              variant="filled"
              type="number"
              value={state.total_deductions}
              onChange={handleChange}
              style={{ width: "100%" }}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div>
            <TextField
              label="Nett Pay"
              name="nett_pay"
              variant="filled"
              type="number"
              value={state.nett_pay}
              onChange={handleChange}
              style={{ width: "100%" }}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              style={{ marginLeft: 10 }}
              onClick={handleCalc}
            >
              Calc <Icon className={classes.rightIcon}>send</Icon>
            </Button>
          </div>
        </Grid>
        {/* <button>Submit</button> */}
      </Grid>
    </form>
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
  divContainer: {
    display: "flex",
    flexDirection: "row",
  },
  formLabel: {
    fontSize: 12,
    textAlign: "left",
    marginLeft: 8,
    marginTop: 5,
   
  },
}));

export default PayForm;
