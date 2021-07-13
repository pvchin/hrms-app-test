import React, { useState, useEffect, useRef } from "react";

import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, Link } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import {
  payPeriodState,
  payPeriodEndMonthState,
  payPeriodEmpIdState,
} from "./data/atomdata";
import { usePayslipsContext } from "../context/payslips_context";
import { useTablesContext } from "../context/tables_context";



export default function Payslip_ViewEarnings({ setCalc }) {
  let history = useHistory();
  const [load, setLoad] = useState(true);
  const classes = useStyles();
  const payPeriodEmpId = useRecoilValue(payPeriodEmpIdState);
  const payPeriod = useRecoilValue(payPeriodState);
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

  const { description, amount } = payslipearnings;
  const { allowances } = useTablesContext();
  console.log("recoil", payPeriod, payPeriodEmpId);

const columns = [
  {
    title: "Name",
    field: "description",
  },
  { title: "Amount", field: "amount", type: "currency" },
];

  useEffect(() => {
    getSingleBatchPayslipEarnings(payPeriodEmpId, payPeriod);
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
          data={payslipearnings}
          title="Income"
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
