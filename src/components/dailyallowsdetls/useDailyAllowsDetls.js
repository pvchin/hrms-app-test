import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { dailyallowsdetls_url } from "../../utils/constants";
import { filterByEmpId } from "./utils";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getDailyAllowsDetls(empid) {
  //const { data } = await axios.get(`${leaves_url}?fv=${empid}`);
  const { data } = await axios.get(`${dailyallowsdetls_url}`);
  return data;
}

export function useDailyAllowsDetls(empid) {
  const [filter, setFilter] = useState("all");
  const [dailyAllowsDetlsId, setDailyAllowsDetlsId] = useState("");

  const selectFn = useCallback(
    (unfiltered) => filterByEmpId(unfiltered, filter),
    [filter]
  );

  const fallback = [];
  const { data: dailyallowsdetls = fallback } = useQuery(
    //[queryKeys.leaves, { leaveId }],
    queryKeys.dailyallows,
    () => getDailyAllowsDetls(dailyAllowsDetlsId),
    {
      select: filter !== "all" ? selectFn : undefined,
    }
  );

  return { dailyallowsdetls, filter, setFilter, setDailyAllowsDetlsId };
}
