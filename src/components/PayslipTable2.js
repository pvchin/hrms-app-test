import React, { useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import BuildOutlinedIcon from "@material-ui/icons/BuildOutlined";
import FilterListIcon from "@material-ui/icons/FilterList";
import { useHistory } from "react-router-dom";

import { usePayslipsContext } from "../context/payslips_context";
import { useEmployeesContext } from "../context/employees_context";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headCells,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell> */}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const ToolbarHeader = ({
  title,
  add_Payslip,
  build_Payslip,
  loadPayslips,
  period,
}) => {
  const classes = useToolbarStyles();

  let history = useHistory();

  const handleBuild = () => {
    build_Payslip();
    loadPayslips();
  };

  return (
    <Toolbar>
      <Typography
        className={classes.title}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        `{title} (Period: {period} )`
      </Typography>
      <Tooltip title="build records">
        <IconButton aria-label="filter list" onClick={handleBuild}>
          <BuildOutlinedIcon fontSize="medium" color="primary" />
        </IconButton>
      </Tooltip>
      <Tooltip title="add record">
        <IconButton aria-label="filter list" onClick={add_Payslip}>
          <AddIcon fontSize="large" color="primary" />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

export default function PayslipTable({ title, headCells }) {
  let history = useHistory();
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const {
    payslips,
    addPayslip,
    payslips_loading,
    updatePayslip,
    deletePayslip,
    loadPayslips,
    getSinglePayslip,
    setEditPayslipID,
    setIsPayslipEditingOn,
    setIsPayslipEditingOff,
    resetSinglePayslip,
    payslip_period,
  } = usePayslipsContext();
  const { loadEmployees, employees } = useEmployeesContext();

  useEffect(() => {
    loadPayslips();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    // if (event.target.checked) {
    //   const newSelecteds = payslips.map((n) => n.name);
    //   setSelected(newSelecteds);
    //   return;
    // }
    // setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, payslips.length - page * rowsPerPage);

  const update_Payslip = async (id) => {
    setEditPayslipID(id);
    setIsPayslipEditingOn();
    getSinglePayslip(id);
    history.push("/singlepayslip");
  };

  const add_Payslip = async () => {
    resetSinglePayslip();
    setEditPayslipID("");
    setIsPayslipEditingOff();
    history.push("/singlepayslip");
  };

  const delete_Payslip = (id) => {
    setEditPayslipID(id);
    deletePayslip(id);
    loadPayslips();
  };
  //name, period, location, manager_name, status, no_of_days, amount

  const build_Payslip = () => {
    loadEmployees();
    loadPayslips();
    const paydata = payslips.map((e) => e.name);
    console.log(paydata.length);
    {
      employees.map((emp) => {
        const { name } = emp;
        const data = {
          name: name,
          period: "2021-01",
          date: "",
          nett_pay: 0,
          bank_name: "",
          bank_acno: "",
          status: "Pending",
        };
        const res = paydata.includes(emp.name);
        if (!res) {
          console.log("add");
          addPayslip({ ...data });
        }
      });
    }
    //loadDailyAllowances();
  };

  if (payslips_loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ToolbarHeader
        title="Payslips"
        add_Payslip={add_Payslip}
        build_DailyAllowance={build_Payslip}
        loadPayslips={loadPayslips}
        period={payslip_period}
      />
      <div className={classes.root}>
        <Paper className={classes.paper}>
          {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                // onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={payslips.length}
                headCells={headCells}
              />
              <TableBody>
                {stableSort(payslips, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.name);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        // onClick={(event) => handleClick(event, row.name)}
                        role="checkbox"
                        // aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.name}
                        // selected={isItemSelected}
                      >
                        {/* <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </TableCell> */}

                        <TableCell align="left" padding="none">
                          {row.name}
                        </TableCell>
                        <TableCell align="left" padding="none">
                          {row.period}
                        </TableCell>
                        <TableCell align="left" padding="none">
                          {row.date}
                        </TableCell>

                        <TableCell align="middle" padding="none">
                          {row.nett_pay}
                        </TableCell>
                        <TableCell align="left" padding="none">
                          {row.status}
                        </TableCell>
                        <div>
                          <TableCell align="right">
                            <CreateIcon
                              color="primary"
                              onClick={() => update_Payslip(row.id)}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <DeleteIcon
                              color="primary"
                              onClick={() => delete_Payslip(row.id)}
                            />
                          </TableCell>
                        </div>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={payslips.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </div>
    </>
  );
}

// EnhancedTableHead.propTypes = {
//   classes: PropTypes.object.isRequired,
//   numSelected: PropTypes.number.isRequired,
//   onRequestSort: PropTypes.func.isRequired,
//   onSelectAllClick: PropTypes.func.isRequired,
//   order: PropTypes.oneOf(["asc", "desc"]).isRequired,
//   orderBy: PropTypes.string.isRequired,
//   rowCount: PropTypes.number.isRequired,
// };
// ToolbarHeader.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
    marginLeft: 20,
    height: 350,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));
