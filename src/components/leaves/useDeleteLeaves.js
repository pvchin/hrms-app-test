import { useMutation, useQueryClient } from "react-query";
import { leaves_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function deleteLeaves(id) {
  await fetch(leaves_url, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteLeaves(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => deleteLeaves(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("leaves");
      toast({
        title: "Leave record being deleted!",
        status: "warning",
      });
    },
  });

  return mutate;
}
