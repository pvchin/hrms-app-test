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
import { usePayrun } from "./payrun/usePayrun";

const FILTERSTRING = "Pending";

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

export default function PayslipTableVIewAdmin() {
  let history = useHistory();
  const classes = useStyles();
  const { payrun } = usePayrun();
  const setPayPeriodEmpId = useSetRecoilState(payPeriodEmpIdState);
  // const { getPayrun, payrun_loading, loadPendingPayslips } =
  //   usePayslipsContext();
  //const { loadEmployees, employees } = useEmployeesContext();

  // useEffect(() => {
  //   getPayrun();
  // }, []);

  return (
    <div className={classes.root}>
      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={payrun}
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
