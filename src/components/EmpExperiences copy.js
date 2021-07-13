import React, { useEffect } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { Button, Icon, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useEmployeesContext } from "../context/employees_context";
import { useTablesContext } from "../context/tables_context";

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
  const { editEmployeeID } = useEmployeesContext();
  const {
    loadSingleBatchExperience,
    singlebatchexperience,
    addExperience,
    deleteExperience,
    updateExperience,
    singlebatch_experience_loading,
  } = useTablesContext();

  useEffect(() => {}, [experiencedata]);

  const Save_ExperienceData = () => {
    //console.log(experiencedata);
    // delete unwanted data
    singlebatchexperience.forEach((row) => {
      const { id, rec_id } = row;
      const res = experiencedata.find((r) => r.rec_id === rec_id);
      if (!res) {
        deleteExperience(id);
      }
    });

    //add or update new data
    experiencedata.forEach((data) => {
      const { id, company, location, position, from_date, to_date, remark } =
        data;
      if (id) {
        const { id, rec_id, tableData, ...fields } = data;
        updateExperience({ id, ...fields });
      } else {
        addExperience({
          company,
          location,
          position,
          from_date,
          to_date,
          remark,
          empid: editEmployeeID,
        });
      }
    });

    loadSingleBatchExperience(editEmployeeID);
    handleDialogClose();
  };

  // const update_Experience = (data) => {
  //   const { id, rec_id, ...fields } = data;
  //   updateExperience({ id, ...fields });
  //   loadSingleBatchExperience(editEmployeeID);
  // };

  // const add_Experience = (data) => {
  //   addExperience({ ...data, empid: editEmployeeID });
  //   loadSingleBatchExperience(editEmployeeID);
  // };

  // const delete_Experience = (data) => {
  //   const { id } = data;
  //   deleteExperience(id);
  //   loadSingleBatchExperience(editEmployeeID);
  // };

  if (singlebatch_experience_loading) {
    return (
      <div>
        <h2>Loading...Experience</h2>
      </div>
    );
  }
  return (
    <div className={classes.root}>
      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={experiencedata}
          title="Experience"
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  setExperiencedata([...experiencedata, newData]);
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...experiencedata];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  setExperiencedata([...dataUpdate]);

                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataDelete = [...experiencedata];
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                  setExperiencedata([...dataDelete]);

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
                    onClick={Save_ExperienceData}
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
