import { useMutation, useQueryClient } from "react-query";
import { allowances_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function updateAllowances(data) {
  const { id, ...fields } = data;

  await fetch(allowances_url, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateAllowances(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => updateAllowances(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("allowances");
      toast({
        title: "Allowance item being updated!",
        status: "success",
      });
    },
  });

  return mutate;
}
