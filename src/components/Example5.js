import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import axios from "axios";
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
// import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
// import { departmentsSelector } from "../helpers/Recoilhelpers";
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

export const onleavesdatastate = atom({
  key: "onleavesdatastate",
  default: [],
});

const fetchOnLeavesDetails = selector({
  key: "onLeaveDetailsSelector",
  get: async ({ get }) => {
    try {
      const { data } = await axios.get(onleaves_url);
      const onleavesdata = data;

      return data;
    } catch (error) {
      throw error;
    }
  },
});

const Example = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [userdata, setUserdata] = useState([]);
  //const [userdata, setUserdata] = useRecoilState(userdatastate);
  const onLeavesDetails = useRecoilValueLoadable(fetchOnLeavesDetails);
  const { state, contents } = onLeavesDetails;
  
  console.log(onLeavesDetails);
  if (onLeavesDetails.state === "hasError") {
    return <div> There is some problem! </div>;
  }

  if (state === "loading") {
    return <div>Its loading</div>;
  }

  if (state === "hasValue") {
    const editable = contents.map((r) => {
      return { ...r };
    });
    return (
      <paper className={fixedHeightPaper} style={{ backgroundColor: "black" }}>
        <MaterialTable
          columns={columns}
          data={editable}
          title="Staffs On Leave within 30 Days"
          options={{
            search: false,
            toolbar: false,
          }}
        />
      </paper>
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
}));

export default Example;
