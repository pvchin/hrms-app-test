import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import axios from "axios";
import MaterialTable from "material-table";
import { Grid, List, ListItem, ListItemText } from "@material-ui/core";
import { atom, selector, useRecoilValueLoadable } from "recoil";
// import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
// import { departmentsSelector } from "../helpers/Recoilhelpers";
import { wpexpiry_url } from "../utils/constants";
import { fetchDepartmentsSelector } from "./data/selectordata";

const drawerWidth = 240;

const columns = [
  {
    title: "Name",
    field: "name",
    editable: "never",
  },
  {
    title: "Work Permit No",
    field: "workpermitno",
    editable: "never",
  },
  {
    title: "Work Permit Expiry",
    field: "workpermit_expirydate",
    type: "date",
    dateSetting: { locale: "en-GB" },
    editable: "never",
  },
];

export const onleavesdatastate = atom({
  key: "onleavesdatastate",
  default: [],
});

const fetchWPExpiryDetails = selector({
  key: "wpExpiryDetailsSelector",
  get: async ({ get }) => {
    try {
      const { data } = await axios.get(wpexpiry_url);
      const wpexpirydata = data;

      return data;
    } catch (error) {
      throw error;
    }
  },
});

const WPExpiryView = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [userdata, setUserdata] = useState([]);
  //const [userdata, setUserdata] = useRecoilState(userdatastate);
  const wpExpiryDetails = useRecoilValueLoadable(fetchWPExpiryDetails);
  const { state, contents } = wpExpiryDetails;

  console.log(wpExpiryDetails);
  if (wpExpiryDetails.state === "hasError") {
    return (
      <div>
        <h2>Internet connections problem!</h2>
      </div>
    );
  }

  if (state === "loading") {
    return (
      <div>
        <h2>Loading....WP Expiry</h2>
      </div>
    );
  }

  if (state === "hasValue") {
    const editable = contents.map((r) => {
      return { ...r };
    });
    return (
      <List className={classes.root}>
        <Grid container direction="row">
          {editable.map((row) => {
            return (
              <ListItem key={row.id}>
                <Grid item sm={4} align="center">
                  <ListItemText>{row.name}</ListItemText>
                </Grid>
                <Grid item sm={4} align="center">
                  <ListItemText>{row.workpermitno}</ListItemText>
                </Grid>
                <Grid item sm={4} align="center">
                  <ListItemText>{row.workpermit_expirydate}</ListItemText>
                </Grid>
              </ListItem>
            );
          })}
        </Grid>
      </List>
    );
  }
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
  },
}));

export default WPExpiryView;
