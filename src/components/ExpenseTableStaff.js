import React, { useState, useEffect } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { TextField, MenuItem, Button, Icon } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { useRecoilState } from "recoil";
import { loginLevelState } from "./data/atomdata";
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
import { useExpenses } from "./expenses/useExpenses";
import { useAddExpenses } from "./expenses/useAddExpenses";
import { useDeleteExpenses } from "./expenses/useDeleteExpenses";
import { useUpdateExpenses } from "./expenses/useUpdateExpenses";

const initial_form = {
  name: "",
  date: "",
  purchased_from: "",
  description: "",
  status: "Pending",
  amount: 0,
};

const columns = [
  { title: "Name", field: "name", editable: "never" },
  {
    title: "Date",
    field: "date",
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
  const { expenses, filter, setFilter, setExpenseId } = useExpenses();
  const updateExpenses = useUpdateExpenses();
  const addExpenses = useAddExpenses();
  const deleteExpenses = useDeleteExpenses();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [expensesdata, setExpensesdata] = useState([]);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [formdata, setFormdata] = useState(initial_form);
  const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);
  const { editEmployeeID } = useEmployeesContext();
  const {
    //expenses,
    editExpenseID,
    updateExpense,
    addExpense,
    deleteExpense,
    setEditExpenseID,
    setIsExpenseEditingOn,
    setIsExpenseEditingOff,
  } = useExpensesContext();

  useEffect(() => {
    setFilter(loginLevel.loginUserId);
  }, []);

  const add_Expense = async (data) => {
    // const { id } = data;
    setFormdata(initial_form);
    setFormdata(initial_form);
    setIsExpenseEditingOff();
    handleDialogOpen();
    // history.push("/singleexpense");
  };

  const update_Expense = async (data) => {
    const { id } = data;
    setFormdata({ ...data });
    setFormdata({ ...data });
    setEditExpenseID(id);
    setIsExpenseEditingOn();
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
  };

  const handleAlertOpen = () => {
    setIsAlertOpen(true);
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
  };

  const handleOnDeleteConfirm = () => {
    const id = editExpenseID;
    deleteExpenses(id);
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
            Edit: (props) => <CheckCircleOutlineOutlinedIcon />,
            Delete: (props) => <DeleteIcon />,
            Clear: (props) => <DeleteIcon />,
            Check: (props) => <CheckIcon />,
            Search: (props) => <SearchIcon />,
            ResetSearch: (props) => <DeleteIcon />,
          }}
          // editable={{
          //   onRowUpdate: (newData, oldData) =>
          //     new Promise((resolve, reject) => {
          //       setTimeout(() => {
          //         const dataUpdate = [...expensesdata];
          //         const index = oldData.tableData.id;
          //         dataUpdate[index] = newData;
          //         setExpensesdata([...dataUpdate]);
          //         //approve_Expense(newData);

          //         resolve();
          //       }, 1000);
          //     }),
          // }}
          actions={[
            (rowData) => ({
              disabled: rowData.status !== "Pending",
              icon: "edit",
              tooltip: "Edit Record",
              onClick: (event, rowData) => {
                update_Expense(rowData);
              },
            }),
            (rowData) => ({
              disabled: rowData.status !== "Pending",
              icon: "delete",
              tooltip: "Delete Record",
              onClick: (event, rowData) => {
                delete_Expense(rowData);
              },
            }),
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
          components={{
            Toolbar: (props) => (
              <div>
                <MTableToolbar {...props} />
              </div>
            ),
          }}
        />
        <CustomDialog
          isOpen={isDialogOpen}
          handleClose={handleDialogClose}
          title=""
          showButton={true}
          isFullscreen={false}
          isFullwidth={false}
        >
          <ExpenseForm
            formdata={formdata}
            setFormdata={setFormdata}
            handleDialogClose={handleDialogClose}
          />
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
