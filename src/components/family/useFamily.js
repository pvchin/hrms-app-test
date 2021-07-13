import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { family_url } from "../../utils/constants";
import { filterByEmpId } from "./utils";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getFamily(empid) {
  const { data } = await axios.get(`${family_url}?fv=${empid}`);
  return data;
}

export function useFamily(empid) {
  const [filter, setFilter] = useState("all");
  const [familyId, setFamilyId] = useState("");

  const selectFn = useCallback(
    (unfiltered) => filterByEmpId(unfiltered, filter),
    [filter]
  );

  const fallback = [];
  const { data: family = fallback } = useQuery(
    [queryKeys.family, { familyId }],
    () => getFamily(familyId),
    {
      select: filter !== "all" ? selectFn : undefined,
    }
  );

  return { family,filter,setFilter, setFamilyId };
}
