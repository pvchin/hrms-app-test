import React, { useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../reducers/tables_reducer";
import { allowances_url } from "../utils/constants";
import { deductions_url } from "../utils/constants";
import { departments_url } from "../utils/constants";
import { designations_url } from "../utils/constants";
import { family_url } from "../utils/constants";
import { educations_url } from "../utils/constants";
import { experiences_url } from "../utils/constants";
import { payitems_url } from "../utils/constants";

import {
  GET_PAYITEMS_BEGIN,
  GET_PAYITEMS_SUCCESS,
  GET_PAYITEMS_ERROR,
  ADD_PAYITEM_BEGIN,
  ADD_PAYITEM_SUCCESS,
  ADD_PAYITEM_ERROR,
  UPDATE_PAYITEM_BEGIN,
  UPDATE_PAYITEM_SUCCESS,
  UPDATE_PAYITEM_ERROR,
  DELETE_PAYITEM_BEGIN,
  DELETE_PAYITEM_SUCCESS,
  DELETE_PAYITEM_ERROR,
  GET_ALLOWANCES_BEGIN,
  GET_ALLOWANCES_SUCCESS,
  GET_ALLOWANCES_ERROR,
  ADD_ALLOWANCE_BEGIN,
  ADD_ALLOWANCE_SUCCESS,
  ADD_ALLOWANCE_ERROR,
  UPDATE_ALLOWANCE_BEGIN,
  UPDATE_ALLOWANCE_SUCCESS,
  UPDATE_ALLOWANCE_ERROR,
  DELETE_ALLOWANCE_BEGIN,
  DELETE_ALLOWANCE_SUCCESS,
  DELETE_ALLOWANCE_ERROR,
  GET_DEDUCTIONS_BEGIN,
  GET_DEDUCTIONS_SUCCESS,
  GET_DEDUCTIONS_ERROR,
  ADD_DEDUCTION_BEGIN,
  ADD_DEDUCTION_SUCCESS,
  ADD_DEDUCTION_ERROR,
  UPDATE_DEDUCTION_BEGIN,
  UPDATE_DEDUCTION_SUCCESS,
  UPDATE_DEDUCTION_ERROR,
  DELETE_DEDUCTION_BEGIN,
  DELETE_DEDUCTION_SUCCESS,
  DELETE_DEDUCTION_ERROR,
  GET_DEPARTMENTS_BEGIN,
  GET_DEPARTMENTS_SUCCESS,
  GET_DEPARTMENTS_ERROR,
  ADD_DEPARTMENT_BEGIN,
  ADD_DEPARTMENT_SUCCESS,
  ADD_DEPARTMENT_ERROR,
  UPDATE_DEPARTMENT_BEGIN,
  UPDATE_DEPARTMENT_SUCCESS,
  UPDATE_DEPARTMENT_ERROR,
  DELETE_DEPARTMENT_BEGIN,
  DELETE_DEPARTMENT_SUCCESS,
  DELETE_DEPARTMENT_ERROR,
  GET_DESIGNATIONS_BEGIN,
  GET_DESIGNATIONS_SUCCESS,
  GET_DESIGNATIONS_ERROR,
  ADD_DESIGNATION_BEGIN,
  ADD_DESIGNATION_SUCCESS,
  ADD_DESIGNATION_ERROR,
  UPDATE_DESIGNATION_BEGIN,
  UPDATE_DESIGNATION_SUCCESS,
  UPDATE_DESIGNATION_ERROR,
  DELETE_DESIGNATION_BEGIN,
  DELETE_DESIGNATION_SUCCESS,
  DELETE_DESIGNATION_ERROR,
  GET_FAMILY_BEGIN,
  GET_FAMILY_SUCCESS,
  GET_FAMILY_ERROR,
  ADD_FAMILY_BEGIN,
  ADD_FAMILY_SUCCESS,
  ADD_FAMILY_ERROR,
  UPDATE_FAMILY_BEGIN,
  UPDATE_FAMILY_SUCCESS,
  UPDATE_FAMILY_ERROR,
  DELETE_FAMILY_BEGIN,
  DELETE_FAMILY_SUCCESS,
  DELETE_FAMILY_ERROR,
  LOAD_SINGLEBATCH_FAMILY_BEGIN,
  LOAD_SINGLEBATCH_FAMILY_SUCCESS,
  LOAD_SINGLEBATCH_FAMILY_ERROR,
  // education
  GET_EDUCATION_BEGIN,
  GET_EDUCATION_SUCCESS,
  GET_EDUCATION_ERROR,
  ADD_EDUCATION_BEGIN,
  ADD_EDUCATION_SUCCESS,
  ADD_EDUCATION_ERROR,
  UPDATE_EDUCATION_BEGIN,
  UPDATE_EDUCATION_SUCCESS,
  UPDATE_EDUCATION_ERROR,
  DELETE_EDUCATION_BEGIN,
  DELETE_EDUCATION_SUCCESS,
  DELETE_EDUCATION_ERROR,
  LOAD_SINGLEBATCH_EDUCATION_BEGIN,
  LOAD_SINGLEBATCH_EDUCATION_SUCCESS,
  LOAD_SINGLEBATCH_EDUCATION_ERROR,
  // experience
  GET_EXPERIENCE_BEGIN,
  GET_EXPERIENCE_SUCCESS,
  GET_EXPERIENCE_ERROR,
  ADD_EXPERIENCE_BEGIN,
  ADD_EXPERIENCE_SUCCESS,
  ADD_EXPERIENCE_ERROR,
  UPDATE_EXPERIENCE_BEGIN,
  UPDATE_EXPERIENCE_SUCCESS,
  UPDATE_EXPERIENCE_ERROR,
  DELETE_EXPERIENCE_BEGIN,
  DELETE_EXPERIENCE_SUCCESS,
  DELETE_EXPERIENCE_ERROR,
  LOAD_SINGLEBATCH_EXPERIENCE_BEGIN,
  LOAD_SINGLEBATCH_EXPERIENCE_SUCCESS,
  LOAD_SINGLEBATCH_EXPERIENCE_ERROR,
  // reset
  RESET_TABLES,
} from "../actions";

const initialState = {
  payitems: [],
  payitems_loading: false,
  payitems_error: false,
  allowances: [],
  allowances_loading: false,
  allowances_error: false,
  deductions: [],
  deductions_loading: false,
  deductions_error: false,
  departments: [],
  departments_loading: false,
  departments_error: false,
  designatons: [],
  designations_loading: false,
  designations_error: false,
  family: [],
  family_loading: false,
  family_error: false,
  singlebatch_family_loading: false,
  singlebatch_family_error: false,
  singlebatchfamily: {},
  single_family: {},
  education: [],
  education_loading: false,
  education_error: false,
  singlebatch_education_loading: false,
  singlebatch_education_error: false,
  singlebatcheducation: {},
  experience: [],
  experience_loading: false,
  experience_error: false,
  singlebatch_experience_loading: false,
  singlebatch_experience_error: false,
  singlebatchexperience: {},
};

const TablesContext = React.createContext();

export const TablesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // payitems
  const loadPayitems = async () => {
    dispatch({ type: GET_PAYITEMS_BEGIN });
    try {
      // const res = await fetch(
      //   `${employees_url}?filterValue="${state.filterValue}"&filterField="${state.filterField}"`
      // );
      const res = await fetch(payitems_url);
      //const { data } = await axios.get(employees_url);
      //const employees = data;
      const payitems = await res.json();
      dispatch({ type: GET_PAYITEMS_SUCCESS, payload: payitems });
    } catch (error) {
      dispatch({ type: GET_PAYITEMS_ERROR });
    }
  };

  const addPayitem = async (data) => {
    const { id, name } = data;
    //
    dispatch({ type: ADD_PAYITEM_BEGIN });
    try {
      await fetch(payitems_url, {
        method: "POST",
        body: JSON.stringify({ ...data }),
      });
      dispatch({ type: ADD_PAYITEM_SUCCESS });
    } catch (err) {
      dispatch({ type: ADD_PAYITEM_ERROR });
    }
  };

  const updatePayitem = async (data) => {
    const { id, ...fields } = data;

    dispatch({ type: UPDATE_PAYITEM_BEGIN });
    try {
      await fetch(payitems_url, {
        method: "PUT",
        body: JSON.stringify({ id, ...fields }),
      });
      dispatch({ type: UPDATE_PAYITEM_SUCCESS });
    } catch (error) {
      dispatch({ type: UPDATE_PAYITEM_ERROR });
    }
  };

  const deletePayitem = async (id) => {
    dispatch({ type: DELETE_PAYITEM_BEGIN });
    try {
      await fetch(payitems_url, {
        method: "DELETE",
        body: JSON.stringify({ id: id }),
      });
      dispatch({ type: DELETE_PAYITEM_SUCCESS });
    } catch (err) {
      dispatch({ type: DELETE_PAYITEM_ERROR });
    }
  };

  // Allowances
  const loadAllowances = async () => {
    dispatch({ type: GET_ALLOWANCES_BEGIN });
    try {
      // const res = await fetch(
      //   `${employees_url}?filterValue="${state.filterValue}"&filterField="${state.filterField}"`
      // );
      const res = await fetch(allowances_url);
      //const { data } = await axios.get(employees_url);
      //const employees = data;
      const allowances = await res.json();
      dispatch({ type: GET_ALLOWANCES_SUCCESS, payload: allowances });
    } catch (error) {
      dispatch({ type: GET_ALLOWANCES_ERROR });
    }
  };

  const addAllowance = async (data) => {
    const { id, name } = data;
    //
    dispatch({ type: ADD_ALLOWANCE_BEGIN });
    try {
      await fetch(allowances_url, {
        method: "POST",
        body: JSON.stringify({ ...data }),
      });
      dispatch({ type: ADD_ALLOWANCE_SUCCESS });
    } catch (err) {
      dispatch({ type: ADD_ALLOWANCE_ERROR });
    }
  };

  const updateAllowance = async (data) => {
    const { id, ...fields } = data;

    dispatch({ type: UPDATE_ALLOWANCE_BEGIN });
    try {
      await fetch(allowances_url, {
        method: "PUT",
        body: JSON.stringify({ id, ...fields }),
      });
      dispatch({ type: UPDATE_ALLOWANCE_SUCCESS });
    } catch (error) {
      dispatch({ type: UPDATE_ALLOWANCE_ERROR });
    }
  };

  const deleteAllowance = async (id) => {
    dispatch({ type: DELETE_ALLOWANCE_BEGIN });
    try {
      await fetch(allowances_url, {
        method: "DELETE",
        body: JSON.stringify({ id: id }),
      });
      dispatch({ type: DELETE_ALLOWANCE_SUCCESS });
      //loadEmployees();
    } catch (err) {
      dispatch({ type: DELETE_ALLOWANCE_ERROR });
    }
  };

  // Deductions
  const loadDeductions = async () => {
    dispatch({ type: GET_DEDUCTIONS_BEGIN });
    try {
      // const res = await fetch(
      //   `${employees_url}?filterValue="${state.filterValue}"&filterField="${state.filterField}"`
      // );
      const res = await fetch(deductions_url);
      //const { data } = await axios.get(employees_url);
      //const employees = data;
      const deductions = await res.json();
      dispatch({ type: GET_DEDUCTIONS_SUCCESS, payload: deductions });
    } catch (error) {
      dispatch({ type: GET_DEDUCTIONS_ERROR });
    }
  };

  const addDeduction = async (data) => {
    const { id, name } = data;
    //
    dispatch({ type: ADD_DEDUCTION_BEGIN });
    try {
      await fetch(deductions_url, {
        method: "POST",
        body: JSON.stringify({ ...data }),
      });
      dispatch({ type: ADD_DEDUCTION_SUCCESS });
    } catch (err) {
      dispatch({ type: ADD_DEDUCTION_ERROR });
    }
  };

  const updateDeduction = async (data) => {
    const { id, ...fields } = data;

    dispatch({ type: UPDATE_DEDUCTION_BEGIN });
    try {
      await fetch(deductions_url, {
        method: "PUT",
        body: JSON.stringify({ id, ...fields }),
      });
      dispatch({ type: UPDATE_DEDUCTION_SUCCESS });
    } catch (error) {
      dispatch({ type: UPDATE_DEDUCTION_ERROR });
    }
  };

  const deleteDeduction = async (id) => {
    dispatch({ type: DELETE_DEDUCTION_BEGIN });
    try {
      await fetch(deductions_url, {
        method: "DELETE",
        body: JSON.stringify({ id: id }),
      });
      dispatch({ type: DELETE_DEDUCTION_SUCCESS });
      //loadEmployees();
    } catch (err) {
      dispatch({ type: DELETE_DEDUCTION_ERROR });
    }
  };

  // Departments
  const loadDepartments = async () => {
    dispatch({ type: GET_DEPARTMENTS_BEGIN });
    try {
      // const res = await fetch(
      //   `${employees_url}?filterValue="${state.filterValue}"&filterField="${state.filterField}"`
      // );
      const res = await fetch(departments_url);
      //const { data } = await axios.get(employees_url);
      //const employees = data;
      const departments = await res.json();
      dispatch({ type: GET_DEPARTMENTS_SUCCESS, payload: departments });
    } catch (error) {
      dispatch({ type: GET_DEPARTMENTS_ERROR });
    }
  };

  const addDepartment = async (data) => {
    const { id, name } = data;
    //
    dispatch({ type: ADD_DEPARTMENT_BEGIN });
    try {
      await fetch(departments_url, {
        method: "POST",
        body: JSON.stringify({ ...data }),
      });
      dispatch({ type: ADD_DEPARTMENT_SUCCESS });
    } catch (err) {
      dispatch({ type: ADD_DEPARTMENT_ERROR });
    }
  };

  const updateDepartment = async (data) => {
    const { id, ...fields } = data;

    dispatch({ type: UPDATE_DEPARTMENT_BEGIN });
    try {
      await fetch(departments_url, {
        method: "PUT",
        body: JSON.stringify({ id, ...fields }),
      });
      dispatch({ type: UPDATE_DEPARTMENT_SUCCESS });
    } catch (error) {
      dispatch({ type: UPDATE_DEPARTMENT_ERROR });
    }
  };

  const deleteDepartment = async (id) => {
    dispatch({ type: DELETE_DEPARTMENT_BEGIN });
    try {
      await fetch(departments_url, {
        method: "DELETE",
        body: JSON.stringify({ id: id }),
      });
      dispatch({ type: DELETE_DEPARTMENT_SUCCESS });
      //loadEmployees();
    } catch (err) {
      dispatch({ type: DELETE_DEPARTMENT_ERROR });
    }
  };

  // Designations
  const loadDesignations = async () => {
    dispatch({ type: GET_DESIGNATIONS_BEGIN });
    try {
      // const res = await fetch(
      //   `${employees_url}?filterValue="${state.filterValue}"&filterField="${state.filterField}"`
      // );
      const res = await fetch(designations_url);
      //const { data } = await axios.get(employees_url);
      //const employees = data;
      const designations = await res.json();
      dispatch({ type: GET_DESIGNATIONS_SUCCESS, payload: designations });
    } catch (error) {
      dispatch({ type: GET_DESIGNATIONS_ERROR });
    }
  };

  const addDesignation = async (data) => {
    const { id, name } = data;
    //
    dispatch({ type: ADD_DESIGNATION_BEGIN });
    try {
      await fetch(designations_url, {
        method: "POST",
        body: JSON.stringify({ ...data }),
      });
      dispatch({ type: ADD_DESIGNATION_SUCCESS });
    } catch (err) {
      dispatch({ type: ADD_DESIGNATION_ERROR });
    }
  };

  const updateDesignation = async (data) => {
    const { id, ...fields } = data;

    dispatch({ type: UPDATE_DESIGNATION_BEGIN });
    try {
      await fetch(designations_url, {
        method: "PUT",
        body: JSON.stringify({ id, ...fields }),
      });
      dispatch({ type: UPDATE_DESIGNATION_SUCCESS });
    } catch (error) {
      dispatch({ type: UPDATE_DESIGNATION_ERROR });
    }
  };

  const deleteDesignation = async (id) => {
    dispatch({ type: DELETE_DESIGNATION_BEGIN });
    try {
      await fetch(designations_url, {
        method: "DELETE",
        body: JSON.stringify({ id: id }),
      });
      dispatch({ type: DELETE_DESIGNATION_SUCCESS });
      //loadEmployees();
    } catch (err) {
      dispatch({ type: DELETE_DESIGNATION_ERROR });
    }
  };

  // Family
  const loadFamily = async () => {
    dispatch({ type: GET_FAMILY_BEGIN });
    try {
      const res = await fetch(family_url);
      const family = await res.json();
      dispatch({ type: GET_FAMILY_SUCCESS, payload: family });
    } catch (error) {
      dispatch({ type: GET_FAMILY_ERROR });
    }
  };

  const loadSingleBatchFamily = async (empid) => {
    dispatch({ type: LOAD_SINGLEBATCH_FAMILY_BEGIN });
    try {
      const res = await fetch(`${family_url}?fv=${empid}`);
      //console.log(`${family_url}?fv=${linkid}`);
      const singlebatchfamily = await res.json();

      dispatch({
        type: LOAD_SINGLEBATCH_FAMILY_SUCCESS,
        payload: singlebatchfamily,
      });
    } catch (error) {
      dispatch({ type: LOAD_SINGLEBATCH_FAMILY_ERROR });
    }
  };

  const addFamily = async (data) => {
    const { id, name } = data;

    dispatch({ type: ADD_FAMILY_BEGIN });
    try {
      await fetch(family_url, {
        method: "POST",
        body: JSON.stringify({ ...data }),
      });
      dispatch({ type: ADD_FAMILY_SUCCESS });
    } catch (err) {
      dispatch({ type: ADD_FAMILY_ERROR });
    }
  };

  const updateFamily = async (data) => {
    const { id, ...fields } = data;

    dispatch({ type: UPDATE_FAMILY_BEGIN });
    try {
      await fetch(family_url, {
        method: "PUT",
        body: JSON.stringify({ id, ...fields }),
      });
      dispatch({ type: UPDATE_FAMILY_SUCCESS });
    } catch (error) {
      dispatch({ type: UPDATE_FAMILY_ERROR });
    }
  };

  const deleteFamily = async (id) => {
    dispatch({ type: DELETE_FAMILY_BEGIN });
    try {
      await fetch(family_url, {
        method: "DELETE",
        body: JSON.stringify({ id: id }),
      });
      dispatch({ type: DELETE_FAMILY_SUCCESS });
      //loadEmployees();
    } catch (err) {
      dispatch({ type: DELETE_FAMILY_ERROR });
    }
  };

  // Education
  const loadEducation = async () => {
    dispatch({ type: GET_EDUCATION_BEGIN });
    try {
      const res = await fetch(educations_url);

      const education = await res.json();
      dispatch({ type: GET_EDUCATION_SUCCESS, payload: education });
    } catch (error) {
      dispatch({ type: GET_EDUCATION_ERROR });
    }
  };

  const loadSingleBatchEducation = async (empid) => {
    dispatch({ type: LOAD_SINGLEBATCH_EDUCATION_BEGIN });
    try {
      const res = await fetch(`${educations_url}?fv=${empid}`);

      const singlebatcheducation = await res.json();
      dispatch({
        type: LOAD_SINGLEBATCH_EDUCATION_SUCCESS,
        payload: singlebatcheducation,
      });
    } catch (error) {
      dispatch({ type: LOAD_SINGLEBATCH_EDUCATION_ERROR });
    }
  };

  const addEducation = async (data) => {
    const { id, name } = data;

    dispatch({ type: ADD_EDUCATION_BEGIN });
    try {
      await fetch(educations_url, {
        method: "POST",
        body: JSON.stringify({ ...data }),
      });
      dispatch({ type: ADD_EDUCATION_SUCCESS });
    } catch (err) {
      dispatch({ type: ADD_EDUCATION_ERROR });
    }
  };

  const updateEducation = async (data) => {
    const { id, ...fields } = data;

    dispatch({ type: UPDATE_EDUCATION_BEGIN });
    try {
      await fetch(educations_url, {
        method: "PUT",
        body: JSON.stringify({ id, ...fields }),
      });
      dispatch({ type: UPDATE_EDUCATION_SUCCESS });
    } catch (error) {
      dispatch({ type: UPDATE_EDUCATION_ERROR });
    }
  };

  const deleteEducation = async (id) => {
    dispatch({ type: DELETE_EDUCATION_BEGIN });
    try {
      await fetch(educations_url, {
        method: "DELETE",
        body: JSON.stringify({ id: id }),
      });
      dispatch({ type: DELETE_EDUCATION_SUCCESS });
    } catch (err) {
      dispatch({ type: DELETE_EDUCATION_ERROR });
    }
  };

  // Experience
  const loadExperience = async () => {
    dispatch({ type: GET_EXPERIENCE_BEGIN });
    try {
      const res = await fetch(educations_url);

      const experience = await res.json();
      dispatch({ type: GET_EXPERIENCE_SUCCESS, payload: experience });
    } catch (error) {
      dispatch({ type: GET_EXPERIENCE_ERROR });
    }
  };

  const loadSingleBatchExperience = async (empid) => {
    dispatch({ type: LOAD_SINGLEBATCH_EXPERIENCE_BEGIN });
    try {
      const res = await fetch(`${experiences_url}?fv=${empid}`);

      const singlebatchexperience = await res.json();
      dispatch({
        type: LOAD_SINGLEBATCH_EXPERIENCE_SUCCESS,
        payload: singlebatchexperience,
      });
    } catch (error) {
      dispatch({ type: LOAD_SINGLEBATCH_EXPERIENCE_ERROR });
    }
  };

  const addExperience = async (data) => {
    const { id, name } = data;

    dispatch({ type: ADD_EXPERIENCE_BEGIN });
    try {
      await fetch(experiences_url, {
        method: "POST",
        body: JSON.stringify({ ...data }),
      });
      dispatch({ type: ADD_EXPERIENCE_SUCCESS });
    } catch (err) {
      dispatch({ type: ADD_EXPERIENCE_ERROR });
    }
  };

  const updateExperience = async (data) => {
    const { id, ...fields } = data;

    dispatch({ type: UPDATE_EXPERIENCE_BEGIN });
    try {
      await fetch(experiences_url, {
        method: "PUT",
        body: JSON.stringify({ id, ...fields }),
      });
      dispatch({ type: UPDATE_EXPERIENCE_SUCCESS });
    } catch (error) {
      dispatch({ type: UPDATE_EXPERIENCE_ERROR });
    }
  };

  const deleteExperience = async (id) => {
    dispatch({ type: DELETE_EXPERIENCE_BEGIN });
    try {
      await fetch(experiences_url, {
        method: "DELETE",
        body: JSON.stringify({ id: id }),
      });
      dispatch({ type: DELETE_EXPERIENCE_SUCCESS });
      //loadEmployees();
    } catch (err) {
      dispatch({ type: DELETE_EXPERIENCE_ERROR });
    }
  };

  const resetTables = () => {
    dispatch({ type: RESET_TABLES });
  };

  return (
    <TablesContext.Provider
      value={{
        ...state,
        loadPayitems,
        addPayitem,
        deletePayitem,
        updatePayitem,
        loadAllowances,
        addAllowance,
        deleteAllowance,
        updateAllowance,
        loadDeductions,
        addDeduction,
        deleteDeduction,
        updateDeduction,
        loadDepartments,
        addDepartment,
        deleteDepartment,
        updateDepartment,
        loadDesignations,
        addDesignation,
        deleteDesignation,
        updateDesignation,
        loadFamily,
        loadSingleBatchFamily,
        addFamily,
        deleteFamily,
        updateFamily,
        loadEducation,
        loadSingleBatchEducation,
        addEducation,
        deleteEducation,
        updateEducation,
        loadExperience,
        loadSingleBatchExperience,
        addExperience,
        deleteExperience,
        updateExperience,
        resetTables,
      }}
    >
      {children}
    </TablesContext.Provider>
  );
};

export const useTablesContext = () => {
  return useContext(TablesContext);
};
