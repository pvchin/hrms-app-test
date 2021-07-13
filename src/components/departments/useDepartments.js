import { useQuery } from "react-query";
import { departments_url } from "../../utils/constants";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getDepartments() {
  const { data } = await axios.get(`${departments_url}`);
  return data;
}

export function useDepartments() {
  const fallback = [];
  const { data: departments = fallback } = useQuery(
    queryKeys.departments,
    getDepartments
  );

  return { departments };
}
