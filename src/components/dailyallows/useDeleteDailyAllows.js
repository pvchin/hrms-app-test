import { useMutation, useQueryClient } from "react-query";
import { dailyallowances_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function deleteDailyAllows(id) {
  await fetch(dailyallowances_url, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteDailyAllows(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => deleteDailyAllows(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("dailyallows");
      toast({
        title: "Site Allowance record being deleted!",
        status: "warning",
      });
    },
  });

  return mutate;
}
