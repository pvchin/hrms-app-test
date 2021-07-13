import { useMutation, useQueryClient } from "react-query";
import { trainings_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function deleteTrainings(id) {
  await fetch(trainings_url, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteTrainings(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => deleteTrainings(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("trainings");
      toast({
        title: "Training record being deleted!",
        status: "warning",
      });
    },
  });

  return mutate;
}
