import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, ListItemText, Grid } from "@material-ui/core";
import clsx from "clsx";
import axios from "axios";
import { useAsync } from "react-async";
import MaterialTable from "material-table";
import Paper from "@material-ui/core/Paper";
import { selector, useRecoilState } from "recoil";
import { loginLevelState } from "./data/atomdata";
import { leaves_url } from "../utils/constants";
import { fetchDepartmentsSelector } from "./data/selectordata";
import { useLeavesContext } from "../context/leaves_context";

const drawerWidth = 240;

const columns = [
  {
    title: "Name",
    field: "name",
    editable: "never",
  },
  {
    title: "From Data",
    field: "from_date",
    type: "date",
    dateSetting: { locale: "en-GB" },
    editable: "never",
  },
  {
    title: "To Data",
    field: "to_date",
    type: "date",
    dateSetting: { locale: "en-GB" },
    editable: "never",
  },
  {
    title: "Status",
    field: "status",
    editable: "never",
  },
];

// export const onleavesdatastate = atom({
//   key: "onleavesdatastate",
//   default: [],
// });

// const fetchOnLeavesDetails = selector({
//   key: "onLeaveDetailsSelector",
//   get: async ({ get }) => {
//     try {
//       const { data } = await axios.get(leaves_url);
//       const onleavesdata = data;

//       return data;
//     } catch (error) {
//       throw error;
//     }
//   },
// });

const loadUsers = async () => {
  const { data } = await axios.get(leaves_url);
  return data;
};
//   await fetch("https://jsonplaceholder.typicode.com/users")
//     .then((res) => (res.ok ? res : Promise.reject(res)))
//     .then((res) => res.json());

const fetchDetails = async () =>
  await fetch(leaves_url)
    .then((res) => (res.ok ? res : Promise.reject(res)))
    .then((res) => res.json());

const OnLeavesViewStaff = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [userdata, setUserdata] = useState([]);
  const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);

  const {
    leaves,
    editLeaveID,
    leaves_loading,
    deleteLeave,
    loadLeaves,
    getSingleLeave,
    setEditLeaveID,
    setIsLeaveEditingOn,
    setIsLeaveEditingOff,
    resetSingleLeave,
    getSingleBatchLeave,
    loadEmpLeaves,
    singlebatch_leave_loading,
    singlebatch_leave_error,
    singlebatch_leave,
  } = useLeavesContext();

  useEffect(() => {
    loadEmpLeaves(loginLevel.loginUserId);
  }, []);

  //const [userdata, setUserdata] = useRecoilState(userdatastate);
  //const onLeavesDetails = useRecoilValueLoadable(fetchOnLeavesDetails);

  if (singlebatch_leave_loading) return "Loading...";
  if (singlebatch_leave_error) return `Internet connections problem!`;
  if (singlebatch_leave)
    return (
      <List className={classes.roow}>
        <Grid container direction="row">
          {singlebatch_leave.map((row) => {
            return (
              <ListItem key={row.id}>
                <Grid item sm={4} align="center">
                  <ListItemText>{row.from_date}</ListItemText>
                </Grid>
                <Grid item sm={4} align="center">
                  <ListItemText>{row.to_date}</ListItemText>
                </Grid>
                <Grid item sm={4} align="center">
                  <ListItemText>{row.status}</ListItemText>
                </Grid>
              </ListItem>
            );
          })}
        </Grid>
      </List>
    );
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2",
  },

  paper: {
    padding: theme.spacing(1), //grid padding
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default OnLeavesViewStaff;
