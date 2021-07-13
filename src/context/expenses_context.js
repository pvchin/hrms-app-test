import React, { useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../reducers/expenses_reducer";
import { expenses_url } from "../utils/constants";
import { unpaidexpenses_url } from "../utils/constants";

import {
  SET_EDITEXPENSEID,
  SET_ISEXPENSEEDITING_ON,
  SET_ISEXPENSEEDITING_OFF,
  SET_SINGLEEXPENSE,
  GET_EXPENSES_BEGIN,
  GET_EXPENSES_SUCCESS,
  GET_EXPENSES_ERROR,
  GET_UNPAIDEXPENSES_BEGIN,
  GET_UNPAIDEXPENSES_SUCCESS,
  GET_UNPAIDEXPENSES_ERROR,
  GET_PERIODEXPENSES_BEGIN,
  GET_PERIODEXPENSES_SUCCESS,
  GET_PERIODEXPENSES_ERROR,
  GET_SINGLE_EXPENSE_BEGIN,
  GET_SINGLE_EXPENSE_SUCCESS,
  GET_SINGLE_EXPENSE_ERROR,
  ADD_EXPENSE_BEGIN,
  ADD_EXPENSE_SUCCESS,
  ADD_EXPENSE_ERROR,
  DELETE_EXPENSE_BEGIN,
  DELETE_EXPENSE_SUCCESS,
  DELETE_EXPENSE_ERROR,
  UPDATE_EXPENSE_BEGIN,
  UPDATE_EXPENSE_SUCCESS,
  UPDATE_EXPENSE_ERROR,
  RESET_SINGLE_EXPENSE,
} from "../actions";

const initialState = {
  isExpenseEditing: false,
  alertExpense: { show: false, msg: "", type: "" },
  editExpenseID: null,
  expenses_loading: false,
  expenses_error: false,
  expenses: [],
  single_expense_loading: false,
  single_expense_error: false,
  single_expense: {},
  delete_expense_loading: false,
  delete_expense_error: false,
  update_expense_loading: false,
  update_expense_error: false,
  add_expense_loading: false,
  add_expense_error: false,
  unpaid_expense_loading: false,
  unpaid_expense_error: false,
  unpaidexpenses: [],
  period_expense_loading: false,
  period_expense_error: false,
  periodexpenses: [],
  // filterValue: "Female",
  // filterfield: "gender",
};

const ExpensesContext = React.createContext();

export const ExpensesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadExpenses = async () => {
    dispatch({ type: GET_EXPENSES_BEGIN });
    try {
      // const res = await fetch(
      //   `${employees_url}?filterValue="${state.filterValue}"&filterField="${state.filterField}"`
      // );
      const res = await fetch(expenses_url);
      //const { data } = await axios.get(employees_url);
      //const employees = data;
      const expenses = await res.json();
      dispatch({ type: GET_EXPENSES_SUCCESS, payload: expenses });
    } catch (error) {
      dispatch({ type: GET_EXPENSES_ERROR });
    }
  };

  const loadPendingExpenses = async (fi) => {
    dispatch({ type: GET_EXPENSES_BEGIN });
    try {
      //const res = await fetch(leaves_url);
      //const { data } = await axios.get(employees_url);
      //const employees = data;
      const { data } = await axios.get(`${expenses_url}?fi=${fi}`);
      const expenses = data;

      dispatch({ type: GET_EXPENSES_SUCCESS, payload: expenses });
    } catch (error) {
      dispatch({ type: GET_EXPENSES_ERROR });
    }
  };

  const loadEmpExpenses = async (fv) => {
    dispatch({ type: GET_EXPENSES_BEGIN });
    try {
      const { data } = await axios.get(`${expenses_url}?fv=${fv}`);
      const expenses = data;

      dispatch({ type: GET_EXPENSES_SUCCESS, payload: expenses });
    } catch (error) {
      dispatch({ type: GET_EXPENSES_ERROR });
    }
  };

  const loadUnpaidExpenses = async () => {
    dispatch({ type: GET_UNPAIDEXPENSES_BEGIN });
    try {
      // const { data } = await axios.get(`${unpaidexpenses_url}`);
      // const unpaidexpenses = data;
      const res = await fetch(unpaidexpenses_url);
      const unpaidexpenses = await res.json();
      dispatch({ type: GET_UNPAIDEXPENSES_SUCCESS, payload: unpaidexpenses });
    } catch (error) {
      dispatch({ type: GET_UNPAIDEXPENSES_ERROR });
    }
  };

  const loadPeriodExpenses = async () => {
    dispatch({ type: GET_PERIODEXPENSES_BEGIN });
    try {
      const { data } = await axios.get(`${unpaidexpenses_url}`);
      const periodexpenses = data;

      dispatch({ type: GET_PERIODEXPENSES_SUCCESS, payload: periodexpenses });
    } catch (error) {
      dispatch({ type: GET_PERIODEXPENSES_ERROR });
    }
  };

  const setIsExpenseEditingOn = () => {
    dispatch({ type: SET_ISEXPENSEEDITING_ON });
  };

  const setIsExpenseEditingOff = () => {
    dispatch({ type: SET_ISEXPENSEEDITING_OFF });
  };

  const resetSingleExpense = () => {
    dispatch({ type: RESET_SINGLE_EXPENSE });
  };

  const setEditExpenseID = async (id) => {
    try {
      dispatch({ type: SET_EDITEXPENSEID, payload: id });
    } catch (error) {
      dispatch(error);
    }
  };

  const getSingleExpense = async (id) => {
    dispatch({ type: GET_SINGLE_EXPENSE_BEGIN });
    try {
      const { data } = await axios.get(`${expenses_url}?id=${id}`);
      const singleexpense = data;
      dispatch({ type: GET_SINGLE_EXPENSE_SUCCESS, payload: singleexpense });
    } catch (error) {
      dispatch({ type: GET_SINGLE_EXPENSE_ERROR });
    }
  };

  const addExpense = async (data) => {
    const { id, name, date, purchased_date, remark, amount, status } = data;
    //
    dispatch({ type: ADD_EXPENSE_BEGIN });
    try {
      await fetch(expenses_url, {
        method: "POST",
        body: JSON.stringify({ ...data }),
      });
      dispatch({ type: ADD_EXPENSE_SUCCESS });
    } catch (err) {
      dispatch({ type: ADD_EXPENSE_ERROR });
    }
  };

  const updateExpense = async (data) => {
    const { id, ...fields } = data;

    dispatch({ type: UPDATE_EXPENSE_BEGIN });
    try {
      await fetch(expenses_url, {
        method: "PUT",
        body: JSON.stringify({ id, ...fields }),
      });
      dispatch({ type: UPDATE_EXPENSE_SUCCESS });
    } catch (error) {
      dispatch({ type: UPDATE_EXPENSE_ERROR });
    }
  };

  const deleteExpense = async (id) => {
    dispatch({ type: DELETE_EXPENSE_BEGIN });
    try {
      await fetch(expenses_url, {
        method: "DELETE",
        body: JSON.stringify({ id: id }),
      });
      dispatch({ type: DELETE_EXPENSE_SUCCESS });
      //loadEmployees();
    } catch (err) {
      dispatch({ type: DELETE_EXPENSE_ERROR });
    }
  };
  return (
    <ExpensesContext.Provider
      value={{
        ...state,
        loadExpenses,
        loadPendingExpenses,
        loadEmpExpenses,
        loadUnpaidExpenses,
        loadPeriodExpenses,
        addExpense,
        updateExpense,
        deleteExpense,
        getSingleExpense,
        setEditExpenseID,
        setIsExpenseEditingOn,
        setIsExpenseEditingOff,
        resetSingleExpense,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

export const useExpensesContext = () => {
  return useContext(ExpensesContext);
};
