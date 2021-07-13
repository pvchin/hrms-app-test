import React, { useState, useEffect } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Icon, TextField, MenuItem } from "@material-ui/core";
import { useEmployeesContext } from "../context/employees_context";
import { useTablesContext } from "../context/tables_context";
import { useEmployees } from "./employees/useEmployees";
import { useUpdateEmployees } from "./employees/useUpdateEmployees";

const columns = [
  {
    title: "Name",
    field: "name",
    editable: "never",
  },
  {
    title: "Department",
    field: "department",
    editable: "never",
  },
  {
    title: "Designation",
    field: "designation",
    editable: "never",
  },
  {
    title: "Role",
    field: "role",
    lookup: { 1: "Staff", 2: "Admin", 3: "AdminManager", 4: "Manager" },
  },
];

export default function UserAccessTable() {
  const classes = useStyles();
  const { employees } = useEmployees();
  const updateEmployees = useUpdateEmployees();
  const { editEmployeeID } = useEmployeesContext();

  const update_rec = (data) => {
    const { id, rec_id, role, ...fields } = data;
    updateEmployees({ id, role: parseInt(role, 10), ...fields });
  };

  return (
    <div className={classes.root}>
      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={employees}
          title="User Access Table"
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...employees];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  update_rec(newData);

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
                <div style={{ padding: "5px 10px" }}></div>
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
