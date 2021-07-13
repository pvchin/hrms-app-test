import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import axios from "axios";
import { useAsync } from "react-async";
import { Paper, Grid, Divider, TextField } from "@material-ui/core";
import { employees_url } from "../utils/constants";

const drawerWidth = 240;
const url = "https://course-api.com/react-tabs-project";

// const loadEmp = async () =>
//   await fetch(employees_url)
//     .then((res) => (res.ok ? res : Promise.reject(res)))
//     .then((res) => res.json());

const loadEmp = async () => {
  const { data } = await axios.get(employees_url);
  return data;
};

const Example = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [paydata, setPaydata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [value, setValue] = useState(0);
  const { data, error, isLoading } = useAsync({ promiseFn: loadEmp });

  const handleClick = () => {
    
  }

  const handleButtonClick = (index) => {
    const newData = data[index]
    const { id, name } = data[index]
    setPaydata(()=>{return [...paydata,newData.map((item)=>item.name)]})
    console.log("paydata", paydata, name, newData)
  };

  if (isLoading) return "Loading...";
  if (error) return `Something went wrong: ${error.message}`;
  if (data) {
    // const empdata = data.map((r) => {
    //   return { ...r };
    // });
    setPaydata(()=>{return [...paydata,data.map((item)=>{return {...item}})]})
    console.log("Data", data, paydata);
    const { name, basic_salary } = paydata[value];
    return (
      <Paper className={fixedHeightPaper} style={{ backgroundColor: "black" }}>
        <section className={classes.section}>
          <Grid
            direction="row"
            container
            spacing={1}
            style={{ border: "1px solid white" }}
          >
            <Grid container item sm={2} direction="column" align="left">
              {paydata.map((item, index) => {
                console.log("item", item, index);
                return (
                  <button
                    key={index}
                    onClick={(e) => {
                      setValue(index);
                      handleButtonClick(index);
                    }}
                    className={`classes.jobbtn`}
                    // ${index === value && "activebtn"} `}
                  >
                    <h3>{item.name}</h3>
                  </button>
                );
              })}
            </Grid>
            <Divider
              orientation="vertical"
              flexItem
              style={{ background: "white" }}
            />
            <Grid container item sm={8}>
              <article className={classes.jobinfo}>
                <h3>{name}</h3>
                <form>
                  <TextField
                    label="Name"
                    variant="filled"
                    type="name"
                    required
                    style={{ width: 350 }}
                    value={name}
                  />
                  <TextField
                    label="Basic Salary"
                    variant="filled"
                    type="currency"
                    required
                    style={{ width: 350 }}
                    value={basic_salary}
                  />
                  <button onClick={(e) => handleClick(e)}>Submit</button>
                </form>
              </article>
            </Grid>
          </Grid>
        </section>
      </Paper>
    );
  }
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
  section: {
    width: "70vw",
    margin: "5rem auto",
    maxWidth: "var(--max-width)",
  },
  underline: {
    width: "5rem",
    height: "0.25rem",
    marginBottom: "1.25rem",
    background: "var(--clr-primary-5)",
    marginLeft: "auto",
    marginRight: "auto",
  },
  title: {
    marginbottom: "4rem",
    textAlign: "center",
  },
  jobscenter: {
    width: "80vw",
    margin: "0 auto",
    maxWidth: "var(--max-width)",
    flexDirection: "row",
  },
  btncontainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: "4rem",
    flexWrap: "wrap",
  },
  jobbtn: {
    background: "transparent",
    borderColor: "transparent",
    textTransform: "capitalize",
    fontSize: "1.25rem",
    letterSpacing: "var(--spacing)",
    margin: "0 0.5rem",
    transition: "var(--transition)",
    cursor: "pointer",
    padding: "0.25rem 0",
    lineHeight: "1",
    outlineColor: "var(--clr-primary-10)",
    "&:hover": {
      color: "var(--clr-primary-5)",
      boxShadow: "0 2px var(--clr-primary-5)",
    },
  },
  activebtn: {
    color: "var(--clr-primary-5)",
    boxShadow: "0 2px var(--clr-primary-5)",
  },
  jobinfo: {
    fontWeight: "400",
  },
}));

export default Example;
