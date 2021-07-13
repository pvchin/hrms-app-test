import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
// import { FaAngleDoubleRight } from "react-icons/fa";

const drawerWidth = 240;
const url = "https://course-api.com/react-tabs-project";

// const fetchOnLeavesDetails = selector({
//   key: "onLeaveDetailsSelector",
//   get: async ({ get }) => {
//     try {
//       const { data } = await axios.get(onleaves_url);
//       const onleavesdata = data;

//       return data;
//     } catch (error) {
//       throw error;
//     }
//   },
// });

const Example = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [empdata, setEmpdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [value, setValue] = useState(0);

  const fetchjobs = async () => {
    const response = await fetch(url);
    const newJobs = await response.json();
    setJobs(newJobs);
    setLoading(false);
  };

  useEffect(() => {
    fetchjobs();
  }, []);

  if (loading) {
    return (
      <section className="section loading">
        <h1>loading...</h1>
      </section>
    );
  }
  const { company, dates, duties, title } = jobs[value];

  return (
    <paper className={fixedHeightPaper} style={{ backgroundColor: "black" }}>
      <section className={classes.section}>
        <div className="title">
          <h2>experience</h2>
          <div className="underline"></div>
        </div>
        <div className={classes.jobscenter}>
          {/* btn container */}
          <div className={classes.btncontainer}>
            {jobs.map((item, index) => {
              return (
                <button
                  key={index}
                  onClick={() => setValue(index)}
                  className={`classes.jobbtn`}
                  // ${index === value && "activebtn"} `}
                >
                  {item.company}
                </button>
              );
            })}
          </div>
          <article className={classes.jobinfo}>
            <h3>{title}</h3>
            <h4>{company}</h4>
            <p className="jobdate">{dates}</p>
            {duties.map((duty, index) => {
              return (
                <div key={index} className="jobdesc">
                  <p>{duty}</p>
                </div>
              );
            })}
          </article>
        </div>
      </section>
    </paper>
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
  section: {
    width: "90vw",
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
