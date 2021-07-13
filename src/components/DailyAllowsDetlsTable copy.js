import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import MaterialTable, { MTableToolbar } from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Icon, Button } from "@material-ui/core";
import {
  selector,
  useRecoilValue,
  useRecoilState,
  useRecoilValueLoadable,
  useRecoilStateLoadable,
} from "recoil";
import {
  allowsPeriodState,
  allowsDataState,
  empidState,
} from "./data/atomdata";
import { fetchDailyAllowsDetlsSelector } from "./data/selectordata";
import { useDailyAllowancesContext } from "../context/dailyallowances_context";

const columns = [
  {
    title: "Date",
    field: "date",
    type: "date",
    dateSetting: { locale: "en-GB" },
    editComponent: (props) => (
      <TextField
        defaultValue={props.value || null}
        onChange={(e) => props.onChange(e.target.value)}
        type="date"
      />
    ),
  },
  { title: "District", field: "district" },
  { title: "Operation Type", field: "typeoperation" },
  { title: "Client", field: "client" },
  { title: "Location/Rig", field: "location" },
  { title: "Ticket No/Job No", field: "jobno" },
  { title: "Crew Operation", field: "crewoperation" },
  {
    title: "Job Bonus",
    field: "jobbonus",
    type: "currency",
    cellStyle: {
      width: 8,
      maxWidth: 8,
    },
    headerStyle: {
      width: 8,
      maxWidth: 8,
    },
  },
  {
    title: "Per Diem",
    field: "perdiem",
    type: "currency",
    cellStyle: {
      width: 8,
      maxWidth: 8,
    },
    headerStyle: {
      width: 8,
      maxWidth: 8,
    },
  },
];

export default function DailyAllowsDetlsTable({
  setAllowsdata,
  allowsdata,
  handleDialogClose,
}) {
  let history = useHistory();
  const classes = useStyles();
  // const [allowsDetlsTable, setAllowsDetlsTable] =
  // useRecoilState(allowsDataDetlsState);
  //console.log("detlstable", singlebatch_dailyallowsdetl);
  //const [allowsDetlsdata, setAllowsDetilsdata] = useRecoilStateLoadable(fetchDailyAllowsDetlsSelector);
  const allows_period = useRecoilValue(allowsPeriodState);
  const allows_empid = useRecoilValue(empidState);
  const {
    dailyallowsdetls,
    addDailyAllowsDetl,
    dailyallowsdetls_loading,
    updateDailyAllowsDetl,
    deleteDailyAllowsDetl,
    getSingleBatchDailyAllowsDetl,
    singlebatch_dailyallowsdetl,
    singlebatch_dailyallowsdetl_loading,
    dailyallowance_period,
    single_dailyallowance,
    editDailyAllowanceID,
  } = useDailyAllowancesContext();

  useEffect(() => {
    getSingleBatchDailyAllowsDetl(editDailyAllowanceID, allows_period);
  }, []);

  // const add_DailyAllowsDetl = async (data) => {
  //   console.log("add", data);
  //   const { description, amount } = data;
  //   addDailyAllowsDetl({
  //     description: description,
  //     amount: amount,
  //     name: single_dailyallowance.name,
  //     empid: single_dailyallowance.empid,
  //     period: dailyallowance_period,
  //   });
  // };

  // const delete_DailyAllowance = (data) => {
  //   const { id } = data;
  //   deleteDailyAllowsDetl(id);
  //   //update_Daily Allowances Details;
  //   getSingleBatchDailyAllowsDetl(
  //     single_dailyallowance.empid,
  //     dailyallowance_period
  //   );
  // };

  const Save_Allowsdata = () => {
    // delete unwanted data
    singlebatch_dailyallowsdetl.forEach((row) => {
      const { id, rec_id, name } = row;
      const res = allowsdata.find((r) => r.rec_id === rec_id);
      if (!res) {
        deleteDailyAllowsDetl(id);
      }
    });

    //add or update new data
    {
      allowsdata.forEach((data) => {
        const {
          id,
          date,
          district,
          typeoperation,
          client,
          location,
          jobno,
          crewoperation,
          jobbonus,
          perdiem,
        } = data;
        if (id) {
          const { id, rec_id, tableData, ...fields } = data;
          updateDailyAllowsDetl({ id, ...fields });
        } else {
          addDailyAllowsDetl({
            date,
            district,
            typeoperation,
            client,
            location,
            jobno,
            crewoperation,
            jobbonus,
            perdiem,
            empid: editDailyAllowanceID,
            period: dailyallowance_period,
          });
        }
      });
    }

    handleDialogClose();
  };

  if (dailyallowsdetls_loading) {
    return <div>
      <h2>Loading.... daily site allowances</h2>
    </div>
  }
    return (
      <div className={classes.root}>
        {/* <h1>Expenses Claims Application</h1> */}

        <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
          <MaterialTable
            columns={columns}
            data={singlebatch_dailyallowsdetl}
            title="Daily Allowances Details"
            editable={{
              onRowAdd: (newData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    setAllowsdata([...allowsdata, newData]);
                    resolve();
                  }, 1000);
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const dataUpdate = [...singlebatch_dailyallowsdetl];
                    const index = oldData.tableData.id;
                    dataUpdate[index] = newData;
                    //setAllowsDetlsTable([...dataUpdate]);
                    //editable = dataUpdate;
                    resolve();
                  }, 1000);
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    //const dataDelete = [...allowsDetlsTable];
                    const index = oldData.tableData.id;
                    //dataDelete.splice(index, 1);
                    //setAllowsDetlsTable([...dataDelete]);

                    resolve();
                  }, 1000);
                }),
            }}
            options={{
              filtering: true,
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
                      onClick={Save_Allowsdata}
                    >
                      Update <Icon className={classes.rightIcon}>send</Icon>
                    </Button>
                  </div>
                </div>
              ),
            }}
          />
        </div>
      </div>
    );
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    width: 1500,
  },
}));
