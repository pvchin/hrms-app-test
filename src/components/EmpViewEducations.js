import React, { useEffect } from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { useEmployeesContext } from "../context/employees_context";
import { useTablesContext } from "../context/tables_context";

const columns = [
  {
    title: "Institution",
    field: "institution",
  },
  {
    title: "Course",
    field: "course",
  },
  {
    title: "From Date",
    field: "from_date",
    type: "date",
  },
  {
    title: "To Date",
    field: "to_date",
    type: "date",
    dateSetting: { locale: "en-GB" },
  },
];

export default function Emp_Educations() {
  const classes = useStyles();
  const { editEmployeeID } = useEmployeesContext();

  const {
    loadSingleBatchEducation,
    singlebatcheducation,
    singlebatch_education_loading,
  } = useTablesContext();

  useEffect(() => {
    loadSingleBatchEducation(editEmployeeID);
  }, []);

  if (singlebatch_education_loading) {
    return (
      <div>
        <h2>Loading...Education</h2>
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={singlebatcheducation}
          title="Experience"
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
