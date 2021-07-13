import React, { useEffect } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, Link } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import {
  payPeriodState,
  payPeriodEndMonthState,
  payPeriodEmpIdState,
} from "./data/atomdata";
import { usePayslipsContext } from "../context/payslips_context";
import { useEmployeesContext } from "../context/employees_context";

const FILTERSTRING = "Verified";

const columns = [
  {
    title: "Batch",
    field: "payrun",
    editable: "never",
  },
  { title: "Period", field: "period", editable: "never" },
  {
    title: "PayDate",
    field: "pay_date",
    type: "date",
    dateSetting: { locale: "en-GB" },
    editable: "never",
  },

  {
    title: "Payroll",
    field: "totalpayroll",
    type: "currency",
    editable: "never",
  },
  // { title: "Bank Name", field: "bank_name" },
  // { title: "Bank AC No", field: "bank_accno" },
  { title: "Status", field: "status", editable: "never" },
];

export default function PayslipTableVIew() {
  let history = useHistory();
  const classes = useStyles();
  const setPayPeriodEmpId = useSetRecoilState(payPeriodEmpIdState);
  const {
    batchpayrun,
    getBatchPayrun,
    batchpayrun_loading,
    batchpayrun_error,
    loadPendingPayslips,
  } = usePayslipsContext();
  //const { loadEmployees, employees } = useEmployeesContext();

  useEffect(() => {
    getBatchPayrun(FILTERSTRING);
  }, []);

  if (batchpayrun_loading) {
    return (
      <div>
        <h2>Loading.....Payslips</h2>
      </div>
    );
  }
  if (batchpayrun_error) {
    return (
      <div>
        <h2>Internet connection problem!</h2>
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={batchpayrun}
          title="Payslips"
          options={{
            filtering: false,
            search: false,
            toolbar: false,
            headerStyle: {
              backgroundColor: "orange",
              color: "#FFF",
            },
            showTitle: false,
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
