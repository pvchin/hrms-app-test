import { useMutation, useQueryClient } from "react-query";
import { allowances_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function deleteAllowances(id) {
  await fetch(allowances_url, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteAllowances(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => deleteAllowances(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("allowances");
      toast({
        title: "Allowance item being deleted!",
        status: "warning",
      });
    },
  });

  return mutate;
}
