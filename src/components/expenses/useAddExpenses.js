import { useMutation, useQueryClient } from "react-query";
import { expenses_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function addExpenses(data) {
  await fetch(expenses_url, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddExpenses(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => addExpenses(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("expenses");
      toast({
        title: "Expense record being added!",
        status: "success",
      });
    },
  });

  return mutate;
}
