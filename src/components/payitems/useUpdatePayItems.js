import { useMutation, useQueryClient } from "react-query";
import { payitems_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function updatePayItems(data) {
  const { id, ...fields } = data;

  await fetch(payitems_url, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdatePayItems(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => updatePayItems(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("payitems");
      toast({
        title: "Payitem record being updated!",
        status: "success",
      });
    },
  });

  return mutate;
}
