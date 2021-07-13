import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import MaterialTable, { MTableToolbar } from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Icon, Button, MenuItem } from "@material-ui/core";
import {
  useSetRecoilState,
  useRecoilValue,
  useRecoilState,
  useRecoilValueLoadable,
} from "recoil";
import {
  allowsPeriodState,
  allowsDataState,
  empidState,
} from "./data/atomdata";
import { fetchDailyAllowancesSelector } from "./data/selectordata";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import SearchIcon from "@material-ui/icons/Search";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { CustomDialog } from "../helpers/CustomDialog";
import { useDailyAllowancesContext } from "../context/dailyallowances_context";
//import { useEmployeesContext } from "../context/employees_context";
import DailyAllowsDetlsTable from "./DailyAllowsDetlsTable";

const FILTERSTRING = "Pending";

const columns = [
  {
    title: "Name",
    field: "name",
    editable: "never",
  },
  { title: "Period", field: "period", editable: "never" },
  { title: "Location", field: "location", editable: "never" },
  { title: "Manager Name", field: "manager", editable: "never" },
  {
    title: "No Of Days",
    field: "no_of_days",
    type: "numeric",
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

export default function DailyAllowancesTable({
  dailyallowancesdata,
  setDailyAllowancesdata,
  update_dailyallowance_error,
  handleDialogClose,
}) {
  let history = useHistory();
  const classes = useStyles();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tmpallowsdata, setTmpallowsdata] = useState([]);
  const allows_period = useRecoilValue(allowsPeriodState);
  const allows_empid = useRecoilValue(empidState);
  const [allowsdata, setAllowsdata] = useRecoilState(allowsDataState);
  const setEmpID = useSetRecoilState(empidState);
  const title = `Site Allowances (${allows_period})`;
  const {
    dailyallowances_loading,
    singlebatch_dailyallowance,
    singlebatch_dailyallowance_loading,
    deleteDailyAllowance,
    updateDailyAllowance,
    setEditDailyAllowanceID,
    setIsDailyAllowanceEditingOn,
    setIsDailyAllowanceEditingOff,
    resetSingleDailyAllowance,
    dailyallowance_period,
    getSingleBatchDailyAllowance,
  } = useDailyAllowancesContext();

  const Save_DailyAllowancesData = () => {
    dailyallowancesdata.forEach((data) => {
      const { id } = data;
      if (id) {
        const { id, rec_id, tableData, ...fields } = data;
        updateDailyAllowance({ id, ...fields });
      }
    });

    handleDialogClose();
  };

  const Approve_DailyAllowancesData = () => {
    dailyallowancesdata.forEach((rec) => {
      if (rec.tableData.checked) {
        updateDailyAllowance({ id: rec.id, status: "Approve" });
        //update leavesdata
        if (!update_dailyallowance_error) {
          const recdata = dailyallowancesdata.filter((r) => r.id === rec.id);
          recdata[0].status = "Approve";
        }
      }
    });
    dailyallowancesdata.forEach((d) => {
      if (d.tableData) d.tableData.checked = false;
    });
  };

  const Reject_DailyAllowancesData = () => {
    dailyallowancesdata.forEach((rec) => {
      if (rec.tableData.checked) {
        updateDailyAllowance({ id: rec.id, status: "Reject" });
        //update leavesdata
        if (!update_dailyallowance_error) {
          const recdata = dailyallowancesdata.filter((r) => r.id === rec.id);
          recdata[0].status = "Reject";
        }
      }
    });
    dailyallowancesdata.forEach((d) => {
      if (d.tableData) d.tableData.checked = false;
    });
  };

  if (dailyallowances_loading) {
    return (
      <div>
        <h2>Loading... daily allowances</h2>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={dailyallowancesdata}
          title={title}
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
          //         const dataUpdate = [...dailyallowancesdata];
          //         const index = oldData.tableData.id;
          //         dataUpdate[index] = newData;
          //         setDailyAllowancesdata([...dataUpdate]);
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
                    onClick={Approve_DailyAllowancesData}
                  >
                    Approve
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={Reject_DailyAllowancesData}
                  >
                    Reject
                  </Button>
                  {/* <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={Save_DailyAllowancesData}
                  >
                    Update <Icon className={classes.rightIcon}>send</Icon>
                  </Button> */}
                </div>
              </div>
            ),
          }}
        />
        <div className={classes.dialog}>
          <CustomDialog
            isOpen={isDialogOpen}
            handleClose={handleDialogClose}
            title=""
            showButton={true}
            isFullscreen={true}
            isFullwidth={true}
          >
            <DailyAllowsDetlsTable
              setAllowsdata={setAllowsdata}
              allowsdata={allowsdata}
              handleDialogClose={handleDialogClose}
            />
          </CustomDialog>
        </div>
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
  dialog: {
    width: 1000,
  },
}));
