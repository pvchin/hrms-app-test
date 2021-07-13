import React, { useEffect } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
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
    filtering: false,
    dateSetting: { locale: "en-GB" },
  },
  {
    title: "To Date",
    field: "to_date",
    type: "date",
    filtering: false,
    dateSetting: { locale: "en-GB" },
  },
  {
    title: "Expiry Date",
    field: "expiry_date",
    type: "date",
    filtering: false,
    dateSetting: { locale: "en-GB" },
  },
];

export default function Emp_ViewFamily() {
  const classes = useStyles();
  const { editEmployeeID } = useEmployeesContext();
  const {
    singlebatch_training,
    getSingleBatchTraining,
    singlebatch_training_loading,
  } = useTrainingsContext();

  useEffect(() => {
    getSingleBatchTraining(editEmployeeID);
  }, []);

  if (singlebatch_training_loading) {
    return (
      <div>
        <h2>Loading...Trainings</h2>
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={singlebatch_training}
          title=""
          options={{
            search: false,
            toolbar: false,
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
