import React from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { useAllowances } from "./allowances/useAllowances";
import { useUpdateAllowances } from "./allowances/useUpdateAllowances";
import { useDeleteAllowances } from "./allowances/useDeleteAllowances";
import { useAddAllowances } from "./allowances/useAddAllowances";

const columns = [
  {
    title: "Name",
    field: "name",
  },
];

export default function UpdateAllowances() {
  const classes = useStyles();
  const { allowances } = useAllowances();
  const updateAllowances = useUpdateAllowances();
  const deleteAllowances = useDeleteAllowances();
  const addAllowances = useAddAllowances();

  const update_Allowance = (data) => {
    const { id, rec_id, ...fields } = data;
    updateAllowances({ id, ...fields });
  };

  const add_Allowance = async (data) => {
    addAllowances(data);
  };

  const delete_Allowance = (data) => {
    const { id } = data;
    deleteAllowances(id);
  };

  return (
    <div className={classes.root}>
      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={allowances}
          title="Allowances"
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  add_Allowance(newData);
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  update_Allowance(newData);
                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  delete_Allowance(oldData);
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
