import { useMutation, useQueryClient } from "react-query";
import { educations_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function deleteEducations(id) {
  await fetch(educations_url, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteEducations(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => deleteEducations(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("educations");
      toast({
        title: "Education record being deleted!",
        status: "warning",
      });
    },
  });

  return mutate;
}
