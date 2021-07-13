import { useMutation, useQueryClient } from "react-query";
import { dailyallowances_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function addDailyAllows(data) {
  await fetch(dailyallowances_url, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddDailyAllows(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => addDailyAllows(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("dailyallows");
      toast({
        title: "Site Allowance record being added!",
        status: "success",
      });
    },
  });

  return mutate;
}
