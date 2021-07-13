import { useMutation, useQueryClient } from "react-query";
import { expenses_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function deleteExpenses(id) {
  await fetch(expenses_url, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteExpenses(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => deleteExpenses(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("expenses");
      toast({
        title: "Expense record being deleted!",
        status: "warning",
      });
    },
  });

  return mutate;
}
