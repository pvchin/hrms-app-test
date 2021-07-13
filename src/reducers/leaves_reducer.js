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
} from "../actions";

const leaves_reducer = (state, action) => {
  // set leaves variables
  if (action.type === SET_EDITLEAVEID) {
    return { ...state, editLeaveID: action.payload };
  }

  if (action.type === SET_ISLEAVEEDITING_ON) {
    return { ...state, isLeaveEditing: true };
  }
  if (action.type === SET_ISLEAVEEDITING_OFF) {
    return { ...state, isLeaveEditing: false };
  }
  if (action.type === RESET_SINGLE_LEAVE) {
    return { ...state, single_leave: {} };
  }
  // get leaves
  if (action.type === GET_LEAVES_BEGIN) {
    return { ...state, leaves_loading: true };
  }
  if (action.type === GET_LEAVES_SUCCESS) {
    return { ...state, leaves_loading: false, leaves: action.payload };
  }
  if (action.type === GET_LEAVES_ERROR) {
    return { ...state, leaves_loading: false, leaves_error: true };
  }

  // add leave
  if (action.type === ADD_LEAVE_BEGIN) {
    return { ...state, add_leave_loading: true };
  }
  if (action.type === ADD_LEAVE_SUCCESS) {
    return {
      ...state,
      add_leaves_loading: false,
      leaves: action.payload,
    };
  }
  if (action.type === ADD_LEAVE_ERROR) {
    return { ...state, leaves_loading: false, add_leave_error: true };
  }
  // update leave
  if (action.type === UPDATE_LEAVE_BEGIN) {
    return { ...state, update_leave_loading: true };
  }
  if (action.type === UPDATE_LEAVE_SUCCESS) {
    return {
      ...state,
      leaves_loading: false,
      single_leave: action.payload,
    };
  }
  if (action.type === UPDATE_LEAVE_ERROR) {
    return {
      ...state,
      update_leave_loading: false,
      update_leave_error: true,
    };
  }

  // delete leave
  if (action.type === DELETE_LEAVE_BEGIN) {
    return {
      ...state,
      delete_leave_loading: true,
      delete_leave_error: false,
    };
  }

  if (action.type === DELETE_LEAVE_SUCCESS) {
    return {
      ...state,
      delete_leave_loading: false,
      delete_leave_error: false,
    };
  }
  if (action.type === DELETE_LEAVE_ERROR) {
    return {
      ...state,
      delete_leave_loading: false,
      delete_leave_error: true,
    };
  }

  //single leave
  if (action.type === GET_SINGLE_LEAVE_BEGIN) {
    return {
      ...state,
      single_leave_loading: true,
      single_leave_error: false,
    };
  }
  if (action.type === GET_SINGLE_LEAVE_SUCCESS) {
    return {
      ...state,
      single_leave_loading: false,
      single_leave: action.payload,
    };
  }
  if (action.type === GET_SINGLE_LEAVE_ERROR) {
    return {
      ...state,
      single_leave_loading: false,
      single_leave_error: true,
    };
  }

  //single batch leave
  if (action.type === GET_SINGLEBATCH_LEAVE_BEGIN) {
    return {
      ...state,
      singlebatch_leave_loading: true,
      singlebatch_leave_error: false,
    };
  }
  if (action.type === GET_SINGLEBATCH_LEAVE_SUCCESS) {
    return {
      ...state,
      singlebatch_leave_loading: false,
      singlebatch_leave: action.payload,
    };
  }
  if (action.type === GET_SINGLEBATCH_LEAVE_ERROR) {
    return {
      ...state,
      singlebatch_leave_loading: false,
      singlebatch_leave_error: true,
    };
  }

  // return state;
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default leaves_reducer;
