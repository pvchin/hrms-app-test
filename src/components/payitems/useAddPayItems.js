import { useMutation, useQueryClient } from "react-query";
import { payitems_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function addPayItems(data) {
  await fetch(payitems_url, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddPayItems(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => addPayItems(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("payitems");
      toast({
        title: "PayItem record being added!",
        status: "success",
      });
    },
  });

  return mutate;
}
