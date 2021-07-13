import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { payrun_url } from "../../utils/constants";
import { filterByEmpId } from "./utils";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getPayrun(empid) {
  //const { data } = await axios.get(`${leaves_url}?fv=${empid}`);
  const { data } = await axios.get(`${payrun_url}`);
  return data;
}

export function usePayrun(empid) {
  const [filter, setFilter] = useState("all");
  const [payrunId, setPayrunId] = useState("");

  const selectFn = useCallback(
    (unfiltered) => filterByEmpId(unfiltered, filter),
    [filter]
  );

  const fallback = [];
  const { data: payrun = fallback } = useQuery(
    //[queryKeys.leaves, { leaveId }],
    queryKeys.payrun,
    () => getPayrun(payrunId),
    {
      select: filter !== "all" ? selectFn : undefined,
    }
  );

  return { payrun, filter, setFilter, setPayrunId };
}
