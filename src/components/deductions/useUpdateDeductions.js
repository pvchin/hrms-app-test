import { useMutation, useQueryClient } from "react-query";
import { deductions_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function updateDeductions(data) {
  const { id, ...fields } = data;

  await fetch(deductions_url, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateDeductions(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => updateDeductions(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("deductions");
      toast({
        title: "Deduction item being updated!",
        status: "success",
      });
    },
  });

  return mutate;
}
