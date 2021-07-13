import React, { useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
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
import { departments_url } from "../utils/constants";
import { fetchDepartmentsSelector } from "./data/selectordata";

const url = `https://reqres.in/api/users?page=1`;

const drawerWidth = 240;

const columns = [
  {
    title: "Name",
    field: "name",
    filtering: false,
  },
  {
    title: "ID",
    field: "id",
  },

  {
    title: "Rec ID",
    field: "rec_id",
    type: "numeric",
  },
];

export const userdatastate = atom({
  key: "userdata",
  default: [],
  dangerouslyAllowMutability: true,
});

const fetchUserDetails = selector({
  key: "userDetailsSelector",
  get: async () => {
    const { data } = await axios
      .get(departments_url)
      .then((res) => {
        const data = res.data;
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.log(error);
      });
    return data;
  },
});

const fetchUserDetailsdata = selector({
  key: "userDetailsSelectordata",
  get: async () => {
    const { data } = await axios.get(departments_url);
    return data;
  },
});

const Example = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [userdata, setUserdata] = useRecoilState(fetchUserDetailsdata);
  //const [userDetails, setUserDetails] =
  //  useRecoilStateLoadable(fetchUserDetailsdata);
  //   fetchDepartmentsSelector
  // );

  // const { state, contents } = userDetails;

  // console.log(
  //   "userdetails",
  //   userDetails,
  //   Object.isFrozen(userDetails.contents),
  //   Object.isExtensible(userDetails.contents)
  // );
  console.log(
    "userdata",
    userdata,
    Object.isFrozen(userdata),
    Object.isExtensible(userdata)
  );
  // if (userDetails.state === "hasError") {
  //   return <div> There is some problem! </div>;
  // }

  // if (state === "loading") {
  //   return <div>Its loading</div>;
  // }

  // if (state === "hasValue") {

  return (
    <React.Suspense fallback={<h1>Loading profile...</h1>}>
      <Paper className={fixedHeightPaper} style={{ backgroundColor: "black" }}>
        <MaterialTable columns={columns} data={userdata} title="Family" />
      </Paper>
    </React.Suspense>
  );
};

// const DetailsWithSuspense = () => {
//   const userDetails = useRecoilValue(fetchUserDetails);
//   const { data } = userDetails;

//   return data.map((item) => (
//     <div key={item.id}>
//       <p>{`Email: ${item.email} Name: ${item.first_name} ${item.last_name}`}</p>
//     </div>
//   ));
// };

// const Example = () => {
//   const classes = useStyles();
//   const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
//   const departsdata = useRecoilValue(departmentsSelector);

//   return (
//     <div>
//       <DetailsWithoutSuspense />
//     </div>
//   );
// };

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
