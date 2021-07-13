import React, { useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../reducers/leaves_reducer";
import { leaves_url } from "../utils/constants";

import {
  SET_EDITLEAVEID,
  SET_ISLEAVEEDITING_ON,
  SET_ISLEAVEEDITING_OFF,
  SET_SINGLELEAVE,
  GET_LEAVES_BEGIN,
  GET_LEAVES_SUCCESS,
  GET_LEAVES_ERROR,
  GET_SINGLE_LEAVE_BEGIN,
  GET_SINGLE_LEAVE_SUCCESS,
  GET_SINGLE_LEAVE_ERROR,
  GET_SINGLEBATCH_LEAVE_BEGIN,
  GET_SINGLEBATCH_LEAVE_SUCCESS,
  GET_SINGLEBATCH_LEAVE_ERROR,
  ADD_LEAVE_BEGIN,
  ADD_LEAVE_SUCCESS,
  ADD_LEAVE_ERROR,
  DELETE_LEAVE_BEGIN,
  DELETE_LEAVE_SUCCESS,
  DELETE_LEAVE_ERROR,
  UPDATE_LEAVE_BEGIN,
  UPDATE_LEAVE_SUCCESS,
  UPDATE_LEAVE_ERROR,
  RESET_SINGLE_LEAVE,
  RESET_TABLES,
} from "../actions";

const initialState = {
  isLeaveEditing: false,
  alertleave: { show: false, msg: "", type: "" },
  editLeaveID: null,
  leaves_loading: false,
  leaves_error: false,
  leaves: [],
  single_leave_loading: false,
  single_leave_error: false,
  single_leave: {},
  singlebatch_leave_loading: false,
  singlebatch_leave_error: false,
  singlebatch_leave: {},
  delete_leave_loading: false,
  delete_leave_error: false,
  update_leave_loading: false,
  update_leave_error: false,
  add_leave_loading: false,
  add_leave_error: false,
  // filterValue: "Female",
  // filterfield: "gender",
};

const LeavesContext = React.createContext();

export const LeavesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadLeaves = async () => {
    dispatch({ type: GET_LEAVES_BEGIN });
    try {
      // const res = await fetch(
      //   `${employees_url}?filterValue="${state.filterValue}"&filterField="${state.filterField}"`
      // );
      const res = await fetch(leaves_url);
      //const { data } = await axios.get(employees_url);
      //const employees = data;
      const leaves = await res.json();
      dispatch({ type: GET_LEAVES_SUCCESS, payload: leaves });
    } catch (error) {
      dispatch({ type: GET_LEAVES_ERROR });
    }
  };

  const loadPendingLeaves = async (fi) => {
    dispatch({ type: GET_LEAVES_BEGIN });
    try {
      //const res = await fetch(leaves_url);
      //const { data } = await axios.get(employees_url);
      //const employees = data;
      const { data } = await axios.get(`${leaves_url}?fi=${fi}`);
      const leaves = data;

      dispatch({ type: GET_LEAVES_SUCCESS, payload: leaves });
    } catch (error) {
      dispatch({ type: GET_LEAVES_ERROR });
    }
  };

  const loadEmpLeaves = async (fv) => {
    dispatch({ type: GET_LEAVES_BEGIN });
    try {
      const { data } = await axios.get(`${leaves_url}?fv=${fv}`);
      const leaves = data;

      dispatch({ type: GET_LEAVES_SUCCESS, payload: leaves });
    } catch (error) {
      dispatch({ type: GET_LEAVES_ERROR });
    }
  };

  const setIsLeaveEditingOn = () => {
    dispatch({ type: SET_ISLEAVEEDITING_ON });
  };

  const setIsLeaveEditingOff = () => {
    dispatch({ type: SET_ISLEAVEEDITING_OFF });
  };

  const resetSingleLeave = () => {
    dispatch({ type: RESET_SINGLE_LEAVE });
  };

  const setEditLeaveID = async (id) => {
    try {
      dispatch({ type: SET_EDITLEAVEID, payload: id });
    } catch (error) {
      dispatch(error);
    }
  };

  const getSingleLeave = async (id) => {
    dispatch({ type: GET_SINGLE_LEAVE_BEGIN });
    try {
      const { data } = await axios.get(`${leaves_url}?id=${id}`);
      const singleleave = data;
      dispatch({ type: GET_SINGLE_LEAVE_SUCCESS, payload: singleleave });
    } catch (error) {
      dispatch({ type: GET_SINGLE_LEAVE_ERROR });
    }
  };

  const getSingleBatchLeave = async (empid) => {
    dispatch({ type: GET_SINGLEBATCH_LEAVE_BEGIN });
    try {
      const { data } = await axios.get(`${leaves_url}?fv=${empid}`);
      const singlebatchleave = data;

      // const res = await fetch(`${leaves_url}?fv=${empid}`);
      //console.log(`${family_url}?fv=${linkid}`);
      // const singlebatchleave = await res.json();

      dispatch({
        type: GET_SINGLEBATCH_LEAVE_SUCCESS,
        payload: singlebatchleave,
      });
    } catch (error) {
      dispatch({ type: GET_SINGLEBATCH_LEAVE_ERROR });
    }
  };

  const addLeave = async (data) => {
    const { id, name, from_date, to_date, reason, no_of_days, status } = data;
    //
    dispatch({ type: ADD_LEAVE_BEGIN });
    try {
      await fetch(leaves_url, {
        method: "POST",
        body: JSON.stringify({ ...data }),
      });
      dispatch({ type: ADD_LEAVE_SUCCESS });
    } catch (err) {
      dispatch({ type: ADD_LEAVE_ERROR });
    }
  };

  const updateLeave = async (data) => {
    const { id, ...fields } = data;

    dispatch({ type: UPDATE_LEAVE_BEGIN });
    try {
      await fetch(leaves_url, {
        method: "PUT",
        body: JSON.stringify({ id, ...fields }),
      });
      dispatch({ type: UPDATE_LEAVE_SUCCESS });
    } catch (error) {
      dispatch({ type: UPDATE_LEAVE_ERROR });
    }
  };

  const deleteLeave = async (id) => {
    dispatch({ type: DELETE_LEAVE_BEGIN });
    try {
      await fetch(leaves_url, {
        method: "DELETE",
        body: JSON.stringify({ id: id }),
      });
      dispatch({ type: DELETE_LEAVE_SUCCESS });
      //loadEmployees();
    } catch (err) {
      dispatch({ type: DELETE_LEAVE_ERROR });
    }
  };
  return (
    <LeavesContext.Provider
      value={{
        ...state,
        loadLeaves,
        loadPendingLeaves,
        loadEmpLeaves,
        addLeave,
        updateLeave,
        deleteLeave,
        getSingleLeave,
        getSingleBatchLeave,
        setEditLeaveID,
        setIsLeaveEditingOn,
        setIsLeaveEditingOff,
        resetSingleLeave,
      }}
    >
      {children}
    </LeavesContext.Provider>
  );
};

export const useLeavesContext = () => {
  return useContext(LeavesContext);
};
