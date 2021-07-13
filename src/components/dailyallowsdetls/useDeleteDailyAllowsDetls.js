import { useMutation, useQueryClient } from "react-query";
import { dailyallowsdetls_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function deleteDailyAllowsDetls(id) {
  await fetch(dailyallowsdetls_url, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteDailyAllowsDetls(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => deleteDailyAllowsDetls(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("dailyallowsdetls");
      toast({
        title: "Site Allowance daily record being deleted!",
        status: "warning",
      });
    },
  });

  return mutate;
}
