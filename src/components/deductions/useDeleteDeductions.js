import { useMutation, useQueryClient } from "react-query";
import { deductions_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function deleteDeductions(id) {
  await fetch(deductions_url, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteDeductions(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => deleteDeductions(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("deductions");
      toast({
        title: "Deduction item being deleted!",
        status: "warning",
      });
    },
  });

  return mutate;
}
