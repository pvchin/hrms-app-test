import React, { useState, useEffect } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { TextField, MenuItem, Button, Icon } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useRecoilState } from "recoil";
import { loginLevelState } from "./data/atomdata";
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

const columns = [
  {
    title: "Name",
    field: "name",
    editable: "never",
  },
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
    title: "Leave Balance",
    field: "leave_bal",
    editable: "never",
    cellStyle: {
      width: 10,
      maxWidth: 10,
    },
  },
  {
    title: "Days",
    field: "no_of_days",
    editable: "never",
    cellStyle: {
      width: 10,
      maxWidth: 10,
    },
  },
  {
    title: "Reason",
    field: "reason",
    editable: "never",
    cellStyle: {
      width: 10,
      maxWidth: 10,
    },
  },
  {
    title: "Status",
    field: "status",
    editable: "never",
    cellStyle: {
      width: 50,
      maxWidth: 50,
    },
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

export default function LeaveTable({
  leavesdata,
  setLeavesdata,
  handleDialogClose,
}) {
  const classes = useStyles();
  const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const {
    editLeaveID,
    updateLeave,
    deleteLeave,
    loadLeaves,
    update_leave_error,
  } = useLeavesContext();

  const { employees, updateEmployee, update_employee_error } =
    useEmployeesContext();

  // useEffect(() => {
  //   loadLeaves();
  // }, []);

  const handleLeaveFormDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleLeaveFormDialogClose = () => {
    setIsDialogOpen(false);
    loadLeaves();
  };

  const handleLeaveFormAlertOpen = () => {
    setIsAlertOpen(true);
  };

  const handleLeaveFormAlertClose = () => {
    setIsAlertOpen(false);
  };

  const handleLeaveFormOnDeleteConfirm = () => {
    const id = editLeaveID;
    deleteLeave(id);
    loadLeaves();
  };

  const Approve_LeaveData = () => {
    leavesdata.forEach((rec) => {
      if (rec.tableData.checked) {
        updateLeave({ id: rec.id, status: "Approve" });
        //update leavesdata
        if (!update_leave_error) {
          const recdata = leavesdata.filter((r) => r.id === rec.id);
          recdata[0].status = "Approve";

          // update leave bal
          console.log("leave", rec.empid, employees);
          const empleavebal = employees
            .filter((r) => r.id === rec.empid)
            .map((item) => {
              return item.leave_bal;
            });
          const leavebal = empleavebal - rec.no_of_days;
          updateEmployee({ id: rec.empid, leave_bal: leavebal });
        }
      }
    });
    leavesdata.forEach((d) => {
      if (d.tableData) d.tableData.checked = false;
    });
  };

  const Reject_LeaveData = () => {
    leavesdata.forEach((rec) => {
      if (rec.tableData.checked) {
        updateLeave({ id: rec.id, status: "Reject" });
        //update leavesdata
        if (!update_leave_error) {
          const recdata = leavesdata.filter((r) => r.id === rec.id);
          recdata[0].status = "Reject";
        }
      }
    });
    leavesdata.forEach((d) => {
      if (d.tableData) d.tableData.checked = false;
    });
  };

  const Save_LeaveData = () => {
    leavesdata.forEach((data) => {
      const { id } = data;
      if (id) {
        const { id, rec_id, tableData, ...fields } = data;
        updateLeave({ id, ...fields });
      }
    });

    handleDialogClose();
  };

  // if (expenses_loading) {
  //   return (

  // if (leaves_loading) {
  //   return (
  //     <div>
  //       <h2>Loading...Leaves</h2>
  //     </div>
  //   );
  // }
  return (
    <div className={classes.root}>
      {/* <h1>Expenses Claims Application</h1> */}

      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={leavesdata}
          title="Leave Application"
          icons={{
            Add: (props) => <AddIcon />,
            Edit: (props) => <EditIcon />,
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
          //         const dataUpdate = [...leavesdata];
          //         const index = oldData.tableData.id;
          //         dataUpdate[index] = newData;
          //         setLeavesdata([...dataUpdate]);
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
              color: "primary",
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
                    onClick={Approve_LeaveData}
                  >
                    Approve
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={Reject_LeaveData}
                  >
                    Reject
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={Save_LeaveData}
                  >
                    Update <Icon className={classes.rightIcon}>send</Icon>
                  </Button>
                </div>
              </div>
            ),
          }}
        />
        <CustomDialog
          isOpen={isDialogOpen}
          handleClose={handleLeaveFormDialogClose}
          title=""
          showButton={true}
          isFullscree={false}
        >
          <LeaveForm handleDialogClose={handleLeaveFormDialogClose} />
        </CustomDialog>

        <AlertDialog
          handleClose={handleLeaveFormAlertClose}
          onConfirm={handleLeaveFormOnDeleteConfirm}
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
