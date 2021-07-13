import { useMutation, useQueryClient } from "react-query";
import { experiences_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function deleteExperiences(id) {
  await fetch(experiences_url, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteExperiences(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => deleteExperiences(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("experiences");
      toast({
        title: "Experience record being deleted!",
        status: "warning",
      });
    },
  });

  return mutate;
}
