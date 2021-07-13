import React, { useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../reducers/trainings_reducer";
import { trainings_url } from "../utils/constants";

import {
  SET_EDITTRAININGID,
  SET_ISTRAININGEDITING_ON,
  SET_ISTRAININGEDITING_OFF,
  SET_SINGLETRAINING,
  GET_TRAININGS_BEGIN,
  GET_TRAININGS_SUCCESS,
  GET_TRAININGS_ERROR,
  GET_SINGLE_TRAINING_BEGIN,
  GET_SINGLE_TRAINING_SUCCESS,
  GET_SINGLE_TRAINING_ERROR,
  GET_SINGLEBATCH_TRAINING_BEGIN,
  GET_SINGLEBATCH_TRAINING_SUCCESS,
  GET_SINGLEBATCH_TRAINING_ERROR,
  ADD_TRAINING_BEGIN,
  ADD_TRAINING_SUCCESS,
  ADD_TRAINING_ERROR,
  DELETE_TRAINING_BEGIN,
  DELETE_TRAINING_SUCCESS,
  DELETE_TRAINING_ERROR,
  UPDATE_TRAINING_BEGIN,
  UPDATE_TRAINING_SUCCESS,
  UPDATE_TRAINING_ERROR,
  RESET_SINGLE_TRAINING,
  RESET_TABLES,
} from "../actions";

const initialState = {
  isTrainingEditing: false,
  alerttraining: { show: false, msg: "", type: "" },
  editTrainingID: null,
  trainings_loading: false,
  trainings_error: false,
  trainings: [],
  single_training_loading: false,
  single_training_error: false,
  single_training: {},
  singlebatch_training_loading: false,
  singlebatch_training_error: false,
  singlebatch_training: {},
  delete_training_loading: false,
  delete_training_error: false,
  update_training_loading: false,
  update_training_error: false,
  add_training_loading: false,
  add_training_error: false,
  // filterValue: "Female",
  // filterfield: "gender",
};

const TrainingsContext = React.createContext();

export const TrainingsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadTrainings = async () => {
    dispatch({ type: GET_TRAININGS_BEGIN });
    try {
      // const res = await fetch(
      //   `${employees_url}?filterValue="${state.filterValue}"&filterField="${state.filterField}"`
      // );
      const res = await fetch(trainings_url);
      //const { data } = await axios.get(employees_url);
      //const employees = data;
      const trainings = await res.json();
      dispatch({ type: GET_TRAININGS_SUCCESS, payload: trainings });
    } catch (error) {
      dispatch({ type: GET_TRAININGS_ERROR });
    }
  };

  const setIsTrainingEditingOn = () => {
    dispatch({ type: SET_ISTRAININGEDITING_ON });
  };

  const setIsTrainingEditingOff = () => {
    dispatch({ type: SET_ISTRAININGEDITING_OFF });
  };

  const resetSingleTraining = () => {
    dispatch({ type: RESET_SINGLE_TRAINING });
  };

  const setEditTrainingID = async (id) => {
    try {
      dispatch({ type: SET_EDITTRAININGID, payload: id });
    } catch (error) {
      dispatch(error);
    }
  };

  const getSingleTraining = async (id) => {
    dispatch({ type: GET_SINGLE_TRAINING_BEGIN });
    try {
      const { data } = await axios.get(`${trainings_url}?id=${id}`);
      const singletraining = data;
      dispatch({ type: GET_SINGLE_TRAINING_SUCCESS, payload: singletraining });
    } catch (error) {
      dispatch({ type: GET_SINGLE_TRAINING_ERROR });
    }
  };

  const getSingleBatchTraining = async (empid) => {
    dispatch({ type: GET_SINGLEBATCH_TRAINING_BEGIN });
    try {
      const res = await fetch(`${trainings_url}?fv=${empid}`);
      //console.log(`${family_url}?fv=${linkid}`);
      const singlebatchtraining = await res.json();

      dispatch({
        type: GET_SINGLEBATCH_TRAINING_SUCCESS,
        payload: singlebatchtraining,
      });
    } catch (error) {
      dispatch({ type: GET_SINGLEBATCH_TRAINING_ERROR });
    }
  };

  const addTraining = async (data) => {
    const { id, name, from_date, to_date, reason, no_of_days, status } = data;
    //
    dispatch({ type: ADD_TRAINING_BEGIN });
    try {
      await fetch(trainings_url, {
        method: "POST",
        body: JSON.stringify({ ...data }),
      });
      dispatch({ type: ADD_TRAINING_SUCCESS });
    } catch (err) {
      dispatch({ type: ADD_TRAINING_ERROR });
    }
  };

  const updateTraining = async (data) => {
    const { id, ...fields } = data;

    dispatch({ type: UPDATE_TRAINING_BEGIN });
    try {
      await fetch(trainings_url, {
        method: "PUT",
        body: JSON.stringify({ id, ...fields }),
      });
      dispatch({ type: UPDATE_TRAINING_SUCCESS });
    } catch (error) {
      dispatch({ type: UPDATE_TRAINING_ERROR });
    }
  };

  const deleteTraining = async (id) => {
    dispatch({ type: DELETE_TRAINING_BEGIN });
    try {
      await fetch(trainings_url, {
        method: "DELETE",
        body: JSON.stringify({ id: id }),
      });
      dispatch({ type: DELETE_TRAINING_SUCCESS });
      //loadEmployees();
    } catch (err) {
      dispatch({ type: DELETE_TRAINING_ERROR });
    }
  };
  return (
    <TrainingsContext.Provider
      value={{
        ...state,
        loadTrainings,
        addTraining,
        updateTraining,
        deleteTraining,
        getSingleTraining,
        getSingleBatchTraining,
        setEditTrainingID,
        setIsTrainingEditingOn,
        setIsTrainingEditingOff,
        resetSingleTraining,
      }}
    >
      {children}
    </TrainingsContext.Provider>
  );
};

export const useTrainingsContext = () => {
  return useContext(TrainingsContext);
};
