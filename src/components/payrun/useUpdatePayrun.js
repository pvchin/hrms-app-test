import { useMutation, useQueryClient } from "react-query";
import { payrun_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function updatePayrun(data) {
  const { id, ...fields } = data;

  await fetch(payrun_url, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdatePayrun(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => updatePayrun(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("payrun");
      toast({
        title: "Payrun batch being updated!",
        status: "success",
      });
    },
  });

  return mutate;
}
