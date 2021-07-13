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

const trainings_reducer = (state, action) => {
  // set training variables
  if (action.type === SET_EDITTRAININGID) {
    return { ...state, editTrainingID: action.payload };
  }

  if (action.type === SET_ISTRAININGEDITING_ON) {
    return { ...state, isTrainingEditing: true };
  }
  if (action.type === SET_ISTRAININGEDITING_OFF) {
    return { ...state, isTrainingEditing: false };
  }
  if (action.type === RESET_SINGLE_TRAINING) {
    return { ...state, single_training: {} };
  }
  // get trainings
  if (action.type === GET_TRAININGS_BEGIN) {
    return { ...state, trainings_loading: true };
  }
  if (action.type === GET_TRAININGS_SUCCESS) {
    return { ...state, trainings_loading: false, trainings: action.payload };
  }
  if (action.type === GET_TRAININGS_ERROR) {
    return { ...state, trainings_loading: false, trainings_error: true };
  }

  // add training
  if (action.type === ADD_TRAINING_BEGIN) {
    return { ...state, add_training_loading: true };
  }
  if (action.type === ADD_TRAINING_SUCCESS) {
    return {
      ...state,
      add_trainings_loading: false,
      trainings: action.payload,
    };
  }
  if (action.type === ADD_TRAINING_ERROR) {
    return { ...state, trainings_loading: false, add_training_error: true };
  }
  // update trainig
  if (action.type === UPDATE_TRAINING_BEGIN) {
    return { ...state, update_training_loading: true };
  }
  if (action.type === UPDATE_TRAINING_SUCCESS) {
    return {
      ...state,
      trainings_loading: false,
      single_training: action.payload,
    };
  }
  if (action.type === UPDATE_TRAINING_ERROR) {
    return {
      ...state,
      update_training_loading: false,
      update_training_error: true,
    };
  }

  // delete training
  if (action.type === DELETE_TRAINING_BEGIN) {
    return {
      ...state,
      delete_training_loading: true,
      delete_training_error: false,
    };
  }

  if (action.type === DELETE_TRAINING_SUCCESS) {
    return {
      ...state,
      delete_training_loading: false,
      delete_training_error: false,
    };
  }
  if (action.type === DELETE_TRAINING_ERROR) {
    return {
      ...state,
      delete_training_loading: false,
      delete_training_error: true,
    };
  }

  //single training
  if (action.type === GET_SINGLE_TRAINING_BEGIN) {
    return {
      ...state,
      single_training_loading: true,
      single_training_error: false,
    };
  }
  if (action.type === GET_SINGLE_TRAINING_SUCCESS) {
    return {
      ...state,
      single_training_loading: false,
      single_training: action.payload,
    };
  }
  if (action.type === GET_SINGLE_TRAINING_ERROR) {
    return {
      ...state,
      single_training_loading: false,
      single_training_error: true,
    };
  }

  //single batch training
  if (action.type === GET_SINGLEBATCH_TRAINING_BEGIN) {
    return {
      ...state,
      singlebatch_training_loading: true,
      singlebatch_training_error: false,
    };
  }
  if (action.type === GET_SINGLEBATCH_TRAINING_SUCCESS) {
    return {
      ...state,
      singlebatch_training_loading: false,
      singlebatch_training: action.payload,
    };
  }
  if (action.type === GET_SINGLEBATCH_TRAINING_ERROR) {
    return {
      ...state,
      singlebatch_training_loading: false,
      singlebatch_training_error: true,
    };
  }

  // return state;
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default trainings_reducer;
