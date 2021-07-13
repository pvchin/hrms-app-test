import {
  SET_EDITDAILYALLOWANCEID,
  SET_ISDAILYALLOWANCEEDITING_ON,
  SET_ISDAILYALLOWANCEEDITING_OFF,
  SET_DAILYALLOWANCE_PERIOD,
  SET_SINGLEDAILYALLOWANCE,
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
  // daily allowances details
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

const dailyallowances_reducer = (state, action) => {
  // set daily allowances variables
  if (action.type === SET_DAILYALLOWANCE_PERIOD) {
    return { ...state, dailyallowance_period: action.payload };
  }
  if (action.type === SET_EDITDAILYALLOWANCEID) {
    return { ...state, editDailyAllowanceID: action.payload };
  }

  if (action.type === SET_ISDAILYALLOWANCEEDITING_ON) {
    return { ...state, isDailyAllowanceEditing: true };
  }
  if (action.type === SET_ISDAILYALLOWANCEEDITING_OFF) {
    return { ...state, isDailyAllowanceEditing: false };
  }
  if (action.type === RESET_SINGLE_DAILYALLOWANCE) {
    return { ...state, single_dailyallowance: {} };
  }
  // get daily allowances
  if (action.type === GET_DAILYALLOWANCES_BEGIN) {
    return { ...state, dailyallowances_loading: true };
  }
  if (action.type === GET_DAILYALLOWANCES_SUCCESS) {
    return {
      ...state,
      dailyallowances_loading: false,
      dailyallowances: action.payload,
    };
  }
  if (action.type === GET_DAILYALLOWANCES_ERROR) {
    return {
      ...state,
      dailyallowances_loading: false,
      dailyallowances_error: true,
    };
  }

  // get unpaid daily allowances
  if (action.type === GET_UNPAIDDAILYALLOWS_BEGIN) {
    return { ...state, unpaid_dailyallows_loading: true };
  }
  if (action.type === GET_UNPAIDDAILYALLOWS_SUCCESS) {
    return {
      ...state,
      unpaid_dailyallows_loading: false,
      unpaiddailyallows: action.payload,
    };
  }
  if (action.type === GET_UNPAIDDAILYALLOWS_ERROR) {
    return {
      ...state,
      unpaid_dailyallows_loading: false,
      unpaid_dailyallows_error: true,
    };
  }

  // add daily allowance
  if (action.type === ADD_DAILYALLOWANCE_BEGIN) {
    return { ...state, add_dailyallowance_loading: true };
  }
  if (action.type === ADD_DAILYALLOWANCE_SUCCESS) {
    return {
      ...state,
      add_dailyallowance_loading: false,
      dailyallowances: action.payload,
    };
  }
  if (action.type === ADD_DAILYALLOWANCE_ERROR) {
    return {
      ...state,
      add_dailyallowance_loading: false,
      add_dailyallowance_error: true,
    };
  }
  // update daily allowances
  if (action.type === UPDATE_DAILYALLOWANCE_BEGIN) {
    return { ...state, update_dailyallowance_loading: true };
  }
  if (action.type === UPDATE_DAILYALLOWANCE_SUCCESS) {
    return {
      ...state,
      update_dailyallowances_loading: false,
      single_dailyallowance: action.payload,
    };
  }
  if (action.type === UPDATE_DAILYALLOWANCE_ERROR) {
    return {
      ...state,
      update_dailyallowance_loading: false,
      update_dailyallowance_error: true,
    };
  }

  // delete daily allowances
  if (action.type === DELETE_DAILYALLOWANCE_BEGIN) {
    return {
      ...state,
      delete_dailyallowance_loading: true,
      delete_dailyallowance_error: false,
    };
  }

  if (action.type === DELETE_DAILYALLOWANCE_SUCCESS) {
    return {
      ...state,
      delete_dailyallowance_loading: false,
      delete_dailyallowance_error: false,
    };
  }
  if (action.type === DELETE_DAILYALLOWANCE_ERROR) {
    return {
      ...state,
      delete_dailyallowance_loading: false,
      delete_dailyallowance_error: true,
    };
  }

  //single daily allowances
  if (action.type === GET_SINGLE_DAILYALLOWANCE_BEGIN) {
    return {
      ...state,
      single_dailyallowance_loading: true,
      single_dailyallowance_error: false,
    };
  }
  if (action.type === GET_SINGLE_DAILYALLOWANCE_SUCCESS) {
    return {
      ...state,
      single_dailyallowance_loading: false,
      single_dailyallowance: action.payload,
    };
  }
  if (action.type === GET_SINGLE_DAILYALLOWANCE_ERROR) {
    return {
      ...state,
      single_dailyallowance_loading: false,
      single_dailyallowance_error: true,
    };
  }

  //single batch daily allowances
  if (action.type === GET_SINGLEBATCH_DAILYALLOWANCE_BEGIN) {
    return {
      ...state,
      singlebatch_dailyallowance_loading: true,
      singlebatch_dailyallowance_error: false,
    };
  }
  if (action.type === GET_SINGLEBATCH_DAILYALLOWANCE_SUCCESS) {
    return {
      ...state,
      singlebatch_dailyallowance_loading: false,
      singlebatch_dailyallowance: action.payload,
    };
  }
  if (action.type === GET_SINGLEBATCH_DAILYALLOWANCE_ERROR) {
    return {
      ...state,
      singlebatch_dailyallowance_loading: false,
      singlebatch_dailyallowance_error: true,
    };
  }

  // daily allowances details
  // set daily allowances details variables
  if (action.type === SET_DAILYALLOWSDETL_PERIOD) {
    return { ...state, dailyallowsdetl_period: action.payload };
  }
  // get daily allowances details
  if (action.type === GET_DAILYALLOWSDETLS_BEGIN) {
    return { ...state, dailyallowsdetls_loading: true };
  }
  if (action.type === GET_DAILYALLOWSDETLS_SUCCESS) {
    return {
      ...state,
      dailyallowsdetls_loading: false,
      dailyallowsdetls: action.payload,
    };
  }
  if (action.type === GET_DAILYALLOWSDETLS_ERROR) {
    return {
      ...state,
      dailyallowsdetls_loading: false,
      dailyallowsdetls_error: true,
    };
  }

  // add daily allowance details
  if (action.type === ADD_DAILYALLOWSDETL_BEGIN) {
    return { ...state, add_dailyallowsdetl_loading: true };
  }
  if (action.type === ADD_DAILYALLOWSDETL_SUCCESS) {
    return {
      ...state,
      add_dailyallowsdetl_loading: false,
      dailyallowsdetls: action.payload,
    };
  }
  if (action.type === ADD_DAILYALLOWSDETL_ERROR) {
    return {
      ...state,
      add_dailyallowsdetl_loading: false,
      add_dailyallowsdetl_error: true,
    };
  }
  // update daily allowances
  if (action.type === UPDATE_DAILYALLOWSDETL_BEGIN) {
    return { ...state, update_dailyallowsdetl_loading: true };
  }
  if (action.type === UPDATE_DAILYALLOWSDETL_SUCCESS) {
    return {
      ...state,
      update_dailyallowsdetl_loading: false,
      single_dailyallowsdetl: action.payload,
    };
  }
  if (action.type === UPDATE_DAILYALLOWSDETL_ERROR) {
    return {
      ...state,
      update_dailyallowsdetl_loading: false,
      update_dailyallowsdetl_error: true,
    };
  }

  // delete daily allowances details
  if (action.type === DELETE_DAILYALLOWSDETL_BEGIN) {
    return {
      ...state,
      delete_dailyallowsdetl_loading: true,
      delete_dailyallowsdetl_error: false,
    };
  }

  if (action.type === DELETE_DAILYALLOWSDETL_SUCCESS) {
    return {
      ...state,
      delete_dailyallowsdetl_loading: false,
      delete_dailyallowsdetl_error: false,
    };
  }
  if (action.type === DELETE_DAILYALLOWSDETL_ERROR) {
    return {
      ...state,
      delete_dailyallowsdetl_loading: false,
      delete_dailyallowsdetl_error: true,
    };
  }

  //single daily allowances details
  if (action.type === GET_SINGLE_DAILYALLOWSDETL_BEGIN) {
    return {
      ...state,
      single_dailyallowsdetl_loading: true,
      single_dailyallowsdetl_error: false,
    };
  }
  if (action.type === GET_SINGLE_DAILYALLOWSDETL_SUCCESS) {
    return {
      ...state,
      single_dailyallowsdetl_loading: false,
      single_dailyallowsdetl: action.payload,
    };
  }
  if (action.type === GET_SINGLE_DAILYALLOWSDETL_ERROR) {
    return {
      ...state,
      single_dailyallowsdetl_loading: false,
      single_dailyallowsdetl_error: true,
    };
  }

  //pending daily allowances details
  if (action.type === GET_PENDING_DAILYALLOWSDETL_BEGIN) {
    return {
      ...state,
      pending_dailyallowsdetl_loading: true,
      pending_dailyallowsdetl_error: false,
    };
  }
  if (action.type === GET_PENDING_DAILYALLOWSDETL_SUCCESS) {
    return {
      ...state,
      pending_dailyallowsdetl_loading: false,
      pending_dailyallowsdetl: action.payload,
    };
  }
  if (action.type === GET_PENDING_DAILYALLOWSDETL_ERROR) {
    return {
      ...state,
      pending_dailyallowsdetl_loading: false,
      pending_dailyallowsdetl_error: true,
    };
  }

  //single daily batch allowances details
  if (action.type === GET_SINGLEBATCH_DAILYALLOWSDETL_BEGIN) {
    return {
      ...state,
      singlebatch_dailyallowsdetl_loading: true,
      singlebatch_dailyallowsdetl_error: false,
    };
  }
  if (action.type === GET_SINGLEBATCH_DAILYALLOWSDETL_SUCCESS) {
    console.log("reducer", action.payload);
    return {
      ...state,
      singlebatch_dailyallowsdetl_loading: false,
      singlebatch_dailyallowsdetl: action.payload,
    };
  }
  if (action.type === GET_SINGLEBATCH_DAILYALLOWSDETL_ERROR) {
    return {
      ...state,
      singlebatch_dailyallowsdetl_loading: false,
      singlebatch_dailyallowsdetl_error: true,
    };
  }

  // return state;
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default dailyallowances_reducer;
