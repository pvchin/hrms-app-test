import React, { useState, useEffect } from "react";

import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { useSetRecoilState, useRecoilValue } from "recoil";
import {
  payPeriodState,
  payPeriodEndMonthState,
  payPeriodEmpIdState,
} from "./data/atomdata";
import { usePayslipsContext } from "../context/payslips_context";
import { useTablesContext } from "../context/tables_context";

export default function Payslip_ViewDeductions() {
  const classes = useStyles();
  const payPeriodEmpId = useRecoilValue(payPeriodEmpIdState);
  const payPeriod = useRecoilValue(payPeriodState);
  
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
      title: "Name",
      field: "description",
    },
    { title: "Amount", field: "amount", type: "currency" },
  ];

  useEffect(() => {
    getSingleBatchPayslipDeductions(payPeriodEmpId, payPeriod);
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
          data={payslipdeductions}
          title="Expense"
          options={{
            search: false,
            toolbar: false,
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
