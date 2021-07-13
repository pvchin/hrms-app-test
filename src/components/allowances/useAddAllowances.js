import { useMutation, useQueryClient } from "react-query";
import { allowances_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function addAllowances(data) {
  await fetch(allowances_url, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddAllowances(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => addAllowances(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("allowances");
      toast({
        title: "Allowance item being added!",
        status: "success",
      });
    },
  });

  return mutate;
}
