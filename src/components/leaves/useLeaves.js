import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { leaves_url } from "../../utils/constants";
import { filterByEmpId } from "./utils";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getLeaves(empid) {
  //const { data } = await axios.get(`${leaves_url}?fv=${empid}`);
  const { data } = await axios.get(`${leaves_url}`);
  return data;
}

export function useLeaves(empid) {
  const [filter, setFilter] = useState("all");
  const [leaveId, setLeaveId] = useState("");

  const selectFn = useCallback(
    (unfiltered) => filterByEmpId(unfiltered, filter),
    [filter]
  );

  const fallback = [];
  const { data: leaves = fallback } = useQuery(
    //[queryKeys.leaves, { leaveId }],
    queryKeys.leaves,
    () => getLeaves(leaveId),
    {
      select: filter !== "all" ? selectFn : undefined,
    }
  );

  return { leaves, filter, setFilter, setLeaveId };
}
