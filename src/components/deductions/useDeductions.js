import { useQuery } from "react-query";
import { deductions_url } from "../../utils/constants";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

// for when we need a query function for useQuery
async function getDeductions() {
  const { data } = await axios.get(`${deductions_url}`);
  return data;
}

export function useDeductions() {
  const fallback = [];
  const { data: deductions = fallback } = useQuery(queryKeys.deductions, getDeductions);

  return {deductions};
}
