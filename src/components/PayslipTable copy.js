import React, { useEffect } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import SearchIcon from "@material-ui/icons/Search";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import BuildOutlinedIcon from "@material-ui/icons/BuildOutlined";
import { useHistory, Link } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import {
  payPeriodState,
  payPeriodEndMonthState,
  payPeriodEmpIdState,
} from "./data/atomdata";
import { usePayslipsContext } from "../context/payslips_context";
import { useEmployeesContext } from "../context/employees_context";

const columns = [
  {
    title: "Name",
    field: "name",
  },
  { title: "Period", field: "period" },
  {
    title: "Date",
    field: "date",
    type: "date",
    dateSetting: { locale: "en-GB" },
  },
  { title: "Basic Pay", field: "basic_pay", type: "currency" },
  { title: "TAP Amount", field: "tap_amount", type: "currency" },
  { title: "SCP Amount", field: "scp_amount", type: "currency" },
  { title: "Earnings", field: "total_earnings", type: "currency" },
  { title: "Deductions", field: "total_deductions", type: "currency" },
  { title: "Nett Pay", field: "nett_pay", type: "currency" },
  // { title: "Bank Name", field: "bank_name" },
  // { title: "Bank AC No", field: "bank_accno" },
  { title: "Status", field: "status" },
];

export default function PayslipTable() {
  let history = useHistory();
  const classes = useStyles();
  const setPayPeriodEmpId = useSetRecoilState(payPeriodEmpIdState);
  const {
    payslips,
    addPayslip,
    payslips_loading,
    updatePayslip,
    deletePayslip,
    loadPayslips,
    getSinglePayslip,
    getSingleBatchPayslip,
    setEditPayslipID,
    setIsPayslipEditingOn,
    setIsPayslipEditingOff,
    resetSinglePayslip,
    payslip_period,
    payslip_endmonthdate,
    singlebatchpayslip,
    singlebatch_payslip_loading,
    singlebatch_payslip_error,
  } = usePayslipsContext();
  const { loadEmployees, employees } = useEmployeesContext();

  useEffect(() => {
    getSingleBatchPayslip(payslip_period);
  }, []);

  const update_Payslip = async (data) => {
    const { id } = data;
    setPayPeriodEmpId(id); //save to recoil
    setEditPayslipID(id);
    setIsPayslipEditingOn();
    getSinglePayslip(id);
    history.push("/singlepayslip");
  };

  const add_Payslip = async (data) => {
    const { id } = data;
    resetSinglePayslip();
    setEditPayslipID("");
    setIsPayslipEditingOff();
    history.push("/singlepayslip");
  };

  const delete_Payslip = (data) => {
    const { id } = data;
    setEditPayslipID(id);
    deletePayslip(id);
    loadPayslips();
  };

  const build_Payslip = () => {
    const current_period = payslip_period;
    const current_endmonthdate = Date.parse(payslip_endmonthdate);

    // loadEmployees();
    console.log(current_period);
    getSingleBatchPayslip(payslip_period);
    const paydata = singlebatchpayslip.map((e) => e.name) || [];

    {
      employees.map((emp) => {
        const {
          id,
          name,
          bank_name,
          bank_acno,
          basic_salary,
          nett_pay,
          tap_acno,
          tap_amount,
          scp_acno,
          scp_amount,
        } = emp;
        const data = {
          name: name,
          period: current_period,
          date: current_endmonthdate,
          basic_pay: basic_salary,
          nett_pay: nett_pay,
          bank_name: bank_name,
          bank_acno: bank_acno,
          tap_acno: tap_acno,
          tap_amount: tap_amount,
          scp_acno: scp_acno,
          scp_amount: scp_amount,
          empid: id,
          status: "Pending",
        };
        if (paydata) {
          const res = paydata.includes(emp.name);
          if (!res) {
            console.log("add", data);
            addPayslip({ ...data });
          } else {
            addPayslip({ ...data });
          }
        }
      });
    }
    getSingleBatchPayslip(payslip_period);
  };

  if (singlebatch_payslip_loading) {
    return (
      <div>
        <h2>Loading.....Payslips</h2>
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={singlebatchpayslip}
          title="Payslips"
          icons={{
            Add: (props) => <AddIcon />,
            Edit: (props) => <EditIcon />,
            Delete: (props) => <DeleteIcon />,
            Clear: (props) => <DeleteIcon />,
            Check: (props) => <CheckIcon />,
            Search: (props) => <SearchIcon />,
            ResetSearch: (props) => <DeleteIcon />,
            Build: (props) => <BuildOutlinedIcon />,
          }}
          actions={[
            {
              icon: "edit",
              tooltip: "Edit Record",
              onClick: (event, rowData) => {
                update_Payslip(rowData);
              },
            },
            {
              icon: "delete",
              tooltip: "Delete Record",
              onClick: (event, rowData) => {
                delete_Payslip(rowData);
              },
            },
            {
              icon: "add",
              tooltip: "Add Record",
              isFreeAction: true,
              onClick: (event, rowData) => {
                add_Payslip(rowData);
              },
            },
            {
              icon: "build",
              tooltip: "Build Records",
              isFreeAction: true,
              onClick: (event, rowData) => {
                build_Payslip();
              },
            },
          ]}
          options={{
            filtering: true,
            headerStyle: {
              backgroundColor: "orange",
              color: "#FFF",
            },
            showTitle: true,
          }}
          components={{
            Toolbar: (props) => (
              <div>
                <MTableToolbar {...props} />
                <div style={{ paddingLeft: 22 }}>
                  <h3>{`Batch: ${payslip_period}      End Month: ${payslip_endmonthdate}`}</h3>
                </div>
                {/* <div style={{ paddingLeft: 22 }}>
                  <h3>{`End Month: ${payslip_endmonthdate}`}</h3>
                </div> */}
                <Link to="/payslip">
                  <div>
                    <ArrowBackIcon fontSize="large" color="primary" />
                  </div>
                </Link>
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
