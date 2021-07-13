import { useMutation, useQueryClient } from "react-query";
import { expenses_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function updateExpenses(data) {
  const { id, ...fields } = data;

  await fetch(expenses_url, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateExpenses(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => updateExpenses(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("expenses");
      toast({
        title: "Expense record being updated!",
        status: "success",
      });
    },
  });

  return mutate;
}
