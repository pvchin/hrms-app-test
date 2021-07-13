import { useMutation, useQueryClient } from "react-query";
import { payslips_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function addPayslips(data) {
  await fetch(payslips_url, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddPayslips(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => addPayslips(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("payslips");
      toast({
        title: "Payslip record being added!",
        status: "success",
      });
    },
  });

  return mutate;
}
