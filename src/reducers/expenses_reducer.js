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

const expenses_reducer = (state, action) => {
  // set leaves variables
  if (action.type === SET_EDITEXPENSEID) {
    return { ...state, editExpenseID: action.payload };
  }

  if (action.type === SET_ISEXPENSEEDITING_ON) {
    return { ...state, isExpenseEditing: true };
  }
  if (action.type === SET_ISEXPENSEEDITING_OFF) {
    return { ...state, isExpenseEditing: false };
  }
  if (action.type === RESET_SINGLE_EXPENSE) {
    return { ...state, single_expense: {} };
  }
  // get employees
  if (action.type === GET_EXPENSES_BEGIN) {
    return { ...state, expenses_loading: true };
  }
  if (action.type === GET_EXPENSES_SUCCESS) {
    return { ...state, expenses_loading: false, expenses: action.payload };
  }
  if (action.type === GET_EXPENSES_ERROR) {
    return { ...state, expenses_loading: false, expenses_error: true };
  }

  // get unpaid expenses
  if (action.type === GET_UNPAIDEXPENSES_BEGIN) {
    return { ...state, unpaid_expenses_loading: true };
  }
  if (action.type === GET_UNPAIDEXPENSES_SUCCESS) {
    return {
      ...state,
      unpaid_expenses_loading: false,
      unpaidexpenses: action.payload,
    };
  }
  if (action.type === GET_UNPAIDEXPENSES_ERROR) {
    return {
      ...state,
      unpaid_expenses_loading: false,
      unpaid_expenses_error: true,
    };
  }

  // get period expenses
  if (action.type === GET_PERIODEXPENSES_BEGIN) {
    return { ...state, period_expenses_loading: true };
  }
  if (action.type === GET_PERIODEXPENSES_SUCCESS) {
    return {
      ...state,
      period_expenses_loading: false,
      periodexpenses: action.payload,
    };
  }
  if (action.type === GET_PERIODEXPENSES_ERROR) {
    return {
      ...state,
      period_expenses_loading: false,
      period_expenses_error: true,
    };
  }

  // add employee
  if (action.type === ADD_EXPENSE_BEGIN) {
    return { ...state, add_expense_loading: true };
  }
  if (action.type === ADD_EXPENSE_SUCCESS) {
    return {
      ...state,
      add_expenses_loading: false,
      expenses: action.payload,
    };
  }
  if (action.type === ADD_EXPENSE_ERROR) {
    return { ...state, expenses_loading: false, add_expense_error: true };
  }
  // update employee
  if (action.type === UPDATE_EXPENSE_BEGIN) {
    return { ...state, update_expense_loading: true };
  }
  if (action.type === UPDATE_EXPENSE_SUCCESS) {
    return {
      ...state,
      expenses_loading: false,
      single_expense: action.payload,
    };
  }
  if (action.type === UPDATE_EXPENSE_ERROR) {
    return {
      ...state,
      update_expense_loading: false,
      update_expense_error: true,
    };
  }

  // delete employee
  if (action.type === DELETE_EXPENSE_BEGIN) {
    return {
      ...state,
      delete_expense_loading: true,
      delete_expense_error: false,
    };
  }

  if (action.type === DELETE_EXPENSE_SUCCESS) {
    return {
      ...state,
      delete_expense_loading: false,
      delete_expense_error: false,
    };
  }
  if (action.type === DELETE_EXPENSE_ERROR) {
    return {
      ...state,
      delete_expense_loading: false,
      delete_expense_error: true,
    };
  }

  //single employee
  if (action.type === GET_SINGLE_EXPENSE_BEGIN) {
    return {
      ...state,
      single_expense_loading: true,
      single_expense_error: false,
    };
  }
  if (action.type === GET_SINGLE_EXPENSE_SUCCESS) {
    return {
      ...state,
      single_expense_loading: false,
      single_expense: action.payload,
    };
  }
  if (action.type === GET_SINGLE_EXPENSE_ERROR) {
    return {
      ...state,
      single_expense_loading: false,
      single_expense_error: true,
    };
  }

  // return state;
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default expenses_reducer;
