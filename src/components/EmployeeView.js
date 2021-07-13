import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";
import CardLayout from "../helpers/CardLayout";
import CardLayout2 from "../helpers/CardLayout2";
import { CustomDialog } from "../helpers/CustomDialog";

import { useEmployeesContext } from "../context/employees_context";
import { useTablesContext } from "../context/tables_context";
import { useTrainingsContext } from "../context/trainings_context";
import EmpViewFamily from "./EmpViewFamily";
import EmpViewEducations from "./EmpViewEducations";
import EmpViewExperiences from "./EmpViewExperiences";
import EmpViewLeaves from "./EmpViewLeaves";
import EmpViewTrainings from "./EmpViewTrainings";
import EmpPersonal from "./EmpPersonal";
import EmpFamily from "./EmpFamily";
import EmpEducations from "./EmpEducations";
import EmpExperiences from "./EmpExperiences";
import EmpTrainings from "./EmpTrainings";

// const drawerWidth = 240;

// const CardLayout = ({ title, children }) => {
//   const classes = useStyles();
//   return (
//     <div>
//       <CardLayout title="Personal Information">
//         <h2>details</h2>
//       </CardLayout>
//     </div>
//   );
// };

const EmployeeView = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [familydata, setFamilydata] = useState([]);
  const [educationdata, setEducationdata] = useState([]);
  const [experiencedata, setExperiencedata] = useState([]);
  const [trainingdata, setTrainingdata] = useState([]);
  const [isPersonalDialogOpen, setIsPersonalDialogOpen] = useState(false);
  const [isFamilyDialogOpen, setIsFamilyDialogOpen] = useState(false);
  const [isEducationDialogOpen, setIsEducationDialogOpen] = useState(false);
  const [isExperienceDialogOpen, setIsExperienceDialogOpen] = useState(false);
  const [isTrainingDialogOpen, setIsTrainingDialogOpen] = useState(false);

  const {
    editEmployeeID,
    getSingleEmployee,
    single_employee,
    single_employee_loading,
  } = useEmployeesContext();
  const { singlebatch_training } = useTrainingsContext();

  const {
    loadDepartments,
    loadDesignations,
    loadSingleBatchFamily,
    loadSingleBatchEducation,
    singlebatchfamily,
    singlebatcheducation,
    singlebatchexperience,
  } = useTablesContext();

  useEffect(() => {
    getSingleEmployee(editEmployeeID);
    loadDepartments();
    loadDesignations();
  }, []);

  //useEffect(() => {}, [singlebatchfamily]);

  if (single_employee_loading) {
    return (
      <div>
        <h2>Loading...Employee</h2>
      </div>
    );
  }

  const handlePersonalDialogOpen = () => {
    //setFamilydata([...singlebatchfamily]);
    setIsPersonalDialogOpen(true);
  };

  const handlePersonalDialogClose = () => {
    setIsPersonalDialogOpen(false);
    //loadEmployees();
  };

  const handleFamilyDialogOpen = () => {
    setFamilydata([]);
    setFamilydata([...singlebatchfamily]);
    setIsFamilyDialogOpen(true);
  };

  const handleFamilyDialogClose = () => {
    setIsFamilyDialogOpen(false);
    loadSingleBatchFamily(editEmployeeID);
  };

  const handleEducationDialogOpen = () => {
    setEducationdata([]);
    setEducationdata([...singlebatcheducation]);
    setIsEducationDialogOpen(true);
  };

  const handleEducationDialogClose = () => {
    setIsEducationDialogOpen(false);
    loadSingleBatchEducation(editEmployeeID);
  };

  const handleExperienceDialogOpen = () => {
    setExperiencedata([...singlebatchexperience]);
    setIsExperienceDialogOpen(true);
  };

  const handleExperienceDialogClose = () => {
    setIsExperienceDialogOpen(false);
    //loadEmployees();
  };

  const handleTrainingDialogOpen = () => {
    setTrainingdata([...singlebatch_training]);
    setIsTrainingDialogOpen(true);
    //loadEmployees();
  };

  const handleTrainingDialogClose = () => {
    setIsTrainingDialogOpen(false);
    //loadEmployees();
  };

  return (
    <Paper className={fixedHeightPaper} style={{ backgroundColor: "black" }}>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={12}>
            <CardLayout2 title="Employee Profile">
              <div>
                <form className={classes.form}>
                  <TextField
                    label="Name"
                    name="name"
                    value={single_employee.name}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    label="Phone"
                    name="phone"
                    value={single_employee.phone}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    label="Email"
                    name="email"
                    value={single_employee.email}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    label="Birth Date"
                    name="birthdate"
                    value={single_employee.birhdate}
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField
                    label="Gender"
                    name="gender"
                    value={single_employee.gender}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    label="Leave Balance"
                    name="leave_bal"
                    value={single_employee.leave_bal}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </form>
              </div>
            </CardLayout2>
          </Grid>
          <Grid item xs={6} md={8} lg={6}>
            <div>
              <CardLayout
                title="Personal Information"
                handleClick={handlePersonalDialogOpen}
              >
                <div>
                  <form className={classes.form}>
                    <TextField
                      label="I/C No"
                      name="icno"
                      value={single_employee.ic_no}
                      InputProps={{
                        readOnly: true,
                      }}
                    />

                    <TextField
                      label="I/C Expiry Date"
                      name="ic_expirydate"
                      value={single_employee.ic_expirydate}
                      type="date"
                      InputProps={{
                        readOnly: true,
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />

                    <TextField
                      label="Passport No"
                      name="passportno"
                      value={single_employee.passportno}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      label="Passport Expiry Date"
                      name="passport_expirydate"
                      value={single_employee.passport_expirydate}
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        readOnly: true,
                      }}
                    />

                    <TextField
                      label="Work Permit No"
                      name="workpermitno"
                      value={single_employee.workpermitno}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      label="W/P Expiry Date"
                      name="workpermit_expirydate"
                      value={single_employee.workpermit_expirydate}
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        readOnly: true,
                      }}
                    />

                    <div>
                      <TextField
                        label="Nationality"
                        name="nationality"
                        value={single_employee.nationality}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </div>
                    <div>
                      <TextField
                        label="Marital Status"
                        name="marital_status"
                        value={single_employee.marital_status}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </div>
                  </form>
                </div>
              </CardLayout>
            </div>
          </Grid>
          <Grid item xs={6} md={8} lg={6}>
            <div>
              <CardLayout2 title="Leaves">
                <div>
                  <EmpViewLeaves />
                </div>
              </CardLayout2>
            </div>
          </Grid>
          <Grid item xs={6} md={8} lg={6}>
            <div>
              <CardLayout
                title="Training"
                handleClick={handleTrainingDialogOpen}
              >
                <EmpViewTrainings />
              </CardLayout>
            </div>
          </Grid>
          <Grid item xs={6} md={8} lg={6}>
            <div>
              <CardLayout
                title="Experiences"
                handleClick={handleExperienceDialogOpen}
              >
                <div>
                  <EmpViewExperiences />
                </div>
              </CardLayout>
            </div>
          </Grid>

          <Grid item xs={6} md={8} lg={6}>
            <div>
              <CardLayout
                title="Education"
                handleClick={handleEducationDialogOpen}
              >
                <div>
                  <EmpViewEducations />
                </div>
              </CardLayout>
            </div>
          </Grid>
          <Grid item xs={6} md={8} lg={6}>
            <div>
              <CardLayout title="Family" handleClick={handleFamilyDialogOpen}>
                <EmpViewFamily />
              </CardLayout>
            </div>
          </Grid>
        </Grid>
      </div>
      <CustomDialog
        isOpen={isPersonalDialogOpen}
        handleClose={handlePersonalDialogClose}
        title=""
        showButton={true}
        isFullscreen={false}
        isFullwidth={false}
      >
        <EmpPersonal
          //setPersonaldata={setFamilydata}
          //familydata={familydata}
          handleDialogClose={handlePersonalDialogClose}
        />
      </CustomDialog>
      <CustomDialog
        isOpen={isFamilyDialogOpen}
        handleClose={handleFamilyDialogClose}
        title=""
        showButton={true}
        isFullscreen={false}
        isFullwidth={false}
      >
        <EmpFamily
          setFamilydata={setFamilydata}
          familydata={familydata}
          handleDialogClose={handleFamilyDialogClose}
        />
      </CustomDialog>
      <CustomDialog
        isOpen={isEducationDialogOpen}
        handleClose={handleEducationDialogClose}
        title=""
        showButton={true}
        isFullscreen={false}
        isFullwidth={false}
      >
        <EmpEducations
          setEducationdata={setEducationdata}
          educationdata={educationdata}
          handleDialogClose={handleEducationDialogClose}
        />
      </CustomDialog>
      <CustomDialog
        isOpen={isExperienceDialogOpen}
        handleClose={handleExperienceDialogClose}
        title=""
        showButton={true}
        isFullscreen={false}
        isFullwidth={false}
      >
        <EmpExperiences
          setExperiencedata={setExperiencedata}
          experiencedata={experiencedata}
          handleDialogClose={handleExperienceDialogClose}
        />
      </CustomDialog>
      <CustomDialog
        isOpen={isTrainingDialogOpen}
        handleClose={handleTrainingDialogClose}
        title=""
        showButton={true}
        isFullscreen={false}
        isFullwidth={false}
      >
        <EmpTrainings
          setTrainingdata={setTrainingdata}
          trainingdata={trainingdata}
          handleDialogClose={handleTrainingDialogClose}
        />
      </CustomDialog>
    </Paper>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    margin: 0,
    padding: 0,
    width: "80vw",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,250px)",
    gridAutoRows: "10px",
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    justifyContent: "center",
    backgroundColor: "primary",
  },
  fixedHeight: {
    height: 800,
  },
  paper: {
    padding: theme.spacing(10),
    // display: "flex",
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    border: "1px solid",
    width: "100%",
    color: "primary",
    bcakgroundColor: "black",
  },
  card: {
    backgroundColor: "black",
  },
  form: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 350,
  },
  table: {
    minWidth: 650,
  },
}));

export default EmployeeView;
