import {
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
  SET_EDITEMPLOYEEID,
  SET_ISEDITING_ON,
  SET_ISEDITING_OFF,
  RESET_SINGLE_EMPLOYEE,
  RESET_EMPLOYEES,
} from "../actions";

const employees_reducer = (state, action) => {
  // set employees variables
  if (action.type === SET_EDITEMPLOYEEID) {
    return { ...state, editEmployeeID: action.payload };
  }

  if (action.type === SET_ISEDITING_ON) {
    return { ...state, isEditing: true };
  }
  if (action.type === SET_ISEDITING_OFF) {
    return { ...state, isEditing: false };
  }
  if (action.type === RESET_SINGLE_EMPLOYEE) {
    return { ...state, single_employee: {} };
  }
  if (action.type === RESET_EMPLOYEES) {
    return { ...state, employee: {} };
  }
  // get employees
  if (action.type === GET_EMPLOYEES_BEGIN) {
    return { ...state, employees_loading: true };
  }
  if (action.type === GET_EMPLOYEES_SUCCESS) {
    return { ...state, employees_loading: false, employees: action.payload };
  }
  if (action.type === GET_EMPLOYEES_ERROR) {
    return { ...state, employees_loading: false, employees_error: true };
  }

  // add employee
  if (action.type === ADD_EMPLOYEE_BEGIN) {
    return { ...state, add_employee_loading: true };
  }
  if (action.type === ADD_EMPLOYEE_SUCCESS) {
    return {
      ...state,
      add_employees_loading: false,
      employees: action.payload,
    };
  }
  if (action.type === ADD_EMPLOYEE_ERROR) {
    return { ...state, employees_loading: false, add_employee_error: true };
  }
  // update employee
  if (action.type === UPDATE_EMPLOYEE_BEGIN) {
    return { ...state, update_employee_loading: true };
  }
  if (action.type === UPDATE_EMPLOYEE_SUCCESS) {
    return {
      ...state,
      employees_loading: false,
      single_employee: action.payload,
    };
  }
  if (action.type === UPDATE_EMPLOYEE_ERROR) {
    return {
      ...state,
      update_employee_loading: false,
      update_employee_error: true,
    };
  }

  // delete employee
  if (action.type === DELETE_EMPLOYEE_BEGIN) {
    return {
      ...state,
      delete_employee_loading: true,
      delete_employee_error: false,
    };
  }

  if (action.type === DELETE_EMPLOYEE_SUCCESS) {
    return {
      ...state,
      delete_employee_loading: false,
      delete_employee_error: false,
    };
  }
  if (action.type === DELETE_EMPLOYEE_ERROR) {
    return {
      ...state,
      delete_employee_loading: false,
      delete_employee_error: true,
    };
  }

  //single employee
  if (action.type === GET_SINGLE_EMPLOYEE_BEGIN) {
    return {
      ...state,
      single_employee_loading: true,
      single_employee_error: false,
    };
  }
  if (action.type === GET_SINGLE_EMPLOYEE_SUCCESS) {
    return {
      ...state,
      single_employee_loading: false,
      single_employee: action.payload,
    };
  }
  if (action.type === GET_SINGLE_EMPLOYEE_ERROR) {
    return {
      ...state,
      single_employee_loading: false,
      single_employee_error: true,
    };
  }

  // return state;
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default employees_reducer;
