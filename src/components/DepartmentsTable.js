import React from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { useDepartments } from "./departments/useDepartments";
import { useUpdateDepartments } from "./departments/useUpdateDepartments";
import { useDeleteDepartments } from "./departments/useDeleteDepartments";
import { useAddDepartments } from "./departments/useAddDepartments";

const columns = [
  {
    title: "Name",
    field: "name",
  },
];

export default function UpdateDepartments() {
  const classes = useStyles();
  const { departments } = useDepartments();
  const updateDepartments = useUpdateDepartments();
  const deleteDepartments = useDeleteDepartments();
  const addDepartments = useAddDepartments();

  const update_Department = (data) => {
    const { id, rec_id, ...fields } = data;
    updateDepartments({ id, ...fields });
  };

  const add_Department = (data) => {
    addDepartments(data);
  };

  const delete_Department = (data) => {
    const { id } = data;
    deleteDepartments(id);
  };

  return (
    <div className={classes.root}>
      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={departments}
          title="Departments"
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  add_Department(newData);
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  update_Department(newData);

                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  delete_Department(oldData);
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
