import React, { useState, useEffect } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Icon } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import SearchIcon from "@material-ui/icons/Search";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import BuildOutlinedIcon from "@material-ui/icons/BuildOutlined";
import { useHistory, Link } from "react-router-dom";
import { useSetRecoilState, useRecoilState } from "recoil";
import { payrunState, payrunIdState, payrunStatusState } from "./data/atomdata";
import { usePayslipsContext } from "../context/payslips_context";
import { useExpensesContext } from "../context/expenses_context";
import { useDailyAllowancesContext } from "../context/dailyallowances_context";
import { AlertDialog } from "../helpers/AlertDialog";
import { usePayrun } from "./payrun/usePayrun"


const FILTERSTRING = "Pending";

const columns = [
  { title: "Period", field: "period" },
  {
    title: "Payrun Batch",
    field: "payrun",
    type: "date",
    dateSetting: { locale: "en-GB" },
  },
  {
    title: "Pay Date",
    field: "pay_date",
    type: "date",
    dateSetting: { locale: "en-GB" },
  },
  // { title: "Total Wages", field: "totalwages", type: "currency" },
  // { title: "Total Allowances", field: "totalallowances", type: "currency" },
  // { title: "Total Deductions", field: "totaldeductions", type: "currency" },
  { title: "Total Payroll", field: "totalpayroll", type: "currency" },
  { title: "Status", field: "status" },
];

export default function PayslipTable() {
  let history = useHistory();
  const classes = useStyles();
  const { payrun } = usePayrun()
  const [input, setInput] = useRecoilState(payrunState);
  const [isLoadInput, setIsLoadInput] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [deletestate, setDeletestate] = useState({ id: "", payrun: "" });
  const [payrunId, setPayrunId] = useRecoilState(payrunIdState);
  const [payrunstatus, setPayrunStatus] = useRecoilState(payrunStatusState);
  const { loadPeriodExpenses, periodexpenses, updateExpense } =
    useExpensesContext();
  const {
    getSingleBatchDailyAllowance,
    singlebatchdailyallowance,
    updateDailyAllowance,
    deleteDailyAllowance,
  } = useDailyAllowancesContext();
  const {
    //payrun,
    getPayrun,
    payrun_loading,
    payrun_error,
    getSinglePayslip,
    setEditPayslipID,
    setIsPayslipEditingOn,
    single_payslip,
    setPayslipPeriod,
    deletePayrun,
    deletePayslip,
    pending_payslips,
    loadPendingPayslips,
  } = usePayslipsContext();

  useEffect(() => {
    getPayrun();
    // loadPendingPayslips(FILTERSTRING);
  }, []);

  useEffect(() => {
    if (single_payslip.payrun) {
      console.log("single_payslip", single_payslip);
    }
  }, [single_payslip]);

  const handleAlertOpen = () => {
    setIsAlertOpen(true);
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
  };

  const update_Input = async (data) => {
    console.log("input", data);

    setInput({
      ...input,
      id: data.id,
      payfreq: data.payfreq,
      fromdate: data.fromdate,
      todate: data.todate,
      paydate: data.paydate,
      period: data.period,
      payrun: data.payrun,
      totalwages: data.totalwages,
      totaltap: data.totaltap,
      totalscp: data.totalscp,
      totalallows: data.totalallows,
      totaldeducts: data.totaldeducts,
      totalpayroll: data.totalpayroll,
      status: data.status,
    });

    setInput({
      ...input,
      id: data.id,
      payfreq: data.payfreq,
      fromdate: data.fromdate,
      todate: data.todate,
      paydate: data.paydate,
      period: data.period,
      payrun: data.payrun,
      totalwages: data.totalwages,
      totaltap: data.totaltap,
      totalscp: data.totalscp,
      totalallows: data.totalallows,
      totaldeducts: data.totaldeducts,
      totalpayroll: data.totalpayroll,
    });
    console.log("payrun", input);
  };

  const update_Payslip = async (data) => {
    console.log("data", data);
    const { id, payrun } = data;
    setPayrunId(id);
    setPayrunStatus(data.status);
    setPayslipPeriod(payrun); //save to recoil
    setEditPayslipID(id);
    setIsPayslipEditingOn();
    getSinglePayslip(id);

    history.push("/payrunbatch");
  };

  const delete_Payslip = (data) => {
    const { id, payrun } = data;
    setDeletestate({ id: id, payrun: payrun });
    loadPeriodExpenses(payrun);
    getSingleBatchDailyAllowance(payrun);
    handleAlertOpen();
  };

  const handleOnDeleteConfirm = (data) => {
    console.log("payslip delete", deletestate);
    const { id, payrun } = deletestate;

    //load period expenses
    loadPeriodExpenses(payrun);

    //delete allows detls
    pending_payslips.forEach((rec) => {
      if (rec.payrun === payrun) {
        deletePayslip(rec.id);
      }
    });
    //delete allows batch
    deletePayrun(id);
    getPayrun();

    //unpaid expenses
    periodexpenses.forEach((rec) => {
      if (rec.payrun === payrun) {
        updateExpense({ id: rec.id, payrun: "" });
      }
    });
  };

  if (payrun_loading) {
    return (
      <div>
        <h2>Loading.....Payslips</h2>
      </div>
    );
  }
  if (payrun_error) {
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
          data={payrun}
          title="Payroll"
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
            (rowData) => ({
              // disabled: rowData.status !== "Pending",
              icon: "edit",
              position: "row",
              tooltip: "Edit Record",
              onClick: (event, rowData) => {
                update_Input(rowData);
                update_Payslip(rowData);
              },
            }),
            (rowData) => ({
              disabled: rowData.status !== "Pending",
              icon: "delete",
              tooltip: "Delete Record",
              position: "row",
              onClick: (event, rowData) => {
                //delete_Payslip(rowData);
                delete_Payslip(rowData);
              },
            }),

            // {
            //   icon: "add",
            //   tooltip: "Add Record",
            //   isFreeAction: true,
            //   onClick: (event, rowData) => {
            //     add_Payslip(rowData);
            //   },
            // },
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
                {/* <div style={{ padding: "5px 10px" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={(e) => handleVerifyPayslipData(e)}
                  >
                    Verify <Icon className={classes.rightIcon}>send</Icon>
                  </Button>
                </div> */}
              </div>
            ),
          }}
        />
        <AlertDialog
          handleClose={handleAlertClose}
          onConfirm={handleOnDeleteConfirm}
          isOpen={isAlertOpen}
          title="Delete Payslip Batch"
        >
          <h2>Are you sure you want to delete ?</h2>
        </AlertDialog>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
  },
}));
