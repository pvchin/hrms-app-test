import { useState, useCallback } from "react";
import { useQuery } from "react-query";
import { trainings_url } from "../../utils/constants";
import { filterByEmpId } from "./utils";

import axios from "axios";
import { queryKeys } from "../react-query/constants";

async function getTrainings(empid) {
  const { data } = await axios.get(`${trainings_url}?fv=${empid}`);
  return data;
}

export function useTrainings(empid) {
  const [filter, setFilter] = useState("all");
  const [trainingId, setTrainingId] = useState("");

  const selectFn = useCallback(
    (unfiltered) => filterByEmpId(unfiltered, filter),
    [filter]
  );

  const fallback = [];
  const { data: trainings = fallback } = useQuery(
    [queryKeys.trainings, { trainingId }],
    () => getTrainings(trainingId),
    {
      select: filter !== "all" ? selectFn : undefined,
    }
  );

  return { trainings, filter, setFilter, setTrainingId };
}
