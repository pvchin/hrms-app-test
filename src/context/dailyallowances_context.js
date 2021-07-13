import React, { useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../reducers/dailyallowances_reducer";
import {
  dailyallowances_url,
  dailyallowsdetls_url,
  unpaiddailyallows_url,
  pendingdailyallowsdetls_url,
} from "../utils/constants";

import {
  SET_EDITDAILYALLOWANCEID,
  SET_ISDAILYALLOWANCEEDITING_ON,
  SET_ISDAILYALLOWANCEEDITING_OFF,
  SET_DAILYALLOWANCE_PERIOD,
  SET_SINGLEDAILYALLOWANCE,
  LOAD_DAILYALLOWANCES,
  GET_DAILYALLOWANCES_BEGIN,
  GET_DAILYALLOWANCES_SUCCESS,
  GET_DAILYALLOWANCES_ERROR,
  GET_UNPAIDDAILYALLOWS_BEGIN,
  GET_UNPAIDDAILYALLOWS_SUCCESS,
  GET_UNPAIDDAILYALLOWS_ERROR,
  GET_SINGLE_DAILYALLOWANCE_BEGIN,
  GET_SINGLE_DAILYALLOWANCE_SUCCESS,
  GET_SINGLE_DAILYALLOWANCE_ERROR,
  GET_SINGLEBATCH_DAILYALLOWANCE_BEGIN,
  GET_SINGLEBATCH_DAILYALLOWANCE_SUCCESS,
  GET_SINGLEBATCH_DAILYALLOWANCE_ERROR,
  ADD_DAILYALLOWANCE_BEGIN,
  ADD_DAILYALLOWANCE_SUCCESS,
  ADD_DAILYALLOWANCE_ERROR,
  DELETE_DAILYALLOWANCE_BEGIN,
  DELETE_DAILYALLOWANCE_SUCCESS,
  DELETE_DAILYALLOWANCE_ERROR,
  UPDATE_DAILYALLOWANCE_BEGIN,
  UPDATE_DAILYALLOWANCE_SUCCESS,
  UPDATE_DAILYALLOWANCE_ERROR,
  RESET_SINGLE_DAILYALLOWANCE,
  LOAD_DAILYALLOWSDETLS,
  SET_DAILYALLOWSDETL_PERIOD,
  GET_DAILYALLOWSDETLS_BEGIN,
  GET_DAILYALLOWSDETLS_SUCCESS,
  GET_DAILYALLOWSDETLS_ERROR,
  GET_SINGLE_DAILYALLOWSDETL_BEGIN,
  GET_SINGLE_DAILYALLOWSDETL_SUCCESS,
  GET_SINGLE_DAILYALLOWSDETL_ERROR,
  GET_PENDING_DAILYALLOWSDETL_BEGIN,
  GET_PENDING_DAILYALLOWSDETL_SUCCESS,
  GET_PENDING_DAILYALLOWSDETL_ERROR,
  GET_SINGLEBATCH_DAILYALLOWSDETL_BEGIN,
  GET_SINGLEBATCH_DAILYALLOWSDETL_SUCCESS,
  GET_SINGLEBATCH_DAILYALLOWSDETL_ERROR,
  ADD_DAILYALLOWSDETL_BEGIN,
  ADD_DAILYALLOWSDETL_SUCCESS,
  ADD_DAILYALLOWSDETL_ERROR,
  DELETE_DAILYALLOWSDETL_BEGIN,
  DELETE_DAILYALLOWSDETL_SUCCESS,
  DELETE_DAILYALLOWSDETL_ERROR,
  UPDATE_DAILYALLOWSDETL_BEGIN,
  UPDATE_DAILYALLOWSDETL_SUCCESS,
  UPDATE_DAILYALLOWSDETL_ERROR,
} from "../actions";

const initialState = {
  isDailyAllowanceEditing: false,
  alertDailyAllowance: { show: false, msg: "", type: "" },
  editDailyAllowanceID: null,
  dailyallowances_loading: false,
  dailyallowances_error: false,
  dailyallowances: [],
  single_dailyallowance_loading: false,
  single_dailyallowance_error: false,
  single_dailyallowance: {},
  singlebatch_dailyallowance_loading: false,
  singlebatch_dailyallowance_error: false,
  singlebatch_dailyallowances: {},
  delete_dailyallowance_loading: false,
  delete_dailyallowance_error: false,
  update_dailyallowance_loading: false,
  update_dailyallowance_error: false,
  add_dailyallowance_loading: false,
  add_dailyallowance_error: false,
  dailyallowance_period: "",
  isDailyAllowsDetlEditing: false,
  alertDailyAllowsDetl: { show: false, msg: "", type: "" },
  editDailyAllowsDetlID: null,
  dailyallowsdetls_loading: false,
  dailyallowsdetls_error: false,
  dailyallowsdetls: [],
  single_dailyallowsdetl_loading: false,
  single_dailyallowsdetl_error: false,
  single_dailyallowsdetl: {},
  pending_dailyallowsdetl_loading: false,
  pending_dailyallowsdetl_error: false,
  pending_dailyallowsdetl: {},
  singlebatch_dailyallowsdetl: {},
  singlebatch_dailyallowsdetl_loading: false,
  singlebatch_dailyallowsdetl_error: false,
  delete_dailyallowsdetl_loading: false,
  delete_dailyallowsdetl_error: false,
  update_dailyallowsdetl_loading: false,
  update_dailyallowsdetl_error: false,
  add_dailyallowsdetl_loading: false,
  add_dailyallowsdetl_error: false,
  unpaid_dailyallows_loading: false,
  unpaid_dailyallows_error: false,
  unpaiddailyallows: [],
  dailyallowsdetl_period: "",
  // filterValue: "Female",
  // filterfield: "gender",
};

const DailyAllowancesContext = React.createContext();

export const DailyAllowancesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //daily allowances
  const loadDailyAllowances = async () => {
    dispatch({ type: GET_DAILYALLOWANCES_BEGIN });
    try {
      // const res = await fetch(
      //   `${employees_url}?filterValue="${state.filterValue}"&filterField="${state.filterField}"`
      // );
      const res = await fetch(dailyallowances_url);
      //const { data } = await axios.get(employees_url);
      //const employees = data;
      const dailyallowances = await res.json();
      dispatch({ type: GET_DAILYALLOWANCES_SUCCESS, payload: dailyallowances });
    } catch (error) {
      dispatch({ type: GET_DAILYALLOWANCES_ERROR });
    }
  };

  //unpaid daily allowances
  const loadUnpaidDailyAllows = async () => {
    dispatch({ type: GET_UNPAIDDAILYALLOWS_BEGIN });
    try {
      const res = await fetch(unpaiddailyallows_url);
      const dailyallowances = await res.json();
      dispatch({
        type: GET_UNPAIDDAILYALLOWS_SUCCESS,
        payload: dailyallowances,
      });
    } catch (error) {
      dispatch({ type: GET_UNPAIDDAILYALLOWS_ERROR });
    }
  };

  const loadPendingDailyAllowances = async (fi) => {
    dispatch({ type: GET_DAILYALLOWANCES_BEGIN });
    try {
      // const res = await fetch(
      //   `${employees_url}?filterValue="${state.filterValue}"&filterField="${state.filterField}"`
      // );
      const { data } = await axios.get(`${dailyallowances_url}?fi=${fi}`);
      const dailyallowances = data;
      dispatch({ type: GET_DAILYALLOWANCES_SUCCESS, payload: dailyallowances });
    } catch (error) {
      dispatch({ type: GET_DAILYALLOWANCES_ERROR });
    }
  };

  const loadEmpDailyAllowances = async (em) => {
    dispatch({ type: GET_DAILYALLOWANCES_BEGIN });
    try {
      // const res = await fetch(
      //   `${employees_url}?filterValue="${state.filterValue}"&filterField="${state.filterField}"`
      // );
      const { data } = await axios.get(`${dailyallowances_url}?em=${em}`);
      const dailyallowances = data;
      dispatch({ type: GET_DAILYALLOWANCES_SUCCESS, payload: dailyallowances });
    } catch (error) {
      dispatch({ type: GET_DAILYALLOWANCES_ERROR });
    }
  };

  const setIsDailyAllowanceEditingOn = () => {
    dispatch({ type: SET_ISDAILYALLOWANCEEDITING_ON });
  };

  const setIsDailyAllowanceEditingOff = () => {
    dispatch({ type: SET_ISDAILYALLOWANCEEDITING_OFF });
  };

  const resetSingleDailyAllowance = () => {
    dispatch({ type: RESET_SINGLE_DAILYALLOWANCE });
  };

  const setDailyAllowancePeriod = async (name) => {
    try {
      dispatch({ type: SET_DAILYALLOWANCE_PERIOD, payload: name });
    } catch (error) {
      dispatch(error);
    }
  };

  const setEditDailyAllowanceID = async (id) => {
    try {
      dispatch({ type: SET_EDITDAILYALLOWANCEID, payload: id });
    } catch (error) {
      dispatch(error);
    }
  };

  const getSingleDailyAllowance = async (id) => {
    dispatch({ type: GET_SINGLE_DAILYALLOWANCE_BEGIN });
    try {
      const { data } = await axios.get(`${dailyallowances_url}?id=${id}`);
      const singledailyallowance = data;
      dispatch({
        type: GET_SINGLE_DAILYALLOWANCE_SUCCESS,
        payload: singledailyallowance,
      });
    } catch (error) {
      dispatch({ type: GET_SINGLE_DAILYALLOWANCE_ERROR });
    }
  };

  const getSingleBatchDailyAllowance = async (period) => {
    dispatch({ type: GET_SINGLEBATCH_DAILYALLOWANCE_BEGIN });
    try {
      const res = await fetch(`${dailyallowances_url}?fv=${period}`);
      const singlebatchdailyallowance = await res.json();

      dispatch({
        type: GET_SINGLEBATCH_DAILYALLOWANCE_SUCCESS,
        payload: singlebatchdailyallowance,
      });
    } catch (error) {
      dispatch({ type: GET_SINGLEBATCH_DAILYALLOWANCE_ERROR });
    }
  };

  const addDailyAllowance = async (data) => {
    const {
      id,
      name,
      period,
      location,
      manager_name,
      no_of_days,
      amount,
      status,
    } = data;
    //
    dispatch({ type: ADD_DAILYALLOWANCE_BEGIN });
    try {
      await fetch(dailyallowances_url, {
        method: "POST",
        body: JSON.stringify({ ...data }),
      });
      dispatch({ type: ADD_DAILYALLOWANCE_SUCCESS });
    } catch (err) {
      dispatch({ type: ADD_DAILYALLOWANCE_ERROR });
    }
  };

  const updateDailyAllowance = async (data) => {
    const { id, ...fields } = data;

    dispatch({ type: UPDATE_DAILYALLOWANCE_BEGIN });
    try {
      await fetch(dailyallowances_url, {
        method: "PUT",
        body: JSON.stringify({ id, ...fields }),
      });
      dispatch({ type: UPDATE_DAILYALLOWANCE_SUCCESS });
    } catch (error) {
      dispatch({ type: UPDATE_DAILYALLOWANCE_ERROR });
    }
  };

  const deleteDailyAllowance = async (id) => {
    dispatch({ type: DELETE_DAILYALLOWANCE_BEGIN });
    try {
      await fetch(dailyallowances_url, {
        method: "DELETE",
        body: JSON.stringify({ id: id }),
      });
      dispatch({ type: DELETE_DAILYALLOWANCE_SUCCESS });
      //loadEmployees();
    } catch (err) {
      dispatch({ type: DELETE_DAILYALLOWANCE_ERROR });
    }
  };

  const loadDailyAllowsDetls = async () => {
    dispatch({ type: GET_DAILYALLOWSDETLS_BEGIN });
    try {
      // const res = await fetch(
      //   `${employees_url}?filterValue="${state.filterValue}"&filterField="${state.filterField}"`
      // );
      const res = await fetch(dailyallowsdetls_url);
      //const { data } = await axios.get(employees_url);
      //const employees = data;
      const dailyallowsdetls = await res.json();
      dispatch({
        type: GET_DAILYALLOWSDETLS_SUCCESS,
        payload: dailyallowsdetls,
      });
    } catch (error) {
      dispatch({ type: GET_DAILYALLOWSDETLS_ERROR });
    }
  };

  const loadEmpDailyAllowsDetls = async (empid, period) => {
    dispatch({ type: GET_DAILYALLOWSDETLS_BEGIN });
    try {
      const { data } = await axios.get(
        `${dailyallowsdetls_url}?fv=${empid}&period=${period}`
      );
      const dailyallowsdetls = data;

      dispatch({
        type: GET_DAILYALLOWSDETLS_SUCCESS,
        payload: dailyallowsdetls,
      });
    } catch (error) {
      dispatch({ type: GET_DAILYALLOWSDETLS_ERROR });
    }
  };

  const loadPendingDailyAllowsDetls = async (empid, period) => {
    dispatch({ type: GET_PENDING_DAILYALLOWSDETL_BEGIN });
    try {
      const { data } = await axios.get(`${pendingdailyallowsdetls_url}`);
      const pending_dailyallowsdetls = data;

      dispatch({
        type: GET_PENDING_DAILYALLOWSDETL_SUCCESS,
        payload: pending_dailyallowsdetls,
      });
    } catch (error) {
      dispatch({ type: GET_PENDING_DAILYALLOWSDETL_ERROR });
    }
  };

  const setDailyAllowsDetlPeriod = async (name) => {
    try {
      dispatch({ type: SET_DAILYALLOWSDETL_PERIOD, payload: name });
    } catch (error) {
      dispatch(error);
    }
  };

  const getSingleDailyAllowsDetl = async (id) => {
    dispatch({ type: GET_SINGLE_DAILYALLOWSDETL_BEGIN });
    try {
      const { data } = await axios.get(`${dailyallowsdetls_url}?id=${id}`);
      const singledailyallowsdetl = data;
      dispatch({
        type: GET_SINGLE_DAILYALLOWSDETL_SUCCESS,
        payload: singledailyallowsdetl,
      });
    } catch (error) {
      dispatch({ type: GET_SINGLE_DAILYALLOWSDETL_ERROR });
    }
  };

  const getSingleBatchDailyAllowsDetl = async (empid, period) => {
    dispatch({ type: GET_SINGLEBATCH_DAILYALLOWSDETL_BEGIN });
    try {
      const { data } = await axios.get(
        `${dailyallowsdetls_url}?fv=${empid}&period=${period}`
      );
      const singlebatchdailyallowsdetl = data;
      dispatch({
        type: GET_SINGLEBATCH_DAILYALLOWSDETL_SUCCESS,
        payload: singlebatchdailyallowsdetl,
      });
    } catch (error) {
      dispatch({ type: GET_SINGLEBATCH_DAILYALLOWSDETL_ERROR });
    }
  };

  const addDailyAllowsDetl = async (data) => {
    const {
      id,
      name,
      period,
      location,
      manager_name,
      no_of_days,
      amount,
      status,
    } = data;
    //
    dispatch({ type: ADD_DAILYALLOWSDETL_BEGIN });
    try {
      await fetch(dailyallowsdetls_url, {
        method: "POST",
        body: JSON.stringify({ ...data }),
      });
      dispatch({ type: ADD_DAILYALLOWSDETL_SUCCESS });
    } catch (err) {
      dispatch({ type: ADD_DAILYALLOWSDETL_ERROR });
    }
  };

  const updateDailyAllowsDetl = async (data) => {
    const { id, ...fields } = data;

    dispatch({ type: UPDATE_DAILYALLOWSDETL_BEGIN });
    try {
      await fetch(dailyallowsdetls_url, {
        method: "PUT",
        body: JSON.stringify({ id, ...fields }),
      });
      dispatch({ type: UPDATE_DAILYALLOWSDETL_SUCCESS });
    } catch (error) {
      dispatch({ type: UPDATE_DAILYALLOWSDETL_ERROR });
    }
  };

  const deleteDailyAllowsDetl = async (id) => {
    dispatch({ type: DELETE_DAILYALLOWSDETL_BEGIN });
    try {
      await fetch(dailyallowsdetls_url, {
        method: "DELETE",
        body: JSON.stringify({ id: id }),
      });
      dispatch({ type: DELETE_DAILYALLOWSDETL_SUCCESS });
      //loadEmployees();
    } catch (err) {
      dispatch({ type: DELETE_DAILYALLOWSDETL_ERROR });
    }
  };

  return (
    <DailyAllowancesContext.Provider
      value={{
        ...state,
        loadDailyAllowances,
        loadPendingDailyAllowances,
        loadEmpDailyAllowances,
        loadUnpaidDailyAllows,
        addDailyAllowance,
        updateDailyAllowance,
        deleteDailyAllowance,
        getSingleDailyAllowance,
        getSingleBatchDailyAllowance,
        setEditDailyAllowanceID,
        setIsDailyAllowanceEditingOn,
        setIsDailyAllowanceEditingOff,
        setDailyAllowancePeriod,
        resetSingleDailyAllowance,

        loadDailyAllowsDetls,
        loadEmpDailyAllowsDetls,
        loadPendingDailyAllowsDetls,
        addDailyAllowsDetl,
        updateDailyAllowsDetl,
        deleteDailyAllowsDetl,
        getSingleDailyAllowsDetl,
        getSingleBatchDailyAllowsDetl,
        setDailyAllowsDetlPeriod,
        setDailyAllowsDetlPeriod,
      }}
    >
      {children}
    </DailyAllowancesContext.Provider>
  );
};

export const useDailyAllowancesContext = () => {
  return useContext(DailyAllowancesContext);
};
