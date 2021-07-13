import { useMutation, useQueryClient } from "react-query";
import { designations_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function deleteDesignations(id) {
  await fetch(designations_url, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteDesignations(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => deleteDesignations(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("designations");
      toast({
        title: "Designation item being deleted!",
        status: "warning",
      });
    },
  });

  return mutate;
}
