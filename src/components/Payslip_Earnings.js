import React, { useState, useEffect, useRef } from "react";

import MaterialTable, { MTableToolbar } from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Icon, TextField, MenuItem } from "@material-ui/core";

import { useHistory, Link } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import {
  payPeriodState,
  payPeriodEndMonthState,
  payPeriodEmpIdState,
  payEarningDataState,
} from "./data/atomdata";
import { usePayslipsContext } from "../context/payslips_context";
import { useTablesContext } from "../context/tables_context";

export default function Payslip_Earnings({
  setCalc,
  earningsdata,
  oldEarningsdata,
  setEarningsdata,
  handleDialogClose,
}) {
  let history = useHistory();
   const classes = useStyles();
  const payPeriodEmpId = useRecoilValue(payPeriodEmpIdState);
  const payPeriod = useRecoilValue(payPeriodState);
  const payEarningData = useRecoilValue(payEarningDataState);
  const {
    payslipearnings,
    payslip_earning_amount,
    setPayslipEarningAmount,
    addPayslipEarning,
    payslipearnings_loading,
    updatePayslipEarning,
    deletePayslipEarning,
    updatePayslip,
    editPayslipID,
    single_payslip,
    payslip_period,
    getSingleBatchPayslipEarnings,
  } = usePayslipsContext();

  const { name, amount } = payslipearnings;
  const { allowances } = useTablesContext();

  const columns = [
    {
      title: "Description",
      field: "description",
      editComponent: (props) => (
        <TextField
          //defaultValue={props.value || null}
          onChange={(e) => props.onChange(e.target.value)}
          style={{ width: 200 }}
          value={props.value}
          select
        >
          {allowances.map((r) => {
            return <MenuItem value={r.name}>{r.name}</MenuItem>;
          })}
        </TextField>
      ),
    },
    { title: "Amount", field: "amount", type: "currency" },
  ];

  useEffect(() => {
    getSingleBatchPayslipEarnings(single_payslip.empid, payslip_period);
  }, []);

  const calc_Earning = (data) => {
    const sum = data.reduce((a, v) => (a = a + v.amount), 0);
    console.log("Earning", data);
    setPayslipEarningAmount(sum);
  };

  const update_Payslip = () => {
    const { rec_id, id, total_earnings, ...paydata } = single_payslip;
    updatePayslip({
      id: editPayslipID,
      total_earnings: payslip_earning_amount,
      ...paydata,
    });
    setCalc(true);
  };

  const update_PayslipEarning = async (data) => {
    const { id, rec_id, empid, ...fields } = data;
    console.log("update", data);
    updatePayslipEarning({ id: data.id, empid: empid, ...fields });

    update_Payslip();
    getSingleBatchPayslipEarnings(single_payslip.empid, payslip_period);
  };

  const add_PayslipEarning = (data) => {
    console.log("add", data);
    const { description, amount } = data;
    addPayslipEarning({
      description: description,
      amount: amount,
      name: single_payslip.name,
      empid: single_payslip.empid,
      period: single_payslip.period,
    });

    getSingleBatchPayslipEarnings(single_payslip.empid, payslip_period);
  };

  const delete_PayslipEarning = (data) => {
    const { id } = data;
    deletePayslipEarning(id);
    getSingleBatchPayslipEarnings(single_payslip.empid, payslip_period);
  };

  const Save_EarningsData = () => {
    // delete unwanted data
    console.log("update", earningsdata, oldEarningsdata);
    oldEarningsdata.forEach((row) => {
      const { id, rec_id } = row;
      const res = earningsdata.find((r) => r.rec_id === rec_id);
      console.log("find", id, res);
      if (!res) {
        deletePayslipEarning(id);
      }
    });
    //add or update new data

    earningsdata.forEach((data) => {
      const { id, description, amount } = data;
      if (id) {
        const { id, rec_id, tableData, ...fields } = data;
        updatePayslipEarning({ id, ...fields });
      } else {
        addPayslipEarning({
          description: description,
          amount: amount,
          name: single_payslip.name,
          empid: payPeriodEmpId,
          period: payPeriod,
        });
      }
    });

    handleDialogClose();
  };

  if (payslipearnings_loading) {
    return (
      <div>
        <h2>Loading... Incomes.</h2>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      {/* <h1>Expenses Claims Application</h1> */}

      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={earningsdata}
          title="Income"
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  setEarningsdata([...earningsdata, newData]);
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...earningsdata];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  setEarningsdata([...dataUpdate]);

                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataDelete = [...earningsdata];
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                  setEarningsdata([...dataDelete]);

                  resolve();
                }, 1000);
              }),
          }}
          options={{
            filtering: true,
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
                    onClick={Save_EarningsData}
                  >
                    Update <Icon className={classes.rightIcon}>send</Icon>
                  </Button>
                </div>
              </div>
            ),
          }}
        />
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
  },
}));
