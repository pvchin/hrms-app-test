import { useMutation, useQueryClient } from "react-query";
import { family_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function updateFamily(data) {
  const { id, ...fields } = data;

  await fetch(family_url, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateFamily(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => updateFamily(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("family");
      toast({
        title: "Family record being updated!",
        status: "success",
      });
    },
  });

  return mutate;
}
