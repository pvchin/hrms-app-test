import React, { useState, useEffect } from "react";

import MaterialTable, { MTableToolbar } from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import SearchIcon from "@material-ui/icons/Search";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory, Link } from "react-router-dom";

import { useExpensesContext } from "../context/expenses_context";

const columns = [
  {
    title: "Name",
    field: "name",
  },
  { title: "Date", field: "date" },
  { title: "Purchase Date", field: "purchased_date" },
  { title: "Description", field: "description", type: "date" },
  { title: "Amount", field: "amount", type: "numeric" },
  { title: "Status", field: "status" },
];

export default function ExpenseTable() {
  let history = useHistory();
  const classes = useStyles();
  const {
    expenses,
    addExpense,
    expenses_loading,
    updateExpense,
    deleteExpense,
    loadExpenses,
    getSingleExpense,
    setEditExpenseID,
    setIsExpenseEditingOn,
    setIsExpenseEditingOff,
    resetSingleExpense,
  } = useExpensesContext();

  useEffect(() => {
    loadExpenses();
  }, []);

  const add_Expense = async (data) => {
    const { id } = data;
    resetSingleExpense();
    setEditExpenseID("");
    setIsExpenseEditingOff();
    history.push("/singleexpense");
  };

  const update_Expense = async (data) => {
    const { id } = data;
    setEditExpenseID(id);
    setIsExpenseEditingOn();
    getSingleExpense(id);
    history.push("/singleexpense");
  };

  const delete_Expense = (data) => {
    const { id } = data;
    setEditExpenseID(id);
    deleteExpense(id);
    loadExpenses();
  };

  return (
    <div className={classes.root}>
      {/* <h1>Expenses Claims Application</h1> */}

      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={expenses}
          title="Expenses Claims Application"
          icons={{
            Add: (props) => <AddIcon />,
            Edit: (props) => <EditIcon />,
            Delete: (props) => <DeleteIcon />,
            Clear: (props) => <DeleteIcon />,
            Check: (props) => <CheckIcon />,
            Search: (props) => <SearchIcon />,
            ResetSearch: (props) => <DeleteIcon />,
          }}
          actions={[
            {
              icon: "edit",
              tooltip: "Edit Record",
              onClick: (event, rowData) => {
                update_Expense(rowData);
              },
            },
            {
              icon: "delete",
              tooltip: "Delete Record",
              onClick: (event, rowData) => {
                delete_Expense(rowData);
              },
            },
            {
              icon: "add",
              tooltip: "Add Record",
              isFreeAction: true,
              onClick: (event, rowData) => {
                add_Expense(rowData);
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
