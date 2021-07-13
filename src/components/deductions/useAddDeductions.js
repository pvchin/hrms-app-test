import { useMutation, useQueryClient } from "react-query";
import { deductions_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function addDeductions(data) {
  await fetch(deductions_url, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddDeductions(data) {
  const queryClient = useQueryClient();
    const toast = useCustomToast();
    
  const { mutate } = useMutation((data) => addDeductions(data), {
    onSuccess: () => {
          queryClient.invalidateQueries("deductions");
           toast({
             title: "Deduction item being added!",
             status: "success",
           });
    },
  });

  return mutate;
}
