import React, { useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../reducers/payslips_reducer";
import { payslips_url } from "../utils/constants";
import { payslipitems_url } from "../utils/constants";
import { payrun_url } from "../utils/constants";
import { payslipearnings_url } from "../utils/constants";
import { payslipdeductions_url } from "../utils/constants";

import {
  SET_EDITPAYSLIPID,
  SET_PAYSLIPS_DATA,
  RESET_PAYSLIPS_DATA,
  UPDATE_PAYSLIPS_DATA,
  SET_ISPAYSLIPEDITING_ON,
  SET_ISPAYSLIPEDITING_OFF,
  SET_PAYSLIP_PERIOD,
  SET_PAYSLIP_ENDMONTHDATE,
  SET_SINGLEPAYSLIP,
  SET_PAYSLIPEARNING_AMOUNT,
  SET_PAYSLIPDEDUCTION_AMOUNT,
  GET_PAYSLIPS_BEGIN,
  GET_PAYSLIPS_SUCCESS,
  GET_PAYSLIPS_ERROR,
  GET_PAYSLIPITEMS_BEGIN,
  GET_PAYSLIPITEMS_SUCCESS,
  GET_PAYSLIPITEMS_ERROR,
  ADD_PAYSLIPITEM_BEGIN,
  ADD_PAYSLIPITEM_SUCCESS,
  ADD_PAYSLIPITEM_ERROR,
  DELETE_PAYSLIPITEM_BEGIN,
  DELETE_PAYSLIPITEM_SUCCESS,
  DELETE_PAYSLIPITEM_ERROR,
  UPDATE_PAYSLIPITEM_BEGIN,
  UPDATE_PAYSLIPITEM_SUCCESS,
  UPDATE_PAYSLIPITEM_ERROR,
  GET_PAYRUN_BEGIN,
  GET_PAYRUN_SUCCESS,
  GET_PAYRUN_ERROR,
  GET_BATCHPAYRUN_BEGIN,
  GET_BATCHPAYRUN_SUCCESS,
  GET_BATCHPAYRUN_ERROR,
  ADD_PAYRUN_BEGIN,
  ADD_PAYRUN_SUCCESS,
  ADD_PAYRUN_ERROR,
  UPDATE_PAYRUN_BEGIN,
  UPDATE_PAYRUN_SUCCESS,
  UPDATE_PAYRUN_ERROR,
  DELETE_PAYRUN_BEGIN,
  DELETE_PAYRUN_SUCCESS,
  DELETE_PAYRUN_ERROR,
  GET_SINGLE_PAYSLIP_BEGIN,
  GET_SINGLE_PAYSLIP_SUCCESS,
  GET_SINGLE_PAYSLIP_ERROR,
  GET_PENDING_PAYSLIP_BEGIN,
  GET_PENDING_PAYSLIP_SUCCESS,
  GET_PENDING_PAYSLIP_ERROR,
  GET_SINGLEBATCH_PAYSLIP_BEGIN,
  GET_SINGLEBATCH_PAYSLIP_SUCCESS,
  GET_SINGLEBATCH_PAYSLIP_ERROR,
  ADD_PAYSLIP_BEGIN,
  ADD_PAYSLIP_SUCCESS,
  ADD_PAYSLIP_ERROR,
  DELETE_PAYSLIP_BEGIN,
  DELETE_PAYSLIP_SUCCESS,
  DELETE_PAYSLIP_ERROR,
  UPDATE_PAYSLIP_BEGIN,
  UPDATE_PAYSLIP_SUCCESS,
  UPDATE_PAYSLIP_ERROR,
  RESET_SINGLE_PAYSLIP,
  GET_PAYSLIPEARNINGS_BEGIN,
  GET_PAYSLIPEARNINGS_SUCCESS,
  GET_PAYSLIPEARNINGS_ERROR,
  GET_SINGLE_PAYSLIPEARNING_BEGIN,
  GET_SINGLE_PAYSLIPEARNING_SUCCESS,
  GET_SINGLE_PAYSLIPEARNING_ERROR,
  ADD_PAYSLIPEARNING_BEGIN,
  ADD_PAYSLIPEARNING_SUCCESS,
  ADD_PAYSLIPEARNING_ERROR,
  DELETE_PAYSLIPEARNING_BEGIN,
  DELETE_PAYSLIPEARNING_SUCCESS,
  DELETE_PAYSLIPEARNING_ERROR,
  UPDATE_PAYSLIPEARNING_BEGIN,
  UPDATE_PAYSLIPEARNING_SUCCESS,
  UPDATE_PAYSLIPEARNING_ERROR,
  GET_PAYSLIPDEDUCTIONS_BEGIN,
  GET_PAYSLIPDEDUCTIONS_SUCCESS,
  GET_PAYSLIPDEDUCTIONS_ERROR,
  GET_SINGLE_PAYSLIPDEDUCTION_BEGIN,
  GET_SINGLE_PAYSLIPDEDUCTION_SUCCESS,
  GET_SINGLE_PAYSLIPDEDUCTION_ERROR,
  ADD_PAYSLIPDEDUCTION_BEGIN,
  ADD_PAYSLIPDEDUCTION_SUCCESS,
  ADD_PAYSLIPDEDUCTION_ERROR,
  DELETE_PAYSLIPDEDUCTION_BEGIN,
  DELETE_PAYSLIPDEDUCTION_SUCCESS,
  DELETE_PAYSLIPDEDUCTION_ERROR,
  UPDATE_PAYSLIPDEDUCTION_BEGIN,
  UPDATE_PAYSLIPDEDUCTION_SUCCESS,
  UPDATE_PAYSLIPDEDUCTION_ERROR,
} from "../actions";

const initialState = {
  isPayslipEditing: false,
  alertPayslip: { show: false, msg: "", type: "" },
  editPayslipID: null,
  payslips_loading: false,
  payslips_error: false,
  payslip_period: "",
  payslip_endmonthdate: "",
  payslip_earning_amount: 0,
  payslip_deduction_amount: 0,
  payslips: [],
  payslipsdata: [],
  single_payslip_loading: false,
  single_payslip_error: false,
  single_payslip: {},
  singlebatch_payslip_loading: false,
  singlebatch_payslip_error: false,
  singlebatch_payslip: {},
  delete_payslip_loading: false,
  delete_payslip_error: false,
  update_payslip_loading: false,
  update_payslip_error: false,
  add_payslip_loading: false,
  add_payslip_error: false,
  // filterValue: "Female",
  // filterfield: "gender",
  // payslip earnings
  isPayslipEarningEditing: false,
  alertPayslipEarning: { show: false, msg: "", type: "" },
  editPayslipEarningID: null,
  payslipearnings_loading: false,
  payslipearnings_error: false,
  payslipearnings: [],
  pending_payslips_loading: false,
  pending_payslips_error: false,
  pending_payslips: [],
  single_payslipearning_loading: false,
  single_payslipearning_error: false,
  single_payslipearning: {},
  delete_payslipearning_loading: false,
  delete_payslipearning_error: false,
  update_payslipearning_loading: false,
  update_payslipearning_error: false,
  add_payslipearning_loading: false,
  add_payslipearning_error: false,
  // payslip deductions
  isPayslipDeductionEditing: false,
  alertPayslipDeduction: { show: false, msg: "", type: "" },
  editPayslipDeductionID: null,
  payslipdeductions_loading: false,
  payslipdeductions_error: false,
  payslipdeductions: [],
  single_payslipdeduction_loading: false,
  single_payslipdeduction_error: false,
  single_payslipdeduction: {},
  delete_payslipdeduction_loading: false,
  delete_payslipdeduction_error: false,
  update_payslipdeduction_loading: false,
  update_payslipdeduction_error: false,
  add_payslipdeduction_loading: false,
  add_payslipdeduction_error: false,
  payslipitems_loading: false,
  payslipitems_error: false,
  payslipitems: [],
  delete_payslipitem_loading: false,
  delete_payslipitem_error: false,
  update_payslipitem_loading: false,
  update_payslipitem_error: false,
  add_payslipitem_loading: false,
  add_payslipitem_error: false,
  single_payslipitem: {},

  payrun_loading: false,
  payrun_error: false,
  payrun: [],
  batchpayrun_loading: false,
  batchpayrun_error: false,
  batchpayrun: [],
  delete_payrun_loading: false,
  delete_payrun_error: false,
  update_payrun_loading: false,
  update_payrun_error: false,
  add_payrun_loading: false,
  add_payrun_error: false,
  single_payrun: {},
};

const PayslipsContext = React.createContext();

export const PayslipsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //....... payslip
  const loadPayslips = async () => {
    dispatch({ type: GET_PAYSLIPS_BEGIN });
    try {
      // const res = await fetch(
      //   `${employees_url}?filterValue="${state.filterValue}"&filterField="${state.filterField}"`
      // );
      const res = await fetch(payslips_url);
      //const { data } = await axios.get(employees_url);
      //const employees = data;
      const payslips = await res.json();
      dispatch({ type: GET_PAYSLIPS_SUCCESS, payload: payslips });
    } catch (error) {
      dispatch({ type: GET_PAYSLIPS_ERROR });
    }
  };

  const loadPendingPayslips = async (fi) => {
    dispatch({ type: GET_PENDING_PAYSLIP_BEGIN });
    try {
      // const res = await fetch(
      //   `${employees_url}?filterValue="${state.filterValue}"&filterField="${state.filterField}"`
      // );
      const res = await fetch(`${payslips_url}?fi=${fi}`);
      //const { data } = await axios.get(employees_url);
      //const employees = data;
      const pending_payslips = await res.json();
      dispatch({
        type: GET_PENDING_PAYSLIP_SUCCESS,
        payload: pending_payslips,
      });
    } catch (error) {
      dispatch({ type: GET_PENDING_PAYSLIP_ERROR });
    }
  };

  const loadEmpPayslips = async (em) => {
    dispatch({ type: GET_PAYSLIPS_BEGIN });
    try {
      // const res = await fetch(
      //   `${employees_url}?filterValue="${state.filterValue}"&filterField="${state.filterField}"`
      // );
      const res = await fetch(`${payslips_url}?em=${em}`);
      //const { data } = await axios.get(employees_url);
      //const employees = data;
      const payslips = await res.json();
      dispatch({ type: GET_PAYSLIPS_SUCCESS, payload: payslips });
    } catch (error) {
      dispatch({ type: GET_PAYSLIPS_ERROR });
    }
  };

  const getSingleBatchPayslip = async (payrun) => {
    dispatch({ type: GET_SINGLEBATCH_PAYSLIP_BEGIN });
    try {
      const res = await fetch(`${payslips_url}?fv=${payrun}`);
      const singlebatchpayslip = await res.json();
      console.log("context", singlebatchpayslip);
      dispatch({
        type: GET_SINGLEBATCH_PAYSLIP_SUCCESS,
        payload: singlebatchpayslip,
      });
    } catch (error) {
      dispatch({ type: GET_SINGLEBATCH_PAYSLIP_ERROR });
    }
  };

  const setIsPayslipEditingOn = () => {
    dispatch({ type: SET_ISPAYSLIPEDITING_ON });
  };

  const setIsPayslipEditingOff = () => {
    dispatch({ type: SET_ISPAYSLIPEDITING_OFF });
  };

  const setPayslipsData = (value) => {
    dispatch({ type: SET_PAYSLIPS_DATA, payload: value });
  };

  const resetPayslipsData = () => {
    dispatch({ type: RESET_PAYSLIPS_DATA });
  };

  const updatePayslipsData = (name, value) => {
    dispatch({ type: UPDATE_PAYSLIPS_DATA, payload: { name, value } });
  };

  const resetSinglePayslip = () => {
    dispatch({ type: RESET_SINGLE_PAYSLIP });
  };

  const setPayslipEarningAmount = (value) => {
    dispatch({ type: SET_PAYSLIPEARNING_AMOUNT, payload: value });
  };
  const setPayslipDeductionAmount = (value) => {
    dispatch({ type: SET_PAYSLIPDEDUCTION_AMOUNT, payload: value });
  };

  const setPayslipPeriod = async (name) => {
    try {
      dispatch({ type: SET_PAYSLIP_PERIOD, payload: name });
    } catch (error) {
      dispatch(error);
    }
  };
  const setPayslipEndMonthDate = async (name) => {
    try {
      dispatch({ type: SET_PAYSLIP_ENDMONTHDATE, payload: name });
    } catch (error) {
      dispatch(error);
    }
  };

  const setEditPayslipID = async (id) => {
    try {
      dispatch({ type: SET_EDITPAYSLIPID, payload: id });
    } catch (error) {
      dispatch(error);
    }
  };

  const getSinglePayslip = async (id) => {
    dispatch({ type: GET_SINGLE_PAYSLIP_BEGIN });
    try {
      const { data } = await axios.get(`${payslips_url}?id=${id}`);
      const singlepayslip = data;
      dispatch({ type: GET_SINGLE_PAYSLIP_SUCCESS, payload: singlepayslip });
    } catch (error) {
      dispatch({ type: GET_SINGLE_PAYSLIP_ERROR });
    }
  };

  const addPayslip = async (data) => {
    const { id, name, from_date, to_date, reason, no_of_days, status } = data;
    //
    dispatch({ type: ADD_PAYSLIP_BEGIN });
    try {
      await fetch(payslips_url, {
        method: "POST",
        body: JSON.stringify({ ...data }),
      });
      dispatch({ type: ADD_PAYSLIP_SUCCESS });
    } catch (err) {
      dispatch({ type: ADD_PAYSLIP_ERROR });
    }
  };

  const updatePayslip = async (data) => {
    const { id, ...fields } = data;

    dispatch({ type: UPDATE_PAYSLIP_BEGIN });
    try {
      await fetch(payslips_url, {
        method: "PUT",
        body: JSON.stringify({ id, ...fields }),
      });
      dispatch({ type: UPDATE_PAYSLIP_SUCCESS });
    } catch (error) {
      dispatch({ type: UPDATE_PAYSLIP_ERROR });
    }
  };

  const deletePayslip = async (id) => {
    dispatch({ type: DELETE_PAYSLIP_BEGIN });
    try {
      await fetch(payslips_url, {
        method: "DELETE",
        body: JSON.stringify({ id: id }),
      });
      dispatch({ type: DELETE_PAYSLIP_SUCCESS });
    } catch (err) {
      dispatch({ type: DELETE_PAYSLIP_ERROR });
    }
  };

  //.... payslip items
  const getPayslipitems = async (fv) => {
    dispatch({ type: GET_PAYSLIPITEMS_BEGIN });
    try {
      const { data } = await axios.get(`${payslipitems_url}?period=${fv}`);
      const payslipitems = data;
      dispatch({ type: GET_PAYSLIPITEMS_SUCCESS, payload: payslipitems });
    } catch (error) {
      dispatch({ type: GET_PAYSLIPITEMS_ERROR });
    }
  };

  const addPayslipitem = async (data) => {
    //const { id, name, empid, period, payitem, paytype, amount } = data;
    //
    dispatch({ type: ADD_PAYSLIPITEM_BEGIN });
    try {
      await fetch(payslipitems_url, {
        method: "POST",
        body: JSON.stringify({ ...data }),
      });
      dispatch({ type: ADD_PAYSLIPITEM_SUCCESS });
    } catch (err) {
      dispatch({ type: ADD_PAYSLIPITEM_ERROR });
    }
  };

  const updatePayslipitem = async (data) => {
    const { id, ...fields } = data;

    dispatch({ type: UPDATE_PAYSLIPITEM_BEGIN });
    try {
      await fetch(payslipitems_url, {
        method: "PUT",
        body: JSON.stringify({ id, ...fields }),
      });
      dispatch({ type: UPDATE_PAYSLIPITEM_SUCCESS });
    } catch (error) {
      dispatch({ type: UPDATE_PAYSLIPITEM_ERROR });
    }
  };

  const deletePayslipitem = async (id) => {
    dispatch({ type: DELETE_PAYSLIPITEM_BEGIN });
    try {
      await fetch(payslipitems_url, {
        method: "DELETE",
        body: JSON.stringify({ id: id }),
      });
      dispatch({ type: DELETE_PAYSLIPITEM_SUCCESS });
    } catch (err) {
      dispatch({ type: DELETE_PAYSLIPITEM_ERROR });
    }
  };

  //.... payrun
  const getPayrun = async () => {
    dispatch({ type: GET_PAYRUN_BEGIN });
    try {
      const { data } = await axios.get(`${payrun_url}`);
      const payrun = data;
      dispatch({ type: GET_PAYRUN_SUCCESS, payload: payrun });
    } catch (error) {
      dispatch({ type: GET_PAYRUN_ERROR });
    }
  };

  
  //.... payrun
  const getBatchPayrun = async (fi) => {
    dispatch({ type: GET_BATCHPAYRUN_BEGIN });
    try {
      const { data } = await axios.get(`${payrun_url}?fi=${fi}`);
      const payrun = data;
      dispatch({ type: GET_BATCHPAYRUN_SUCCESS, payload: payrun });
    } catch (error) {
      dispatch({ type: GET_BATCHPAYRUN_ERROR });
    }
  };

  const addPayrun = async (data) => {
    //const { id, name, empid, period, payitem, paytype, amount } = data;
    //
    dispatch({ type: ADD_PAYRUN_BEGIN });
    try {
      await fetch(payrun_url, {
        method: "POST",
        body: JSON.stringify({ ...data }),
      });
      dispatch({ type: ADD_PAYRUN_SUCCESS });
    } catch (err) {
      dispatch({ type: ADD_PAYRUN_ERROR });
    }
  };

  const updatePayrun = async (data) => {
    const { id, ...fields } = data;

    dispatch({ type: UPDATE_PAYRUN_BEGIN });
    try {
      await fetch(payrun_url, {
        method: "PUT",
        body: JSON.stringify({ id, ...fields }),
      });
      dispatch({ type: UPDATE_PAYRUN_SUCCESS });
    } catch (error) {
      dispatch({ type: UPDATE_PAYRUN_ERROR });
    }
  };

  const deletePayrun = async (id) => {
    dispatch({ type: DELETE_PAYRUN_BEGIN });
    try {
      await fetch(payrun_url, {
        method: "DELETE",
        body: JSON.stringify({ id: id }),
      });
      dispatch({ type: DELETE_PAYRUN_SUCCESS });
    } catch (err) {
      dispatch({ type: DELETE_PAYRUN_ERROR });
    }
  };

  //.... payslip earnings
  const loadPayslipEarnings = async () => {
    dispatch({ type: GET_PAYSLIPEARNINGS_BEGIN });
    try {
      // const res = await fetch(
      //   `${employees_url}?filterValue="${state.filterValue}"&filterField="${state.filterField}"`
      // );
      const res = await fetch(payslipearnings_url);
      //const { data } = await axios.get(employees_url);
      //const employees = data;
      const payslipearnings = await res.json();
      dispatch({ type: GET_PAYSLIPEARNINGS_SUCCESS, payload: payslipearnings });
    } catch (error) {
      dispatch({ type: GET_PAYSLIPEARNINGS_ERROR });
    }
  };
  //.... payslip earnings
  const getSingleBatchPayslipEarnings = async (empid, period) => {
    dispatch({ type: GET_PAYSLIPEARNINGS_BEGIN });
    try {
      // const res = await fetch(
      //   `${employees_url}?filterValue="${state.filterValue}"&filterField="${state.filterField}"`
      // );
      const res = await fetch(
        `${payslipearnings_url}?fv=${empid}&period=${period}`
      );
      //const { data } = await axios.get(employees_url);
      //const employees = data;
      const payslipearnings = await res.json();
      dispatch({ type: GET_PAYSLIPEARNINGS_SUCCESS, payload: payslipearnings });
    } catch (error) {
      dispatch({ type: GET_PAYSLIPEARNINGS_ERROR });
    }
  };
  const addPayslipEarning = async (data) => {
    const { id, name, period, description, amount } = data;
    //
    dispatch({ type: ADD_PAYSLIPEARNING_BEGIN });
    try {
      await fetch(payslipearnings_url, {
        method: "POST",
        body: JSON.stringify({ ...data }),
      });
      dispatch({ type: ADD_PAYSLIPEARNING_SUCCESS });
    } catch (err) {
      dispatch({ type: ADD_PAYSLIPEARNING_ERROR });
    }
  };

  const updatePayslipEarning = async (data) => {
    const { id, ...fields } = data;

    dispatch({ type: UPDATE_PAYSLIPEARNING_BEGIN });
    try {
      await fetch(payslipearnings_url, {
        method: "PUT",
        body: JSON.stringify({ id, ...fields }),
      });
      dispatch({ type: UPDATE_PAYSLIPEARNING_SUCCESS });
    } catch (error) {
      dispatch({ type: UPDATE_PAYSLIPEARNING_ERROR });
    }
  };

  const deletePayslipEarning = async (id) => {
    dispatch({ type: DELETE_PAYSLIPEARNING_BEGIN });
    try {
      await fetch(payslipearnings_url, {
        method: "DELETE",
        body: JSON.stringify({ id: id }),
      });
      dispatch({ type: DELETE_PAYSLIPEARNING_SUCCESS });
    } catch (err) {
      dispatch({ type: DELETE_PAYSLIPEARNING_ERROR });
    }
  };

  //.... payslip deductions
  const loadPayslipDeductions = async () => {
    dispatch({ type: GET_PAYSLIPDEDUCTIONS_BEGIN });
    try {
      // const res = await fetch(
      //   `${employees_url}?filterValue="${state.filterValue}"&filterField="${state.filterField}"`
      // );
      const res = await fetch(payslipdeductions_url);
      //const { data } = await axios.get(employees_url);
      //const employees = data;
      const payslipdeductions = await res.json();
      dispatch({
        type: GET_PAYSLIPDEDUCTIONS_SUCCESS,
        payload: payslipdeductions,
      });
    } catch (error) {
      dispatch({ type: GET_PAYSLIPDEDUCTIONS_ERROR });
    }
  };
  const getSingleBatchPayslipDeductions = async (empid, period) => {
    dispatch({ type: GET_PAYSLIPDEDUCTIONS_BEGIN });
    try {
      // const res = await fetch(
      //   `${employees_url}?filterValue="${state.filterValue}"&filterField="${state.filterField}"`
      // );
      const res = await fetch(
        `${payslipdeductions_url}?fv=${empid}&period=${period}`
      );
      //const { data } = await axios.get(employees_url);
      //const employees = data;
      const payslipdeductions = await res.json();
      dispatch({
        type: GET_PAYSLIPDEDUCTIONS_SUCCESS,
        payload: payslipdeductions,
      });
    } catch (error) {
      dispatch({ type: GET_PAYSLIPDEDUCTIONS_ERROR });
    }
  };
  const addPayslipDeduction = async (data) => {
    const { id, name, period, description, amount } = data;
    //
    dispatch({ type: ADD_PAYSLIPDEDUCTION_BEGIN });
    try {
      await fetch(payslipdeductions_url, {
        method: "POST",
        body: JSON.stringify({ ...data }),
      });
      dispatch({ type: ADD_PAYSLIPDEDUCTION_SUCCESS });
    } catch (err) {
      dispatch({ type: ADD_PAYSLIPDEDUCTION_ERROR });
    }
  };

  const updatePayslipDeduction = async (data) => {
    const { id, ...fields } = data;

    dispatch({ type: UPDATE_PAYSLIPDEDUCTION_BEGIN });
    try {
      await fetch(payslipdeductions_url, {
        method: "PUT",
        body: JSON.stringify({ id, ...fields }),
      });
      dispatch({ type: UPDATE_PAYSLIPDEDUCTION_SUCCESS });
    } catch (error) {
      dispatch({ type: UPDATE_PAYSLIPDEDUCTION_ERROR });
    }
  };

  const deletePayslipDeduction = async (id) => {
    dispatch({ type: DELETE_PAYSLIPDEDUCTION_BEGIN });
    try {
      await fetch(payslipdeductions_url, {
        method: "DELETE",
        body: JSON.stringify({ id: id }),
      });
      dispatch({ type: DELETE_PAYSLIPDEDUCTION_SUCCESS });
    } catch (err) {
      dispatch({ type: DELETE_PAYSLIPDEDUCTION_ERROR });
    }
  };

  return (
    <PayslipsContext.Provider
      value={{
        ...state,
        loadPayslips,
        loadPendingPayslips,
        loadEmpPayslips,
        addPayslip,
        updatePayslip,
        deletePayslip,
        getSinglePayslip,
        getSingleBatchPayslip,
        setEditPayslipID,
        setIsPayslipEditingOn,
        setIsPayslipEditingOff,
        setPayslipsData,
        resetPayslipsData,
        updatePayslipsData,
        loadPayslipEarnings,
        addPayslipEarning,
        updatePayslipEarning,
        deletePayslipEarning,
        getSingleBatchPayslipEarnings,
        setPayslipEarningAmount,
        loadPayslipDeductions,
        addPayslipDeduction,
        updatePayslipDeduction,
        deletePayslipDeduction,
        getSingleBatchPayslipDeductions,
        setPayslipDeductionAmount,
        resetSinglePayslip,
        setPayslipPeriod,
        setPayslipEndMonthDate,
        getPayslipitems,
        deletePayslipitem,
        updatePayslipitem,
        addPayslipitem,
        getPayrun,
        getBatchPayrun,
        deletePayrun,
        updatePayrun,
        addPayrun,
      }}
    >
      {children}
    </PayslipsContext.Provider>
  );
};

export const usePayslipsContext = () => {
  return useContext(PayslipsContext);
};
