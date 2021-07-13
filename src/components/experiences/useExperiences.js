import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { experiences_url } from "../../utils/constants";
import { filterByEmpId } from "./utils";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getExperiences(empid) {
  const { data } = await axios.get(`${experiences_url}?fv=${empid}`);
  return data;
}

export function useExperiences(empid) {
  const [filter, setFilter] = useState("all");
  const [experienceId, setExperienceId] = useState("");

  const selectFn = useCallback(
    (unfiltered) => filterByEmpId(unfiltered, filter),
    [filter]
  );

  const fallback = [];
  const { data: experiences = fallback } = useQuery(
    [queryKeys.experiences, { experienceId }],
    () => getExperiences(experienceId),
    {
      select: filter !== "all" ? selectFn : undefined,
    }
  );

  return { experiences, filter, setFilter, setExperienceId };
}
