import { useMutation, useQueryClient } from "react-query";
import { payslips_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function deletePayslips(id) {
  await fetch(payslips_url, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeletePayslips(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => deletePayslips(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("payslips");
      toast({
        title: "Payslip record being deleted!",
        status: "warning",
      });
    },
  });

  return mutate;
}
