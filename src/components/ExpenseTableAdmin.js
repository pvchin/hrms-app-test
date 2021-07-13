import React, { useState, useEffect } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { TextField, MenuItem, Button, Icon } from "@material-ui/core";
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

const FILTERSTRING = "Pending";

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

export default function ExpenseTable({
  expensesdata,
  setExpensesdata,
  handleDialogClose,
}) {
  const classes = useStyles();
  const [isLoad, setIsLoad] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { loadEmployees } = useEmployeesContext();
  const {
    editExpenseID,
    updateExpense,
    update_expense_error,
    expenses_loading,
    deleteExpense,
    loadPendingExpenses,
  } = useExpensesContext();

  // useEffect(() => {
  //   setExpensesdata(expenses);
  //   console.log(expensesdata)
  // }, []);

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

  const handleExpenseFormDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleExpenseFormDialogClose = () => {
    setIsDialogOpen(false);
    loadPendingExpenses(FILTERSTRING);
  };

  const handleExpenseFormAlertOpen = () => {
    setIsAlertOpen(true);
  };

  const handleExpenseFormAlertClose = () => {
    setIsAlertOpen(false);
  };

  const handleExpenseFormOnDeleteConfirm = () => {
    const id = editExpenseID;
    deleteExpense(id);
    loadPendingExpenses(FILTERSTRING);
  };

  const Save_ExpenseData = () => {
    expensesdata.forEach((data) => {
      const { id } = data;
      if (id) {
        const { id, rec_id, tableData, ...fields } = data;
        updateExpense({ id, ...fields });
      }
    });

    handleDialogClose();
  };

  const Approve_ExpenseData = () => {
    expensesdata.forEach((rec) => {
      if (rec.tableData.checked) {
        updateExpense({ id: rec.id, status: "Approve" });
        //update leavesdata
        if (!update_expense_error) {
          const recdata = expensesdata.filter((r) => r.id === rec.id);
          recdata[0].status = "Approve";
        }
      }
    });
    expensesdata.forEach((d) => {
      if (d.tableData) d.tableData.checked = false;
    });
  };

  const Reject_ExpenseData = () => {
    expensesdata.forEach((rec) => {
      if (rec.tableData.checked) {
        updateExpense({ id: rec.id, status: "Reject" });
        //update leavesdata
        if (!update_expense_error) {
          const recdata = expensesdata.filter((r) => r.id === rec.id);
          recdata[0].status = "Reject";
        }
      }
    });
    expensesdata.forEach((d) => {
      if (d.tableData) d.tableData.checked = false;
    });
  };

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
          options={{
            filtering: true,
            selection: true,
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
                <div style={{ padding: "5px 10px" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={Approve_ExpenseData}
                  >
                    Approve <Icon className={classes.rightIcon}>send</Icon>
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={Reject_ExpenseData}
                  >
                    Reject <Icon className={classes.rightIcon}>send</Icon>
                  </Button>
                  {/* <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={Save_ExpenseData}
                  >
                    Update <Icon className={classes.rightIcon}>send</Icon>
                  </Button> */}
                </div>
              </div>
            ),
          }}
        />
        <CustomDialog
          isOpen={isDialogOpen}
          handleClose={handleExpenseFormDialogClose}
          title=""
          showButton={true}
          isFullscree={false}
        >
          <ExpenseForm handleDialogClose={handleExpenseFormDialogClose} />
        </CustomDialog>

        <AlertDialog
          handleClose={handleExpenseFormAlertClose}
          onConfirm={handleExpenseFormOnDeleteConfirm}
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
  button: {
    margin: theme.spacing(1),
  },
}));
