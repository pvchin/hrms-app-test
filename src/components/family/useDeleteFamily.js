import { useMutation, useQueryClient } from "react-query";
import { family_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function deleteFamily(id) {
  await fetch(family_url, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteFamily(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => deleteFamily(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("family");
      toast({
        title: "Family record being deleted!",
        status: "warning",
      });
    },
  });

  return mutate;
}
