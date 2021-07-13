import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { payitems_url } from "../../utils/constants";
import { filterByEmpId } from "./utils";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getPayItems(empid) {
  //const { data } = await axios.get(`${leaves_url}?fv=${empid}`);
  const { data } = await axios.get(`${payitems_url}`);
  return data;
}

export function usePayItems(empid) {
  const [filter, setFilter] = useState("all");
  const [payitemId, setPayItemId] = useState("");

  const selectFn = useCallback(
    (unfiltered) => filterByEmpId(unfiltered, filter),
    [filter]
  );

  const fallback = [];
  const { data: payitems = fallback } = useQuery(
    //[queryKeys.leaves, { leaveId }],
    queryKeys.payitems,
    () => getPayItems(payitemId),
    {
      select: filter !== "all" ? selectFn : undefined,
    }
  );

  return { payitems, filter, setFilter, setPayItemId };
}
