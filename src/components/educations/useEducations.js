import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { educations_url } from "../../utils/constants";
import { filterByEmpId } from "./utils";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getEducations(empid) {
  const { data } = await axios.get(`${educations_url}?fv=${empid}`);
  return data;
}

export function useEducations(empid) {
  const [filter, setFilter] = useState("all");
  const [educationId, setEducationId] = useState("");

  const selectFn = useCallback(
    (unfiltered) => filterByEmpId(unfiltered, filter),
    [filter]
  );

  const fallback = [];
  const { data: educations = fallback } = useQuery(
    [queryKeys.educations, { educationId }],
    () => getEducations(educationId),
    {
      select: filter !== "all" ? selectFn : undefined,
    }
  );

  return { educations, filter, setFilter, setEducationId };
}
