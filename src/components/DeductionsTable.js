import React from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";

import { useDeductions } from "./deductions/useDeductions";
import { useTablesContext } from "../context/tables_context";
import { useUpdateDeductions } from "./deductions/useUpdateDeductions";
import { useDeleteDeductions } from "./deductions/useDeleteDeductions";
import { useAddDeductions } from "./deductions/useAddDeductions";

const columns = [
  {
    title: "Name",
    field: "name",
  },
];

export default function UpdateDeductions() {
  const classes = useStyles();
  const { deductions } = useDeductions();
  const updateDeductions = useUpdateDeductions();
  const deleteDeductions = useDeleteDeductions();
  const addDeductions = useAddDeductions();

  const {
    //loadDeductions,
    //deductions,
    deductions_loading,
    addDeduction,
    deleteDeduction,
    updateDeduction,
  } = useTablesContext();

  // useEffect(() => {
  //   loadDeductions();
  // }, []);

  const update_Deduction = (data) => {
    const { id, rec_id, ...fields } = data;
    updateDeductions({ id, ...fields });
  };

  const add_Deduction = (data) => {
    addDeductions(data);
  };

  const delete_Deduction = (data) => {
    const { id } = data;
    deleteDeductions(id);
  };

  return (
    <div className={classes.root}>
      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={deductions}
          title="Deductions"
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  add_Deduction(newData);
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  update_Deduction(newData);
                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  delete_Deduction(oldData);
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
