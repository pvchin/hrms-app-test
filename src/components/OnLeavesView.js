import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, ListItemText, Grid } from "@material-ui/core";
import clsx from "clsx";
import axios from "axios";
import { useAsync } from "react-async";
import MaterialTable from "material-table";
import Paper from "@material-ui/core/Paper";
import {
  atom,
  selector,
  useRecoilValue,
  useRecoilState,
  useSetRecoilState,
  useRecoilValueLoadable,
  useRecoilStateLoadable,
} from "recoil";
import { loginLevelState } from "./data/atomdata";
import { onleaves_url } from "../utils/constants";
import { fetchDepartmentsSelector } from "./data/selectordata";

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
];

// export const onleavesdatastate = atom({
//   key: "onleavesdatastate",
//   default: [],
// });

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

const loadUsers = async () => {
  const { data } = await axios.get(onleaves_url);
  return data;
};
//   await fetch("https://jsonplaceholder.typicode.com/users")
//     .then((res) => (res.ok ? res : Promise.reject(res)))
//     .then((res) => res.json());

const fetchDetails = async () =>
  await fetch("localhost:8888/api/onleavesview")
    .then((res) => (res.ok ? res : Promise.reject(res)))
    .then((res) => res.json());

const OnLeavesView = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [userdata, setUserdata] = useState([]);
    const [loginLevel, setLoginLevel] = useRecoilState(loginLevelState);
    
  //const [userdata, setUserdata] = useRecoilState(userdatastate);
  //const onLeavesDetails = useRecoilValueLoadable(fetchOnLeavesDetails);
  const { data, error, isLoading } = useAsync({ promiseFn: loadUsers });
  if (isLoading) return "Loading...";
 if (error) return `Internet connections problem!`;
  if (data) console.log("data", data);
  return (
    <List className={classes.roow}>
      <Grid container direction="row">
        {data.map((row) => {
          return (
            <ListItem key={row.id}>
              <Grid item sm={4} align="center">
                <ListItemText>{row.name}</ListItemText>
              </Grid>
              <Grid item sm={4} align="center">
                <ListItemText>{row.from_date}</ListItemText>
              </Grid>
              <Grid item sm={4} align="center">
                <ListItemText>{row.to_date}</ListItemText>
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

export default OnLeavesView;
