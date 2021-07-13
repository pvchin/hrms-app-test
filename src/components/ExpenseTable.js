import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { TextField, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import SearchIcon from "@material-ui/icons/Search";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import ExpenseForm from "./ExpenseForm";
import { useExpensesContext } from "../context/expenses_context";
import { useEmployeesContext } from "../context/employees_context";
import { CustomDialog } from "../helpers/CustomDialog";
import { AlertDialog } from "../helpers/AlertDialog";

const columns = [
  { title: "Name", field: "name", editable: "never" },
  {
    title: "From Date",
    field: "from_date",
    type: "date",
    dateSetting: { locale: "en-GB" },
    editable: "never",
  },
  {
    title: "To Date",
    field: "to_date",
    type: "date",
    dateSetting: { locale: "en-GB" },
    editable: "never",
  },
  {
    title: "Description",
    field: "description",
    editable: "never",
  },
  { title: "Amount", field: "amount", type: "currency", editable: "never" },
  {
    title: "Status",
    field: "status",
    editComponent: (props) => (
      <TextField
        //defaultValue={props.value || null}
        onChange={(e) => props.onChange(e.target.value)}
        style={{ width: 100 }}
        value={props.value}
        select
      >
        <MenuItem value="Pending">Pending</MenuItem>
        <MenuItem value="Approve">Approve</MenuItem>
        <MenuItem value="Reject">Reject</MenuItem>
        <MenuItem value="Cancel">Cancel</MenuItem>
      </TextField>
    ),
  },
];

export default function ExpenseTable() {
  const classes = useStyles();
  const [isLoad, setIsLoad] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [expensesdata, setExpensesdata] = useState([]);
  const { loadEmployees } = useEmployeesContext();
  const {
    expenses,
    editExpenseID,
    updateExpense,
    expenses_loading,
    deleteExpense,
    loadExpenses,
    getSingleExpense,
    setEditExpenseID,
    setIsExpenseEditingOn,
    setIsExpenseEditingOff,
    resetSingleExpense,
  } = useExpensesContext();

  useEffect(() => {
    setExpensesdata(expenses);
    console.log(expensesdata)
  }, []);

  // useEffect(() => {
  //   loadEmployees();
  // }, []);

  // useEffect(() => {
  //   if (expenses) {
  //     setExpensesdata(expenses);
  //     console.log("expenses", expenses, expensesdata)
  //   } else {
  //     setIsLoad(!isLoad);
  //   }
  // }, [isLoad]);

  const add_Expense = async (data) => {
    // const { id } = data;
    resetSingleExpense();
    setEditExpenseID("");
    setIsExpenseEditingOff();
    handleDialogOpen();
    // history.push("/singleexpense");
  };

  const approve_Expense = async (data) => {
    console.log("approve", data);
    const { id, rec_id, ...fields } = data;
    updateExpense({ id, ...fields });
    // loadExpenses();
  };

  const update_Expense = async (data) => {
    const { id } = data;
    setEditExpenseID(id);
    setIsExpenseEditingOn();
    getSingleExpense(id);
    handleDialogOpen();
    // history.push("/singleexpense");
  };

  const delete_Expense = (data) => {
    const { id } = data;
    setEditExpenseID(id);
    handleAlertOpen();

    // deleteExpense(id);
    // loadExpenses();
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    loadExpenses();
  };

  const handleAlertOpen = () => {
    setIsAlertOpen(true);
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
  };

  const handleOnDeleteConfirm = () => {
    const id = editExpenseID;
    deleteExpense(id);
    loadExpenses();
  };

  // if (expenses_loading) {
  //   return (
  //     <div>
  //       <h2>Loading...Expenses</h2>
  //     </div>
  //   );
  // }
if (!expensesdata) {
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
          data={expensesdata}
          title="Expenses Claims Application"
          icons={{
            Add: (props) => <AddIcon />,
            Edit: (props) => <CheckCircleOutlineOutlinedIcon />,
            Delete: (props) => <DeleteIcon />,
            Clear: (props) => <DeleteIcon />,
            Check: (props) => <CheckIcon />,
            Search: (props) => <SearchIcon />,
            ResetSearch: (props) => <DeleteIcon />,
          }}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...expensesdata];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  setExpensesdata([...dataUpdate]);
                  //approve_Expense(newData);

                  resolve();
                }, 1000);
              }),
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
        <CustomDialog
          isOpen={isDialogOpen}
          handleClose={handleDialogClose}
          title=""
          showButton={true}
          isFullscree={false}
          isFullwidth={false}
        >
          <ExpenseForm handleDialogClose={handleDialogClose} />
        </CustomDialog>

        <AlertDialog
          handleClose={handleAlertClose}
          onConfirm={handleOnDeleteConfirm}
          isOpen={isAlertOpen}
          title="Delete Expenses"
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
