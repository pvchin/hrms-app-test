import React, { useState, useEffect } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Icon, TextField, MenuItem } from "@material-ui/core";
import { useEmployeesContext } from "../context/employees_context";
import { useTablesContext } from "../context/tables_context";

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
  const [familydata, setFamilydata] = useState([]);
  const { editEmployeeID } = useEmployeesContext();
  const {
    singlebatchfamily,
    addFamily,
    deleteFamily,
    updateFamily,
    singlebatch_family_loading,
    singlebatch_family_error,
    loadSingleBatchFamily,
  } = useTablesContext();

  //useEffect(() => {}, [familydata]);
  useEffect(() => {
    loadSingleBatchFamily(editEmployeeID);
  }, []);

  const Save_FamilyData = () => {
    // delete unwanted data
    singlebatchfamily.forEach((row) => {
      const { id, rec_id } = row;
      const res = familydata.find((r) => r.rec_id === rec_id);
      if (!res) {
        deleteFamily(id);
      }
    });
    //add or update new data

    familydata.forEach((data) => {
      const { id, name, relationship, birth_date, phone, age } = data;
      if (id) {
        const { id, rec_id, tableData, ...fields } = data;
        updateFamily({ id, ...fields });
      } else {
        addFamily({
          name,
          relationship,
          birth_date,
          phone,
          age,
          empid: editEmployeeID,
        });
      }
    });

    //handleDialogClose();
  };

  // const update_Family = (data) => {
  //   const { id, rec_id, tableData, ...fields } = data;
  //   setTimeout(() => {}, 1000);

  //   updateFamily({ id, ...fields });
  //   //loadSingleBatchFamily(editEmployeeID);
  //   //loadSingleBatchFamily(editEmployeeID);
  // };

  // const add_Family = (data) => {
  //   addFamily({ ...data, empid: editEmployeeID });
  //   //loadSingleBatchFamily(editEmployeeID);
  // };

  // const delete_Family = (data) => {
  //   const { id } = data;
  //   deleteFamily(id);
  //   //loadSingleBatchFamily(editEmployeeID);
  // };

  if (singlebatch_family_loading) {
    return (
      <div>
        <h2>Loading...Family</h2>
      </div>
    );
  }
  if (!singlebatch_family_loading) {
    //setFamilydata([...singlebatchfamily]);
    return (
      <div className={classes.root}>
        <div style={{ maxWidth: "100%", paddingTop: "5px" }}>
          <MaterialTable
            columns={columns}
            data={singlebatchfamily}
            title="Family"
            editable={{
              onRowAdd: (newData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    setFamilydata([...familydata, newData]);
                    resolve();
                  }, 1000);
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const dataUpdate = [...familydata];
                    const index = oldData.tableData.id;
                    dataUpdate[index] = newData;
                    setFamilydata([...dataUpdate]);

                    resolve();
                  }, 1000);
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const dataDelete = [...familydata];
                    const index = oldData.tableData.id;
                    dataDelete.splice(index, 1);
                    setFamilydata([...dataDelete]);

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
                      onClick={Save_FamilyData}
                    >
                      Update <Icon className={classes.rightIcon}>send</Icon>
                    </Button>
                  </div>
                </div>
              ),
            }}
            // localization={{
            //   body: {
            //     dateTimePickerLocalization: enGB,
            //   },
            // }}
          />
        </div>
      </div>
    );
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
  },
}));
