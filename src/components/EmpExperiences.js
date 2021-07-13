import React, { useEffect } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import { useEmployeesContext } from "../context/employees_context";
import { useTablesContext } from "../context/tables_context";
import { useExperiences } from "./experiences/useExperiences";
import { useUpdateExperiences } from "./experiences/useUpdateExperiences";
import { useAddExperiences } from "./experiences/useAddExperiences";
import { useDeleteExperiences } from "./experiences/useDeleteExperiences";

const columns = [
  {
    title: "Company",
    field: "company",
  },
  {
    title: "Location",
    field: "location",
  },
  {
    title: "Position",
    field: "position",
  },
  {
    title: "From Date",
    field: "from_date",
    type: "date",
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
    editComponent: (props) => (
      <TextField
        //defaultValue={props.value || new Date()}
        onChange={(e) => props.onChange(e.target.value)}
        type="date"
      />
    ),
  },
  { title: "Remark", field: "remark" },
];

export default function Emp_Experiences({
  experiencedata,
  setExperiencedata,
  handleDialogClose,
}) {
  const classes = useStyles();
  const { experiences, setExperienceId } = useExperiences();
  const updateExperiences = useUpdateExperiences();
  const addExperiences = useAddExperiences();
  const deleteExperiences = useDeleteExperiences();
  const { editEmployeeID } = useEmployeesContext();

  useEffect(() => {
    setExperienceId(editEmployeeID);
  }, []);

  const update_Experience = (data) => {
    const { id, rec_id, tableData, ...fields } = data;
    updateExperiences({ id, ...fields });
  };

  const add_Experience = (data) => {
    addExperiences({ ...data, empid: editEmployeeID });
  };

  const delete_Experience = (data) => {
    const { id } = data;
    deleteExperiences(id);
  };

  return (
    <div className={classes.root}>
      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={experiences}
          title="Experience"
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  add_Experience(newData);
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  update_Experience(newData);
                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  delete_Experience(oldData);
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
