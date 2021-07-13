import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";
import CardLayout from "../helpers/CardLayout";

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

const Example = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <Paper className={fixedHeightPaper} style={{ backgroundColor: "black" }}>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid xs={12} md={8} lg={12}>
            <CardLayout title="Profile">
              <div>
                <form>
                  <TextField label="Name" name="name" value="name" />
                </form>
              </div>
            </CardLayout>
          </Grid>
          <Grid xs={6} md={8} lg={6}>
            <div>
              <CardLayout title="Personal Information">
                <div>
                  <form>
                    <TextField label="Name" name="name" value="name" />
                  </form>
                </div>
              </CardLayout>
            </div>
          </Grid>
          <Grid xs={6} md={8} lg={6}>
            <div>
              <CardLayout title="Family">
                <div>
                  <form>
                    <TextField label="Name" name="name" value="name" />
                  </form>
                </div>
              </CardLayout>
            </div>
          </Grid>
          <Grid xs={6} md={8} lg={6}>
            <div>
              <CardLayout title="Education">
                <div>
                  <form>
                    <TextField label="Name" name="name" value="name" />
                  </form>
                </div>
              </CardLayout>
            </div>
          </Grid>
          <Grid xs={6} md={8} lg={6}>
            <div>
              <CardLayout title="Experiences">
                <div>
                  <form>
                    <TextField label="Name" name="name" value="name" />
                  </form>
                </div>
              </CardLayout>
            </div>
          </Grid>

          <Grid xs={6} md={8} lg={6}>
            <div>
              <CardLayout title="Training">
                <div>
                  <form>
                    <TextField label="Name" name="name" value="name" />
                  </form>
                </div>
              </CardLayout>
            </div>
          </Grid>
          <Grid xs={6} md={8} lg={6}>
            <div>
              <CardLayout title="Leaves">
                <div>
                  <form>
                    <TextField label="Name" name="name" value="name" />
                  </form>
                </div>
              </CardLayout>
            </div>
          </Grid>
        </Grid>
      </div>
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
}));

export default Example;
