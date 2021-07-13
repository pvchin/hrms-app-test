import { useMutation, useQueryClient } from "react-query";
import { payrun_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function deletePayrun(id) {
  await fetch(payrun_url, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeletePayrun(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => deletePayrun(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("payrun");
      toast({
        title: "Payrun batch being deleted!",
        status: "warning",
      });
    },
  });

  return mutate;
}
