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
import { useLeavesContext } from "../context/leaves_context";
import { useEmployeesContext } from "../context/employees_context";

const FILTERSTRING = "Pending"

const columns = [
  {
    title: "Name",
    field: "name",
    editable: "never",
  },
  {
    title: "From",
    field: "from_date",
    type: "date",
    dateSetting: { locale: "en-GB" },
    editable: "never",
  },
  {
    title: "To",
    field: "to_date",
    type: "date",
    dateSetting: { locale: "en-GB" },
    editable: "never",
  },
  { title: "Days", field: "no_of_days", editable: "never" },
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



export default function LeaveTableView() {
  const classes = useStyles();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { loadEmployees } = useEmployeesContext();
  const {
    leaves,
    leaves_error,
    editLeaveID,
    leaves_loading,
    deleteLeave,
    loadPendingLeaves,
    getSingleLeave,
    setEditLeaveID,
    setIsLeaveEditingOn,
    setIsLeaveEditingOff,
    resetSingleLeave,
  } = useLeavesContext();

  useEffect(() => {
    loadPendingLeaves(FILTERSTRING);
  }, []);
 
  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    loadPendingLeaves(FILTERSTRING);
  };

  const handleAlertOpen = () => {
    setIsAlertOpen(true);
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
  };

  const handleOnDeleteConfirm = () => {
    const id = editLeaveID;
    deleteLeave(id);
    loadPendingLeaves(FILTERSTRING);
  };

  if (leaves_loading) {
    return (
      <div>
        <h2>Loading...Leaves</h2>
      </div>
    );
  }
  if (leaves_error) {
    return (
      <div>
        <h2>Internet connection problem!</h2>
      </div>
    )
  }
  return (
    <div className={classes.root}>
      {/* <h1>Expenses Claims Application</h1> */}

      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={leaves}
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
