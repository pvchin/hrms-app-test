import React, { useState, useEffect } from "react";

import MaterialTable, { MTableToolbar } from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Icon, TextField, MenuItem } from "@material-ui/core";
import { useSetRecoilState, useRecoilValue } from "recoil";
import {
  payPeriodState,
  payPeriodEndMonthState,
  payPeriodEmpIdState,
  payEarningDataState,
} from "./data/atomdata";
import { usePayslipsContext } from "../context/payslips_context";
import { useTablesContext } from "../context/tables_context";

export default function Payslip_Deductions({
  setCalc,
  deductionsdata,
  oldDeductionsdata,
  setDeductionsdata,
  handleDialogClose,
}) {
  const classes = useStyles();
  const payPeriodEmpId = useRecoilValue(payPeriodEmpIdState);
  const payPeriod = useRecoilValue(payPeriodState);
  const payEarningData = useRecoilValue(payEarningDataState);
  const {
    payslipdeductions,
    payslip_deduction_amount,
    setPayslipDeductionAmount,
    loadPayslipDeductions,
    addPayslipDeduction,
    payslipdeductions_loading,
    updatePayslipDeduction,
    deletePayslipDeduction,
    updatePayslip,
    editPayslipID,
    single_payslip,
    payslip_period,
    getSingleBatchPayslipDeductions,
  } = usePayslipsContext();
  const { name, amount } = payslipdeductions;
  const { deductions } = useTablesContext();

  const calc_Deduction = (data) => {
    const sum = data.reduce((a, v) => (a = a + v.amount), 0);
    setPayslipDeductionAmount(sum);
  };

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
          {deductions.map((r) => {
            return <MenuItem value={r.name}>{r.name}</MenuItem>;
          })}
        </TextField>
      ),
    },
    { title: "Amount", field: "amount", type: "currency" },
  ];

  useEffect(() => {
    getSingleBatchPayslipDeductions(single_payslip.empid, payslip_period);
  }, []);

  const update_Payslip = () => {
    const { rec_id, id, total_deductions, ...paydata } = single_payslip;
    updatePayslip({
      id: editPayslipID,
      total_deductions: payslip_deduction_amount,
      ...paydata,
    });
  };

  const update_PayslipDeduction = async (data) => {
    const { id, rec_id, empid, ...fields } = data;
    updatePayslipDeduction({ id: data.id, empid: empid, ...fields });
    update_Payslip();
    getSingleBatchPayslipDeductions(single_payslip.empid, payslip_period);
  };

  const add_PayslipDeduction = (data) => {
    const { description, amount } = data;
    addPayslipDeduction({
      description: description,
      amount: amount,
      name: single_payslip.name,
      empid: single_payslip.empid,
      period: single_payslip.period,
    });
    getSingleBatchPayslipDeductions(single_payslip.empid, payslip_period);
  };

  const delete_PayslipDeduction = (data) => {
    const { id } = data;
    deletePayslipDeduction(id);
    getSingleBatchPayslipDeductions(single_payslip.empid, payslip_period);
  };

  const Save_DeductionsData = () => {
    // delete unwanted data
    console.log("update", deductionsdata, oldDeductionsdata);
    oldDeductionsdata.forEach((row) => {
      const { id, rec_id } = row;
      const res = deductionsdata.find((r) => r.rec_id === rec_id);
      console.log("find", id, res);
      if (!res) {
        deletePayslipDeduction(id);
      }
    });
    //add or update new data

    deductionsdata.forEach((data) => {
      const { id, description, amount } = data;
      if (id) {
        const { id, rec_id, tableData, ...fields } = data;
        updatePayslipDeduction({ id, ...fields });
      } else {
        addPayslipDeduction({
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

  if (payslipdeductions_loading) {
    return (
      <div>
        <h2>Loading... Expenses.</h2>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      {/* <h1>Expenses Claims Application</h1> */}

      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={deductionsdata}
          title="Deductions"
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  setDeductionsdata([...deductionsdata, newData]);
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...deductionsdata];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  setDeductionsdata([...dataUpdate]);
                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataDelete = [...deductionsdata];
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                  setDeductionsdata([...dataDelete]);
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
                    onClick={Save_DeductionsData}
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
