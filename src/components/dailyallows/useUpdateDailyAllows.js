import { useMutation, useQueryClient } from "react-query";
import { dailyallowances_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function updateDailyAllows(data) {
  const { id, ...fields } = data;

  await fetch(dailyallowances_url, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateDailyAllows(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => updateDailyAllows(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("dailyallows");
      toast({
        title: "Site Allowance record being updated!",
        status: "success",
      });
    },
  });

  return mutate;
}
