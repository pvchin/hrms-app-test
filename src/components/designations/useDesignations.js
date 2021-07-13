import { useQuery } from "react-query";
import { designations_url } from "../../utils/constants";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

// for when we need a query function for useQuery
async function getDesignations() {
  const { data } = await axios.get(`${designations_url}`);
  return data;
}

export function useDesignations() {
  const fallback = [];
  const { data: designations = fallback } = useQuery(queryKeys.designations, getDesignations);

    return { designations };
}
