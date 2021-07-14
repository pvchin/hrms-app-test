import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { employees_url } from "../../utils/constants";
import { filterByEmpId } from "./utils";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getEmployees(empid) {
  //const { data } = await axios.get(`${employees_url}?id=${empid}`);
  const { data } = await axios.get(`${employees_url}`);
  return data;
}

export function useEmployees(empid) {
  const [filter, setFilter] = useState("all");
  const [employeeId, setEmployeeId] = useState("");

  const selectFn = useCallback(
    (unfiltered) => filterByEmpId(unfiltered, filter),
    [filter]
  );

  const fallback = [];
  const { data: employees = fallback } = useQuery(
    [queryKeys.employees],
    () => getEmployees(employeeId),
    {
      select: filter !== "all" ? selectFn : undefined,
    }
  );

  return { employees, filter, setFilter, setEmployeeId };
}
