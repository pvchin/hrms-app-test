import { useQuery } from "react-query";
import { allowances_url } from "../../utils/constants";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getAllowances() {
  const { data } = await axios.get(`${allowances_url}`);
  return data;
}

export function useAllowances() {
  const fallback = [];
  const { data: allowances = fallback } = useQuery(queryKeys.allowances, getAllowances);

  return {allowances};
}
