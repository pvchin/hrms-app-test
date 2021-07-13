import React from "react";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";

import { useDesignations } from "./designations/useDesignations";
import { useUpdateDesignations } from "./designations/useUpdateDesignations";
import { useDeleteDesignations } from "./designations/useDeleteDesignations";
import { useAddDesignations } from "./designations/useAddDesignations";

const columns = [
  {
    title: "Name",
    field: "name",
  },
];

export default function UpdateDesignations() {
  const classes = useStyles();
  const { designations } = useDesignations();
  const updateDesignations = useUpdateDesignations();
  const deleteDesignations = useDeleteDesignations();
  const addDesignations = useAddDesignations();

  const update_Designation = (data) => {
    const { id, rec_id, ...fields } = data;
    updateDesignations({ id, ...fields });
  };

  const add_Designation = (data) => {
    addDesignations(data);
  };

  const delete_Designation = (data) => {
    const { id } = data;
    deleteDesignations(id);
  };

  return (
    <div className={classes.root}>
      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={designations}
          title="Designatioms"
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  add_Designation(newData);
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  update_Designation(newData);
                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  delete_Designation(oldData);
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
