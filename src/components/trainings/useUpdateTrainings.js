import { useMutation, useQueryClient } from "react-query";
import { trainings_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function updateTrainings(data) {
  const { id, ...fields } = data;

  await fetch(trainings_url, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateTrainings(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => updateTrainings(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("trainings");
      toast({
        title: "Training record being updated!",
        status: "success",
      });
    },
  });

  return mutate;
}
