import { useMutation, useQueryClient } from "react-query";
import { payslips_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function updatePayslips(data) {
  const { id, ...fields } = data;

  await fetch(payslips_url, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdatePayslips(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => updatePayslips(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("payslips");
      toast({
        title: "Payslip record being updated!",
        status: "success",
      });
    },
  });

  return mutate;
}
