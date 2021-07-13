import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import MaterialTable, { MTableToolbar } from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Icon, Button, MenuItem } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import {
  allowsPeriodState,
  allowsDataState,
  allowsDataDetlsState,
  empidState,
  loginLevelState,
} from "./data/atomdata";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import SearchIcon from "@material-ui/icons/Search";
import { CustomDialog } from "../helpers/CustomDialog";
import { useDailyAllowancesContext } from "../context/dailyallowances_context";
import DailyAllowancesAddPeriod from "./DailyAllowancesAddPeriod";
import DailyAllowsDetlsTableStaff from "./DailyAllowsDetlsTableStaff";

const columns = [
  {
    title: "Name",
    field: "name",
    editable: "never",
  },
  { title: "Period", field: "period", editable: "never" },
  { title: "Location", field: "location", editable: "never" },
  { title: "Manager Name", field: "manager_name", editable: "never" },
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
        {/* <MenuItem value="Approve">Approve</MenuItem>
        <MenuItem value="Reject">Reject</MenuItem>
        <MenuItem value="Cancel">Cancel</MenuItem> */}
      </TextField>
    ),
  },
];

export default function DailyAllowancesTableStaff() {
  let history = useHistory();
  const classes = useStyles();
  const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);
  const [isAddPeriodDialogOpen, setIsAddPeriodDialogOpen] = useState(false);
  const [tmpallowsdata, setTmpallowsdata] = useState([]);
  const [allowsdata, setAllowsdata] = useRecoilState(allowsDataState);
  const [allows_period, setAllows_period] = useRecoilState(allowsPeriodState);
  const [allows_empid, setAllows_empid] = useRecoilState(empidState);
  const [allowsdataId, setAllowsdataId] = useState("");
  const [toLoad, settoLoad] = useState(true);
  const [error, setError] = useState("");
  const [isAllowsDetlDialogOpen, setIsAllowsDetlDialogOpen] = useState(false);
  const title = `Site Allowances`;
  const {
    dailyallowances,
    loadEmpDailyAllowances,
    dailyallowances_loading,
    dailyallowances_error,
    updateDailyAllowance,
  } = useDailyAllowancesContext();

  useEffect(() => {
    loadEmpDailyAllowances(loginLevel.loginUserId);
  }, [toLoad]);

  const Save_DailyAllowancesData = () => {
    dailyallowances.forEach((data) => {
      const { id } = data;
      if (id) {
        const { id, rec_id, tableData, ...fields } = data;
        updateDailyAllowance({ id, ...fields });
      }
    });

    //handleDialogClose();
  };

  const update_SiteAllowsDetl = (data) => {
    const { id, empid, period, no_of_days, amount } = data;
    console.log(data);
    setAllowsdata({
      ...allowsdata,
      id: id,
      no_of_days: no_of_days,
      amount: amount,
      period: period,
      empid: empid,
    });
    setAllows_period(period);
    setAllows_empid(empid);
    setAllowsdataId(id);
    setIsAllowsDetlDialogOpen(true);
  };

  const add_SiteAllowsPeriod = () => {
    handleAddPeriodDialogOpen();
  };

  const handleAddPeriodDialogOpen = () => {
    setIsAddPeriodDialogOpen(true);
  };

  const handleAddPeriodDialogClose = () => {
    setIsAddPeriodDialogOpen(false);
  };

  const handleAllowsDetlDialogOpen = () => {
    setIsAllowsDetlDialogOpen(true);
  };

  const handleAllowsDetlDialogClose = () => {
    settoLoad(true);
    setIsAllowsDetlDialogOpen(false);
  };

  const Refresh_SiteAllows = () => {
    loadEmpDailyAllowances(loginLevel.loginUserId);
  };

  if (dailyallowances_loading) {
    return (
      <div>
        <h2>Loading... site allowances</h2>
      </div>
    );
  }
  if (dailyallowances_error) {
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
          data={dailyallowances}
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
          //         // const dataUpdate = [...dailyallowances];
          //         // const index = oldData.tableData.id;
          //         // dataUpdate[index] = newData;
          //         //setDailyAllowances([...dataUpdate]);
          //         //approve_Expense(newData);
          //         update_AllowsDetl();
          //         resolve();
          //       }, 1000);
          //     }),
          // }}
          actions={[
            {
              icon: "add",
              tooltip: "Add Record",
              isFreeAction: true,
              onClick: (event, rowData) => {
                add_SiteAllowsPeriod();
              },
            },
            {
              icon: "edit",
              tooltip: "Edit Record",
              onClick: (event, rowData) => {
                update_SiteAllowsDetl(rowData);
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
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  onClick={Refresh_SiteAllows}
                >
                  Refresh
                </Button>
                <div style={{ padding: "5px 10px" }}>
                  {error && (
                    <Alert severity="error" onClose={() => setError(false)}>
                      Period already existed!
                    </Alert>
                  )}
                </div>
              </div>
            ),
          }}
        />
        <div className={classes.dialog}>
          <CustomDialog
            isOpen={isAddPeriodDialogOpen}
            handleClose={handleAddPeriodDialogClose}
            title=""
            showButton={true}
            isFullscreen={false}
            isFullwidth={false}
          >
            <DailyAllowancesAddPeriod
              handleDialogClose={handleAddPeriodDialogClose}
            />
          </CustomDialog>
        </div>
        <div>
          <CustomDialog
            isOpen={isAllowsDetlDialogOpen}
            handleClose={handleAllowsDetlDialogClose}
            title=""
            showButton={true}
            isFullscreen={false}
            isFullwidth={false}
          >
            <DailyAllowsDetlsTableStaff
              allowsdata={allowsdata}
              allowsdataId={allowsdataId}
              handleDialogClose={handleAllowsDetlDialogClose}
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
  dialog: {
    width: 1000,
  },
}));
