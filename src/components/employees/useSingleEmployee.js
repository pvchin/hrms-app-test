import React, { useState } from "react";
import { useQuery } from "react-query";
import { employees_url } from "../../utils/constants";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getSingleEmployee(empid) {
  const { data } = await axios.get(`${employees_url}?fv=${empid}`);
  return data;
}

export function useSingleEmployee() {
  const [singleEmployeeId, setSingleEmployeeId] = useState("");
  const fallback = [];
  const { data: singleemployee = fallback } = useQuery(
    queryKeys.singleemployee,
    ()=>getSingleEmployee(singleEmployeeId)
  );

  return { singleemployee, setSingleEmployeeId };
}
