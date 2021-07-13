import { useMutation, useQueryClient } from "react-query";
import { dailyallowsdetls_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function updateDailyAllowsDetls(data) {
  const { id, ...fields } = data;

  await fetch(dailyallowsdetls_url, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateDailyAllowsDetls(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => updateDailyAllowsDetls(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("dailyallowsdetls");
      toast({
        title: "Site Allowance daily record being updated!",
        status: "success",
      });
    },
  });

  return mutate;
}
