import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import FlightIcon from "@material-ui/icons/Flight";
import PeopleIcon from "@material-ui/icons/People";
import LayersIcon from "@material-ui/icons/Layers";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MoneyIcon from "@material-ui/icons/Money";
// import Collapse from "@material-ui/core/Collapse";
// import ExpandLess from "@material-ui/icons/ExpandLess";
// import ExpandMore from "@material-ui/icons/ExpandMore";

const MenuListItems = () => {
  const classes = useStyles();
  const [openPay, setOpenPay] = useState(false);
  const [openTable, setOpenTable] = useState(false);

  const handleClickPay = () => {
    setOpenPay(!openPay);
  };

  const handleClickTable = () => {
    setOpenTable(!openTable);
  };

  return (
    <div className={classes.content}>
      <ListSubheader inset className={classes.mainHeader}>
        Admin
      </ListSubheader>

      <Link to="/">
        <ListItem button>
          <ListItemIcon className={classes.itemIcon}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText
            primary="Dashboard"
            className={classes.categoryHeaderPrimary}
          />
        </ListItem>
      </Link>

      <Link to="/allemployees">
        <ListItem button>
          <ListItemIcon className={classes.itemIcon}>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText
            primary="All Employees"
            className={classes.categoryHeaderPrimary}
          />
        </ListItem>
      </Link>

      {/* <Link to="/leave">
        <ListItem button>
          <ListItemIcon className={classes.itemIcon}>
            <FlightIcon />
          </ListItemIcon>
          <ListItemText
            primary="Leave"
            className={classes.categoryHeaderPrimary}
          />
        </ListItem>
      </Link> */}
     
      {/* <Link to="/expenses">
        <ListItem button>
          <ListItemIcon className={classes.itemIcon}>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText
            primary="Expenses"
            className={classes.categoryHeaderPrimary}
          />
        </ListItem>
      </Link> */}

     
      <Link to="/tables">
        <ListItem button>
          <ListItemIcon className={classes.itemIcon}>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText
            primary="Tables"
            className={classes.categoryHeaderPrimary}
          />
        </ListItem>
      </Link>

      {/* <ListItem button onClick={handleClickTable}>
        <ListItemIcon className={classes.itemIcon}>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Tables" className={classes.item} />
        {openTable ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openTable} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to="/clients">
            <ListItem button className={classes.nested}>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary="Clients" className={classes.item} />
            </ListItem>
          </Link>

          <Link to="/departments">
            <ListItem button className={classes.nested}>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary="Departments" className={classes.item} />
            </ListItem>
          </Link>

          <Link to="/designation">
            <ListItem button className={classes.nested}>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary="Designation" className={classes.item} />
            </ListItem>
          </Link>

          <Link to="/allowances">
            <ListItem button className={classes.nested}>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary="Allowances" className={classes.item} />
            </ListItem>
          </Link>
        </List>
      </Collapse> */}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  mainHeader: {
    fontSize: 24,
    color: "primary",
  },
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  categoryHeaderPrimary: {
    color: "primary",
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: "primary",
    "&:hover,&:focus": {
      backgroundColor: "rgba(255, 255, 255, 0.08)",
    },
  },
  itemCategory: {
    backgroundColor: "#232f3e",
    boxShadow: "0 -1px 0 #404854 inset",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  firebase: {
    fontSize: 24,
    color: theme.palette.common.orange,
  },
  itemActiveItem: {
    color: "primary",
  },
  itemPrimary: {
    fontSize: "inherit",
  },
  itemIcon: {
    minWidth: "auto",
    marginRight: theme.spacing(2),
    color: "primary",
  },
  divider: {
    marginTop: theme.spacing(2),
  },
}));

export default MenuListItems;
