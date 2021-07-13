import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const drawerWidth = 240;

const Example3 = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <Paper className={fixedHeightPaper}>
      <div className={classes.root}>
        <div className="col-12 col-md-6 col-lg-4 d-flex">
          <div className="card flex-fill">
            <div className="card-header">
              <h5 className="card-title mb-0">Card with links</h5>
            </div>
            <div className="card-body">
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a className="card-link" href="#">
                Card link
              </a>
              <a className="card-link" href="#">
                Another link
              </a>
            </div>
          </div>
        </div>
      </div>
    </Paper>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    border: "solid",
    gridRowEnd: "span 33",
  },
  card: {
    backgroundColor: "#16191c",
    border: "1px solid #2e3840",
    boxshadow: "0 1px 1px 0 rgba(0, 0, 0, 0.2)",
    marginBottom: "30px",
  },
  cardtitle: {
    color: "#bbc4cc",
    fontSize: "20px",
    fontWeight: "500",
    marginBottom: "20px",
  },
  cardheader: {
    backgroundColor: "#16191C",
    bordercolor: "#2e3840",
  },
  cardfooter: {
    backgroundColor: "#16191C",
    bordercolor: "#2e3840",
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
  },
}));

export default Example3;
