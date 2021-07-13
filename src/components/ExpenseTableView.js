import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { TextField, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import SearchIcon from "@material-ui/icons/Search";
import LeaveForm from "./LeaveForm";
import { CustomDialog } from "../helpers/CustomDialog";
import { AlertDialog } from "../helpers/AlertDialog";
import { useExpensesContext } from "../context/expenses_context";
import { useEmployeesContext } from "../context/employees_context";

const FILTERSTRING = "Pending";

const columns = [
  {
    title: "Name",
    field: "name",
  },
  {
    title: "Date",
    field: "date",
    type: "date",
    dateSetting: { locale: "en-GB" },
  },

  { title: "Description", field: "description" },
  { title: "Amount", field: "amount", type: "currency" },
  { title: "Status", field: "status" },
];

export default function ExpenseTableView() {
  const classes = useStyles();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { loadEmployees } = useEmployeesContext();
  const {
    expenses,
    addExpense,
    expenses_loading,
    updateExpense,
    deleteExpense,
    loadPendingExpenses,
    getSingleExpense,
    setEditExpenseID,
    setIsExpenseEditingOn,
    setIsExpenseEditingOff,
    resetSingleExpense,
  } = useExpensesContext();

  useEffect(() => {
    loadPendingExpenses(FILTERSTRING);
  }, []);

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    loadPendingExpenses(FILTERSTRING);
  };

  const handleAlertOpen = () => {
    setIsAlertOpen(true);
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
  };

  if (expenses_loading) {
    return (
      <div>
        <h2>Loading...Expenses</h2>
      </div>
    );
  }
  return (
    <div className={classes.root}>
      {/* <h1>Expenses Claims Application</h1> */}

      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={expenses}
          title="Leave Application"
          options={{
            filtering: false,
            search: false,
            toolbar: false,
            headerStyle: {
              backgroundColor: "orange",
              color: "primary",
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
