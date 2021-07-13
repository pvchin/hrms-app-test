import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { expenses_url } from "../../utils/constants";
import { filterByEmpId } from "./utils";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getExpenses(empid) {
  //const { data } = await axios.get(`${leaves_url}?fv=${empid}`);
  const { data } = await axios.get(`${expenses_url}`);
  return data;
}

export function useExpenses(empid) {
  const [filter, setFilter] = useState("all");
  const [expenseId, setExpenseId] = useState("");

  const selectFn = useCallback(
    (unfiltered) => filterByEmpId(unfiltered, filter),
    [filter]
  );

  const fallback = [];
  const { data: expenses = fallback } = useQuery(
    //[queryKeys.leaves, { leaveId }],
    queryKeys.expenses,
    () => getExpenses(expenseId),
    {
      select: filter !== "all" ? selectFn : undefined,
    }
  );

  return { expenses, filter, setFilter, setExpenseId };
}
