import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { payslips_url } from "../../utils/constants";
import { filterByEmpId } from "./utils";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getPayslips(empid) {
  const { data } = await axios.get(`${payslips_url}?fv=${empid}`);
  //const { data } = await axios.get(`${payslips_url}`);
  return data;
}

export function usePayslips(empid) {
  const [filter, setFilter] = useState("all");
  const [payslipId, setPayslipId] = useState("");

  const selectFn = useCallback(
    (unfiltered) => filterByEmpId(unfiltered, filter),
    [filter]
  );

  const fallback = [];
  const { data: payslips = fallback } = useQuery(
    //[queryKeys.leaves, { leaveId }],
    queryKeys.payslips,
    () => getPayslips(payslipId),
    {
      select: filter !== "all" ? selectFn : undefined,
    }
  );

  return { payslips, filter, setFilter, setPayslipId };
}
