import { useMutation, useQueryClient } from "react-query";
import { payitems_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function deletePayItems(id) {
  await fetch(payitems_url, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeletePayItems(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => deletePayItems(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("payitems");
      toast({
        title: "PayItem record being deleted!",
        status: "warning",
      });
    },
  });

  return mutate;
}
