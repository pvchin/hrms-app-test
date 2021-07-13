import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import SearchIcon from "@material-ui/icons/Search";

import { CustomDialog } from "../helpers/CustomDialog";
import { AlertDialog } from "../helpers/AlertDialog";
import EmployeeView from "./EmployeeView";
import { useEmployeesContext } from "../context/employees_context";
import { useTablesContext } from "../context/tables_context";
import { useDepartments } from "./departments/useDepartments";
import { useDesignations } from "./designations/useDesignations";
import { useEmployees } from "./employees/useEmployees";
import { useDeleteEmployees } from "./employees/useDeleteEmployees";

const columns = [
  {
    title: "Name",
    field: "name",
  },
  { title: "IC No", field: "ic_no" },
  { title: "Gender", field: "gender" },
  { title: "Age", field: "age", type: "numeric" },
  { title: "Email", field: "email" },
];

export default function AllEmployeesTable() {
  let history = useHistory();
  const classes = useStyles();
  const { designations } = useDesignations();
  const { departments } = useDepartments();
  const { employees } = useEmployees();
  const deleteEmployees = useDeleteEmployees();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const {
    editEmployeeID,
    employees_loading,
    deleteEmployee,
    //loadEmployees,
    setEditEmployeeID,
    setIsEditingOn,
    setIsEditingOff,
    resetSingleEmployee,
    resetEmployees,
    getSingleEmployee,
  } = useEmployeesContext();

  const { loadDepartments, loadDesignations, resetTables } = useTablesContext();

  // useEffect(() => {
  //   resetEmployees();
  //   loadEmployees();
  // }, []);

  const update_Employee = async (data) => {
    const { id } = data;
    resetTables();
    resetSingleEmployee();
    resetEmployees();
    setEditEmployeeID(id);
    setIsEditingOn();
    getSingleEmployee(id);
    //handleDialogOpen();
    history.push("/singleemployee");
  };

  const add_Employee = async (data) => {
    resetSingleEmployee();
    setEditEmployeeID("");
    setIsEditingOff();
    //handleDialogOpen();
    history.push("/singleemployee");
  };

  const delete_Employee = (data) => {
    const { id } = data;
    setEditEmployeeID(id);
    handleAlertOpen();
    //deleteEmployee(id);
    //loadEmployees();
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    //loadEmployees();
  };

  const handleAlertOpen = () => {
    setIsAlertOpen(true);
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
  };

  const handleOnDeleteConfirm = () => {
    const id = editEmployeeID;
    deleteEmployees(id);
    //loadEmployees();
  };

  if (employees_loading) {
    return <div>Loading...</div>;
  } else {
    console.log(employees);
  }
  return (
    <div className={classes.root}>
      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={employees}
          title="Employees Listing"
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
                update_Employee(rowData);
              },
            },
            {
              icon: "delete",
              tooltip: "Delete Record",
              onClick: (event, rowData) => {
                delete_Employee(rowData);
              },
            },
            {
              icon: "add",
              tooltip: "Add Record",
              isFreeAction: true,
              onClick: (event, rowData) => {
                add_Employee(rowData);
              },
            },
          ]}
          options={{
            filtering: true,
            headerStyle: {
              backgroundColor: "primary",
              color: "secondary",
            },
            showTitle: true,
          }}
        />
        <CustomDialog
          isOpen={isDialogOpen}
          handleClose={handleDialogClose}
          title=""
          showButton={true}
          isFullscreen={true}
          isFullwidth={true}
        >
          <EmployeeView handleDialogClose={handleDialogClose} />
        </CustomDialog>

        <AlertDialog
          handleClose={handleAlertClose}
          onConfirm={handleOnDeleteConfirm}
          isOpen={isAlertOpen}
          title="Delete Employee"
        >
          <h2>Are you sure you want to delete ?</h2>
        </AlertDialog>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2),
  },
}));
