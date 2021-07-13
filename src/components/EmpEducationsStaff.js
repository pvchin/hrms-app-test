import React, { useEffect } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { Button, Icon, TextField } from "@material-ui/core";
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
    dateSetting: { locale: "en-GB" },
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
    dateSetting: { locale: "en-GB" },
    editComponent: (props) => (
      <TextField onChange={(e) => props.onChange(e.target.value)} type="date" />
    ),
  },
  {
    title: "Archievement",
    field: "archievement",
  },

  { title: "Grade", field: "grade" },
  {
    title: "Remark",
    field: "remark",
  },
];

export default function EmpEducationsStaff({
  educationdata,
  setEducationdata,
  handleDialogClose,
}) {
  const classes = useStyles();
  const { editEmployeeID } = useEmployeesContext();

  const {
    singlebatcheducation,
    addEducation,
    deleteEducation,
    updateEducation,
    singlebatch_education_loading,
  } = useTablesContext();

  //useEffect(() => {}, [educationdata]);

  const Save_EducationData = () => {
    //console.log(educationdata);
    // delete unwanted data
    singlebatcheducation.forEach((row) => {
      const { id, rec_id } = row;
      const res = educationdata.find((r) => r.rec_id === rec_id);
      if (!res) {
        deleteEducation(id);
      }
    });

    //add or update new data

    educationdata.forEach((data) => {
      const { id, institution, course, from_date, to_date, grade, remark } =
        data;
      if (id) {
        const { id, rec_id, tableData, ...fields } = data;
        updateEducation({ id, ...fields });
      } else {
        addEducation({
          institution,
          course,
          from_date,
          to_date,
          grade,
          remark,
          empid: editEmployeeID,
        });
      }
    });

    handleDialogClose();
  };

  // const update_Education = (data) => {
  //   updateEducation({ id: data.id, ...data });
  //   loadSingleBatchEducation(editEmployeeID);
  // };

  // const add_Education = (data) => {
  //   addEducation({ ...data, empid: editEmployeeID });
  //   loadSingleBatchEducation(editEmployeeID);
  // };

  // const delete_Education = (data) => {
  //   const { id } = data;
  //   deleteEducation(id);
  //   loadSingleBatchEducation(editEmployeeID);
  // };

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
          data={educationdata}
          title="Education"
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  setEducationdata([...educationdata, newData]);
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...educationdata];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;
                  setEducationdata([...dataUpdate]);

                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataDelete = [...educationdata];
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                  setEducationdata([...dataDelete]);

                  resolve();
                }, 1000);
              }),
          }}
          options={{
            filtering: true,
            headerStyle: {
              backgroundColor: "orange",
              color: "#FFF",
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
                    onClick={Save_EducationData}
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
