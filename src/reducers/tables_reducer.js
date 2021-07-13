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
  RESET_TABLES,
} from "../actions";

const tables_reducer = (state, action) => {
  // ....... payitems
  // get payitems
  if (action.type === GET_PAYITEMS_BEGIN) {
    return { ...state, payitems_loading: true };
  }
  if (action.type === GET_PAYITEMS_SUCCESS) {
    return { ...state, payitems_loading: false, payitems: action.payload };
  }
  if (action.type === GET_PAYITEMS_ERROR) {
    return { ...state, payitems_loading: false, payitems_error: true };
  }
  // add payitems
  if (action.type === ADD_PAYITEM_BEGIN) {
    return { ...state, add_payitem_loading: true };
  }
  if (action.type === ADD_PAYITEM_SUCCESS) {
    return {
      ...state,
      add_payitem_loading: false,
      single_payitems: action.payload,
    };
  }
  if (action.type === ADD_PAYITEM_ERROR) {
    return {
      ...state,
      add_payitems_loading: false,
      payitems_error: true,
    };
  }
  // update payitems
  if (action.type === UPDATE_PAYITEM_BEGIN) {
    return { ...state, update_payitem_loading: true };
  }
  if (action.type === UPDATE_PAYITEM_SUCCESS) {
    return {
      ...state,
      update_payitems_loading: false,
      single_payitem: action.payload,
    };
  }
  if (action.type === UPDATE_PAYITEM_ERROR) {
    return {
      ...state,
      update_payitem_loading: false,
      update_payitem_error: true,
    };
  }

  // delete payitem
  if (action.type === DELETE_PAYITEM_BEGIN) {
    return {
      ...state,
      delete_payitem_loading: true,
      delete_payitem_error: false,
    };
  }

  if (action.type === DELETE_PAYITEM_SUCCESS) {
    return {
      ...state,
      delete_payitem_loading: false,
      delete_payitem_error: false,
    };
  }
  if (action.type === DELETE_PAYITEM_ERROR) {
    return {
      ...state,
      delete_payitem_loading: false,
      delete_payitem_error: true,
    };
  }

  // ....... allowances
  // get allowances
  if (action.type === GET_ALLOWANCES_BEGIN) {
    return { ...state, allowances_loading: true };
  }
  if (action.type === GET_ALLOWANCES_SUCCESS) {
    return { ...state, allowances_loading: false, allowances: action.payload };
  }
  if (action.type === GET_ALLOWANCES_ERROR) {
    return { ...state, allowances_loading: false, allowances_error: true };
  }
  // add allowances
  if (action.type === ADD_ALLOWANCE_BEGIN) {
    return { ...state, add_allowance_loading: true };
  }
  if (action.type === ADD_ALLOWANCE_SUCCESS) {
    return {
      ...state,
      add_allowance_loading: false,
      allowances: action.payload,
    };
  }
  if (action.type === ADD_ALLOWANCE_ERROR) {
    return {
      ...state,
      allowances_loading: false,
      allowances_error: true,
    };
  }
  // update allowance
  if (action.type === UPDATE_ALLOWANCE_BEGIN) {
    return { ...state, update_allowance_loading: true };
  }
  if (action.type === UPDATE_ALLOWANCE_SUCCESS) {
    return {
      ...state,
      allowances_loading: false,
      single_allowance: action.payload,
    };
  }
  if (action.type === UPDATE_ALLOWANCE_ERROR) {
    return {
      ...state,
      update_allowance_loading: false,
      update_allowance_error: true,
    };
  }

  // delete allowance
  if (action.type === DELETE_ALLOWANCE_BEGIN) {
    return {
      ...state,
      delete_allowance_loading: true,
      delete_allowance_error: false,
    };
  }

  if (action.type === DELETE_ALLOWANCE_SUCCESS) {
    return {
      ...state,
      delete_allowance_loading: false,
      delete_allowance_error: false,
    };
  }
  if (action.type === DELETE_ALLOWANCE_ERROR) {
    return {
      ...state,
      delete_allowance_loading: false,
      delete_allowance_error: true,
    };
  }

  // ...... deductions
  // get deductions
  if (action.type === GET_DEDUCTIONS_BEGIN) {
    return { ...state, deductions_loading: true };
  }
  if (action.type === GET_DEDUCTIONS_SUCCESS) {
    return { ...state, deductions_loading: false, deductions: action.payload };
  }
  if (action.type === GET_DEDUCTIONS_ERROR) {
    return { ...state, deductions_loading: false, deductions_error: true };
  }

  // add deduction
  if (action.type === ADD_DEDUCTION_BEGIN) {
    return { ...state, add_deduction_loading: true };
  }
  if (action.type === ADD_DEDUCTION_SUCCESS) {
    return {
      ...state,
      add_deduction_loading: false,
      deductions: action.payload,
    };
  }
  if (action.type === ADD_DEDUCTION_ERROR) {
    return {
      ...state,
      deductions_loading: false,
      deductions_error: true,
    };
  }
  // update deduction
  if (action.type === UPDATE_DEDUCTION_BEGIN) {
    return { ...state, update_deduction_loading: true };
  }
  if (action.type === UPDATE_DEDUCTION_SUCCESS) {
    return {
      ...state,
      deductions_loading: false,
      single_deduction: action.payload,
    };
  }
  if (action.type === UPDATE_DEDUCTION_ERROR) {
    return {
      ...state,
      update_deduction_loading: false,
      update_deduction_error: true,
    };
  }

  // delete deduction
  if (action.type === DELETE_DEDUCTION_BEGIN) {
    return {
      ...state,
      delete_deduction_loading: true,
      delete_deduction_error: false,
    };
  }

  if (action.type === DELETE_DEDUCTION_SUCCESS) {
    return {
      ...state,
      delete_deduction_loading: false,
      delete_deduction_error: false,
    };
  }
  if (action.type === DELETE_DEDUCTION_ERROR) {
    return {
      ...state,
      delete_deduction_loading: false,
      delete_deduction_error: true,
    };
  }

  // ..... departments
  // get departments
  if (action.type === GET_DEPARTMENTS_BEGIN) {
    return { ...state, departments_loading: true };
  }
  if (action.type === GET_DEPARTMENTS_SUCCESS) {
    return {
      ...state,
      departments_loading: false,
      departments: action.payload,
    };
  }
  if (action.type === GET_DEPARTMENTS_ERROR) {
    return { ...state, departments_loading: false, departments_error: true };
  }

  // add department
  if (action.type === ADD_DEPARTMENT_BEGIN) {
    return { ...state, add_department_loading: true };
  }
  if (action.type === ADD_DEPARTMENT_SUCCESS) {
    return {
      ...state,
      add_department_loading: false,
      departments: action.payload,
    };
  }
  if (action.type === ADD_DEPARTMENT_ERROR) {
    return {
      ...state,
      departments_loading: false,
      departments_error: true,
    };
  }
  // update department
  if (action.type === UPDATE_DEPARTMENT_BEGIN) {
    return { ...state, update_deduction_loading: true };
  }
  if (action.type === UPDATE_DEPARTMENT_SUCCESS) {
    return {
      ...state,
      departments_loading: false,
      single_department: action.payload,
    };
  }
  if (action.type === UPDATE_DEPARTMENT_ERROR) {
    return {
      ...state,
      update_department_loading: false,
      update_department_error: true,
    };
  }

  // delete department
  if (action.type === DELETE_DEPARTMENT_BEGIN) {
    return {
      ...state,
      delete_department_loading: true,
      delete_department_error: false,
    };
  }

  if (action.type === DELETE_DEPARTMENT_SUCCESS) {
    return {
      ...state,
      delete_department_loading: false,
      delete_department_error: false,
    };
  }
  if (action.type === DELETE_DEPARTMENT_ERROR) {
    return {
      ...state,
      delete_department_loading: false,
      delete_department_error: true,
    };
  }

  // ...... designation
  // get designations
  if (action.type === GET_DESIGNATIONS_BEGIN) {
    return { ...state, designations_loading: true };
  }
  if (action.type === GET_DESIGNATIONS_SUCCESS) {
    return {
      ...state,
      designations_loading: false,
      designations: action.payload,
    };
  }
  if (action.type === GET_DESIGNATIONS_ERROR) {
    return { ...state, designations_loading: false, designations_error: true };
  }

  // add designation
  if (action.type === ADD_DESIGNATION_BEGIN) {
    return { ...state, add_designation_loading: true };
  }
  if (action.type === ADD_DESIGNATION_SUCCESS) {
    return {
      ...state,
      add_designation_loading: false,
      designations: action.payload,
    };
  }
  if (action.type === ADD_DESIGNATION_ERROR) {
    return {
      ...state,
      designations_loading: false,
      designations_error: true,
    };
  }
  // update designation
  if (action.type === UPDATE_DESIGNATION_BEGIN) {
    return { ...state, update_designation_loading: true };
  }
  if (action.type === UPDATE_DESIGNATION_SUCCESS) {
    return {
      ...state,
      designations_loading: false,
      single_designation: action.payload,
    };
  }
  if (action.type === UPDATE_DESIGNATION_ERROR) {
    return {
      ...state,
      update_designation_loading: false,
      update_designation_error: true,
    };
  }

  // delete designation
  if (action.type === DELETE_DESIGNATION_BEGIN) {
    return {
      ...state,
      delete_designation_loading: true,
      delete_designation_error: false,
    };
  }

  if (action.type === DELETE_DESIGNATION_SUCCESS) {
    return {
      ...state,
      delete_designation_loading: false,
      delete_designation_error: false,
    };
  }
  if (action.type === DELETE_DESIGNATION_ERROR) {
    return {
      ...state,
      delete_designation_loading: false,
      delete_designation_error: true,
    };
  }

  // ...... family
  // get family
  if (action.type === GET_FAMILY_BEGIN) {
    return { ...state, family_loading: true };
  }
  if (action.type === GET_FAMILY_SUCCESS) {
    return {
      ...state,
      family_loading: false,
      family: action.payload,
    };
  }
  if (action.type === GET_FAMILY_ERROR) {
    return { ...state, family_loading: false, family_error: true };
  }

  // load single batch family
  try {
    if (action.type === LOAD_SINGLEBATCH_FAMILY_BEGIN) {
      return { ...state, singlebatch_family_loading: true };
    }
    if (action.type === LOAD_SINGLEBATCH_FAMILY_SUCCESS) {
      return {
        ...state,
        singlebatch_family_loading: false,
        singlebatchfamily: action.payload,
      };
    }
    if (action.type === LOAD_SINGLEBATCH_FAMILY_ERROR) {
      return {
        ...state,
        singlebatch_family_loading: false,
        singlebatch_family_error: true,
      };
    }
  } catch (error) {
    console.log(error);
  }
  // add family
  if (action.type === ADD_FAMILY_BEGIN) {
    return { ...state, add_family_loading: true };
  }
  if (action.type === ADD_FAMILY_SUCCESS) {
    return {
      ...state,
      add_family_loading: false,
      family: action.payload,
    };
  }
  if (action.type === ADD_FAMILY_ERROR) {
    return {
      ...state,
      family_loading: false,
      family_error: true,
    };
  }
  // update family
  if (action.type === UPDATE_FAMILY_BEGIN) {
    return { ...state, update_family_loading: true };
  }
  if (action.type === UPDATE_FAMILY_SUCCESS) {
    return {
      ...state,
      update_family_loading: false,
      single_family: action.payload,
    };
  }
  if (action.type === UPDATE_FAMILY_ERROR) {
    return {
      ...state,
      update_family_loading: false,
      update_family_error: true,
    };
  }

  // delete family
  if (action.type === DELETE_FAMILY_BEGIN) {
    return {
      ...state,
      delete_family_loading: true,
      delete_family_error: false,
    };
  }

  if (action.type === DELETE_FAMILY_SUCCESS) {
    return {
      ...state,
      delete_family_loading: false,
      delete_family_error: false,
    };
  }
  if (action.type === DELETE_FAMILY_ERROR) {
    return {
      ...state,
      delete_family_loading: false,
      delete_family_error: true,
    };
  }

  // ...... education
  // get education
  if (action.type === GET_EDUCATION_BEGIN) {
    return { ...state, education_loading: true };
  }
  if (action.type === GET_EDUCATION_SUCCESS) {
    return {
      ...state,
      education_loading: false,
      education: action.payload,
    };
  }
  if (action.type === GET_EDUCATION_ERROR) {
    return { ...state, education_loading: false, education_error: true };
  }

  // load single batch education
  if (action.type === LOAD_SINGLEBATCH_EDUCATION_BEGIN) {
    return { ...state, singlebatch_education_loading: true };
  }
  if (action.type === LOAD_SINGLEBATCH_EDUCATION_SUCCESS) {
    return {
      ...state,
      singlebatch_education_loading: false,
      singlebatcheducation: action.payload,
    };
  }
  if (action.type === LOAD_SINGLEBATCH_EDUCATION_ERROR) {
    return {
      ...state,
      singlebatch_education_loading: false,
      singlebatch_education_error: true,
    };
  }

  // add education
  if (action.type === ADD_EDUCATION_BEGIN) {
    return { ...state, add_education_loading: true };
  }
  if (action.type === ADD_EDUCATION_SUCCESS) {
    return {
      ...state,
      add_education_loading: false,
      family: action.payload,
    };
  }
  if (action.type === ADD_EDUCATION_ERROR) {
    return {
      ...state,
      education_loading: false,
      education_error: true,
    };
  }
  // update education
  if (action.type === UPDATE_EDUCATION_BEGIN) {
    return { ...state, update_education_loading: true };
  }
  if (action.type === UPDATE_EDUCATION_SUCCESS) {
    return {
      ...state,
      update_education_loading: false,
      single_education: action.payload,
    };
  }
  if (action.type === UPDATE_EDUCATION_ERROR) {
    return {
      ...state,
      update_education_loading: false,
      update_education_error: true,
    };
  }

  // delete education
  if (action.type === DELETE_EDUCATION_BEGIN) {
    return {
      ...state,
      delete_education_loading: true,
      delete_education_error: false,
    };
  }

  if (action.type === DELETE_EDUCATION_SUCCESS) {
    return {
      ...state,
      delete_education_loading: false,
      delete_education_error: false,
    };
  }
  if (action.type === DELETE_EDUCATION_ERROR) {
    return {
      ...state,
      delete_education_loading: false,
      delete_education_error: true,
    };
  }

  // ...... experience
  // get experience
  if (action.type === GET_EXPERIENCE_BEGIN) {
    return { ...state, experience_loading: true };
  }
  if (action.type === GET_EXPERIENCE_SUCCESS) {
    return {
      ...state,
      experience_loading: false,
      experience: action.payload,
    };
  }
  if (action.type === GET_EXPERIENCE_ERROR) {
    return { ...state, experience_loading: false, experience_error: true };
  }

  // load single batch education
  if (action.type === LOAD_SINGLEBATCH_EXPERIENCE_BEGIN) {
    return { ...state, singlebatch_experience_loading: true };
  }
  if (action.type === LOAD_SINGLEBATCH_EXPERIENCE_SUCCESS) {
    return {
      ...state,
      singlebatch_experience_loading: false,
      singlebatchexperience: action.payload,
    };
  }
  if (action.type === LOAD_SINGLEBATCH_EXPERIENCE_ERROR) {
    return {
      ...state,
      singlebatch_experience_loading: false,
      singlebatch_experience_error: true,
    };
  }

  // add experience
  if (action.type === ADD_EXPERIENCE_BEGIN) {
    return { ...state, add_experience_loading: true };
  }
  if (action.type === ADD_EXPERIENCE_SUCCESS) {
    return {
      ...state,
      add_experience_loading: false,
      family: action.payload,
    };
  }
  if (action.type === ADD_EXPERIENCE_ERROR) {
    return {
      ...state,
      experience_loading: false,
      experience_error: true,
    };
  }
  // update experience
  if (action.type === UPDATE_EXPERIENCE_BEGIN) {
    return { ...state, update_experience_loading: true };
  }
  if (action.type === UPDATE_EXPERIENCE_SUCCESS) {
    return {
      ...state,
      update_experience_loading: false,
      single_experience: action.payload,
    };
  }
  if (action.type === UPDATE_EXPERIENCE_ERROR) {
    return {
      ...state,
      update_experience_loading: false,
      update_experience_error: true,
    };
  }

  // delete experience
  if (action.type === DELETE_EXPERIENCE_BEGIN) {
    return {
      ...state,
      delete_experience_loading: true,
      delete_experience_error: false,
    };
  }

  if (action.type === DELETE_EXPERIENCE_SUCCESS) {
    return {
      ...state,
      delete_experience_loading: false,
      delete_experience_error: false,
    };
  }
  if (action.type === DELETE_EXPERIENCE_ERROR) {
    return {
      ...state,
      delete_experience_loading: false,
      delete_experience_error: true,
    };
  }

  // reset tables
  if (action.type === RESET_TABLES) {
    return {
      deductions: [],
      allowances: [],
      departments: [],
      designatons: [],
      family: [],
      singlebatchfamily: {},
      single_family: {},
      education: [],
      singlebatcheducation: {},
      experience: [],
      singlebatchexperience: {},
    };
  }

  // return state;
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default tables_reducer;
