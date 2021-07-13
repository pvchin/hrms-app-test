import { useMutation, useQueryClient } from "react-query";
import { payrun_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function addPayrun(data) {
  await fetch(payrun_url, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddPayrun(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => addPayrun(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("payrun");
      toast({
        title: "Payrun batch being added!",
        status: "success",
      });
    },
  });

  return mutate;
}
