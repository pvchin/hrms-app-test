import React, { useState, useEffect } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Icon, TextField } from "@material-ui/core";
import { useEmployeesContext } from "../context/employees_context";
import { useTrainingsContext } from "../context/trainings_context";

const columns = [
  {
    title: "Institute",
    field: "institute",
  },
  {
    title: "Course",
    field: "course",
  },
  {
    title: "From Date",
    field: "from_date",
    type: "date",
    dateSetting: { locale: "en-GB" },
    editComponent: (props) => (
      <TextField
        //defaultValue={props.value || new Date()}
        onChange={(e) => props.onChange(e.target.value)}
        type="date"
      />
    ),
  },
  {
    title: "To Date",
    field: "to_date",
    type: "date",
    dateSetting: { locale: "en-GB" },
    editComponent: (props) => (
      <TextField
        //defaultValue={props.value || new Date()}
        onChange={(e) => props.onChange(e.target.value)}
        type="date"
      />
    ),
  },
  {
    title: "Expiry Date",
    field: "expiry_date",
    type: "date",
    dateSetting: { locale: "en-GB" },
    editComponent: (props) => (
      <TextField
        //defaultValue={props.value || new Date()}
        onChange={(e) => props.onChange(e.target.value)}
        type="date"
      />
    ),
  },
];

export default function Emp_Training({
  trainingdata,
  setTrainingdata,
  handleDialogClose,
}) {
  const classes = useStyles();

  const { editEmployeeID } = useEmployeesContext();
  const {
    getSingleBatchTraining,
    singlebatch_training,
    addTraining,
    deleteTraining,
    updateTraining,
    singlebatch_training_loading,
  } = useTrainingsContext();

  useEffect(() => {}, [trainingdata]);

  const Save_TrainingData = () => {
    //console.log(trainingdata);
    // delete unwanted data
    singlebatch_training.forEach((row) => {
      const { id, rec_id } = row;
      const res = trainingdata.find((r) => r.rec_id === rec_id);
      if (!res) {
        deleteTraining(id);
      }
    });

    //add or update new data

    trainingdata.forEach((data) => {
      const { id, institute, course, from_date, to_date, expiry_date } = data;
      if (id) {
        const { id, rec_id, tableData, ...fields } = data;
        updateTraining({ id, ...fields });
      } else {
        addTraining({
          institute,
          course,
          from_date,
          to_date,
          expiry_date,
          empid: editEmployeeID,
        });
      }
    });

    getSingleBatchTraining(editEmployeeID);
    handleDialogClose();
  };

  if (singlebatch_training_loading) {
    return (
      <div>
        <h2>Loading...Training</h2>
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={trainingdata}
          title="Training"
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  setTrainingdata([...trainingdata, newData]);
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...trainingdata];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  setTrainingdata([...dataUpdate]);

                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataDelete = [...trainingdata];
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                  setTrainingdata([...dataDelete]);

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
                    onClick={Save_TrainingData}
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
  },
}));
