import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { dailyallowances_url } from "../../utils/constants";
import { filterByEmpId } from "./utils";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getDailyAllows(empid) {
  //const { data } = await axios.get(`${leaves_url}?fv=${empid}`);
  const { data } = await axios.get(`${dailyallowances_url}`);
  return data;
}

export function useDailyAllows(empid) {
  const [filter, setFilter] = useState("all");
  const [dailyAllowsId, setDailyAllowsId] = useState("");

  const selectFn = useCallback(
    (unfiltered) => filterByEmpId(unfiltered, filter),
    [filter]
  );

  const fallback = [];
  const { data: dailyallows = fallback } = useQuery(
    //[queryKeys.leaves, { leaveId }],
    queryKeys.dailyallows,
    () => getDailyAllows(dailyAllowsId),
    {
      select: filter !== "all" ? selectFn : undefined,
    }
  );

  return { dailyallows, filter, setFilter, setDailyAllowsId };
}
