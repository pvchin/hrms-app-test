import React, { useEffect } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useEmployeesContext } from "../context/employees_context";
import { useEducations } from "./educations/useEducations";
import { useUpdateEducations } from "./educations/useUpdateEducations";
import { useAddEducations } from "./educations/useAddEducations";
import { useDeleteEducations } from "./educations/useDeleteEducations";

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

export default function Emp_Educations({
  educationdata,
  setEducationdata,
  handleDialogClose,
}) {
  const classes = useStyles();
  const { educations, setEducationId } = useEducations();
  const updateEducations = useUpdateEducations();
  const addEducations = useAddEducations();
  const deleteEducations = useDeleteEducations();
  const { editEmployeeID } = useEmployeesContext();

  useEffect(() => {
    setEducationId(editEmployeeID);
  }, []);

  const update_Education = (data) => {
    const { id, rec_id, tableData, ...fields } = data;
    updateEducations({ id, ...fields });
  };

  const add_Education = (data) => {
    addEducations({ ...data, empid: editEmployeeID });
  };

  const delete_Education = (data) => {
    const { id } = data;
    deleteEducations(id);
  };

  return (
    <div className={classes.root}>
      <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
        <MaterialTable
          columns={columns}
          data={educations}
          title="Education"
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  add_Education(newData);
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  update_Education(newData);
                  resolve();
                }, 1000);
              }),
            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  // const dataDelete = [...educationdata];
                  // const index = oldData.tableData.id;
                  // dataDelete.splice(index, 1);
                  delete_Education(oldData);

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
