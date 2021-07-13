import React, { useState, useEffect } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Icon, TextField, MenuItem } from "@material-ui/core";
import { useEmployeesContext } from "../context/employees_context";

import { useFamily } from "./family/useFamily";
import { useUpdateFamily } from "./family/useUpdateFamily";
import { useAddFamily } from "./family/useAddFamily";
import { useDeleteFamily } from "./family/useDeleteFamily";

const columns = [
  {
    title: "Name",
    field: "name",
  },
  {
    title: "Relationship",
    field: "relationship",
    editComponent: (props) => (
      <TextField
        //defaultValue={props.value || null}
        onChange={(e) => props.onChange(e.target.value)}
        style={{ width: 100 }}
        value={props.value}
        select
      >
        <MenuItem value="Father">Father</MenuItem>
        <MenuItem value="Mother">Mother</MenuItem>
        <MenuItem value="Daughter">Daughter</MenuItem>
        <MenuItem value="Son">Son</MenuItem>
        <MenuItem value="Son-in-law">Son-in-law</MenuItem>
        <MenuItem value="Daughter-in-law">Daughter-in-law</MenuItem>
      </TextField>
    ),
  },
  {
    title: "BIrth Date",
    field: "birth_date",
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
  {
    title: "Phone",
    field: "phone",
  },
  { title: "Age", field: "age", type: "numeric" },
];

export default function Emp_Family() {
  const classes = useStyles();
  const { family, filter, setFilter, setFamilyId } = useFamily();
  const updateFamily = useUpdateFamily();
  const addFamily = useAddFamily();
  const deleteFamily = useDeleteFamily();
  const { editEmployeeID } = useEmployeesContext();

  const update_Family = (data) => {
    const { id, rec_id, tableData, ...fields } = data;
    updateFamily({ id, ...fields });
  };

  const add_Family = (data) => {
    addFamily({ ...data, empid: editEmployeeID });
  };

  const delete_Family = (data) => {
    const { id } = data;
    deleteFamily(id);
  };

  useEffect(() => {
    setFamilyId(editEmployeeID);
  }, []);

  return (
    <div className={classes.root}>
      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={family}
          title="Family"
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  // setFamilydata([...familydata, newData]);
                  add_Family(newData);
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  update_Family(newData);

                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  delete_Family(oldData);
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
