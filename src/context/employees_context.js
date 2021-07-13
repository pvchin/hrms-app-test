import React, { useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../reducers/employees_reducer";
import { employees_url } from "../utils/constants";

import {
  SET_EDITEMPLOYEEID,
  SET_ISEDITING_ON,
  SET_ISEDITING_OFF,
  SET_SINGLEEMPLOYEE,
  GET_EMPLOYEES_BEGIN,
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_ERROR,
  GET_SINGLE_EMPLOYEE_BEGIN,
  GET_SINGLE_EMPLOYEE_SUCCESS,
  GET_SINGLE_EMPLOYEE_ERROR,
  ADD_EMPLOYEE_BEGIN,
  ADD_EMPLOYEE_SUCCESS,
  ADD_EMPLOYEE_ERROR,
  DELETE_EMPLOYEE_BEGIN,
  DELETE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_ERROR,
  UPDATE_EMPLOYEE_BEGIN,
  UPDATE_EMPLOYEE_SUCCESS,
  UPDATE_EMPLOYEE_ERROR,
  RESET_SINGLE_EMPLOYEE,
  RESET_EMPLOYEES,
} from "../actions";

const initialState = {
  isEditing: false,
  alert: { show: false, msg: "", type: "" },
  editEmployeeID: null,
  employees_loading: false,
  employees_error: false,
  employees: [],
  single_employee_loading: false,
  single_employee_error: false,
  single_employee: {},
  delete_employee_loading: false,
  delete_employee_error: false,
  update_employee_loading: false,
  update_employee_error: false,
  add_employee_loading: false,
  add_employee_error: false,
  // filterValue: "Female",
  // filterfield: "gender",
};

const EmployeesContext = React.createContext();

export const EmployeesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadEmployees = async () => {
    dispatch({ type: GET_EMPLOYEES_BEGIN });
    try {
      // const res = await fetch(
      //   `${employees_url}?filterValue="${state.filterValue}"&filterField="${state.filterField}"`
      // );
      const res = await fetch(employees_url);
      //const { data } = await axios.get(employees_url);
      //const employees = data;
      const employees = await res.json();
      dispatch({ type: GET_EMPLOYEES_SUCCESS, payload: employees });
    } catch (error) {
      dispatch({ type: GET_EMPLOYEES_ERROR });
    }
  };

  const setIsEditingOn = () => {
    dispatch({ type: SET_ISEDITING_ON });
  };

  const setIsEditingOff = () => {
    dispatch({ type: SET_ISEDITING_OFF });
  };

  const resetSingleEmployee = () => {
    dispatch({ type: RESET_SINGLE_EMPLOYEE });
  };

  const resetEmployees = () => {
    dispatch({ type: RESET_EMPLOYEES });
  };

  const setEditEmployeeID = async (id) => {
    try {
      dispatch({ type: SET_EDITEMPLOYEEID, payload: id });
    } catch (error) {
      dispatch(error);
    }
  };

  const getSingleEmployee = async (id) => {
    dispatch({ type: GET_SINGLE_EMPLOYEE_BEGIN });
    try {
      const { data } = await axios.get(`${employees_url}?id=${id}`);
      const singleemployee = data;
      dispatch({ type: GET_SINGLE_EMPLOYEE_SUCCESS, payload: singleemployee });
    } catch (error) {
      dispatch({ type: GET_SINGLE_EMPLOYEE_ERROR });
    }
  };

  const getSingleEmployeeEmail = async (fv) => {
    dispatch({ type: GET_SINGLE_EMPLOYEE_BEGIN });
    try {
      const { data } = await axios.get(`${employees_url}?fv=${fv}`);
      const singleemployee = data;
      dispatch({ type: GET_SINGLE_EMPLOYEE_SUCCESS, payload: singleemployee });
    } catch (error) {
      dispatch({ type: GET_SINGLE_EMPLOYEE_ERROR });
    }
  };

  const addEmployee = async (data) => {
    const { id, name, ic_no, email, age, gender } = data;
    //
    dispatch({ type: ADD_EMPLOYEE_BEGIN });
    try {
      await fetch(employees_url, {
        method: "POST",
        body: JSON.stringify({ ...data }),
      });
      dispatch({ type: ADD_EMPLOYEE_SUCCESS });
    } catch (err) {
      dispatch({ type: ADD_EMPLOYEE_ERROR });
    }
  };

  const updateEmployee = async (data) => {
    const { id, ...fields } = data;

    dispatch({ type: UPDATE_EMPLOYEE_BEGIN });
    try {
      await fetch(employees_url, {
        method: "PUT",
        body: JSON.stringify({ id, ...fields }),
      });
      dispatch({ type: UPDATE_EMPLOYEE_SUCCESS });
    } catch (error) {
      dispatch({ type: UPDATE_EMPLOYEE_ERROR });
    }
  };

  const deleteEmployee = async (id) => {
    dispatch({ type: DELETE_EMPLOYEE_BEGIN });
    try {
      await fetch(employees_url, {
        method: "DELETE",
        body: JSON.stringify({ id: id }),
      });
      dispatch({ type: DELETE_EMPLOYEE_SUCCESS });
      //loadEmployees();
    } catch (err) {
      dispatch({ type: DELETE_EMPLOYEE_ERROR });
    }
  };
  return (
    <EmployeesContext.Provider
      value={{
        ...state,
        loadEmployees,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        getSingleEmployee,
        getSingleEmployeeEmail,
        setEditEmployeeID,
        setIsEditingOn,
        setIsEditingOff,
        resetSingleEmployee,
        resetEmployees,
      }}
    >
      {children}
    </EmployeesContext.Provider>
  );
};

export const useEmployeesContext = () => {
  return useContext(EmployeesContext);
};
