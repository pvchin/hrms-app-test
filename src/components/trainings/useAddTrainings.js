import { useMutation, useQueryClient } from "react-query";
import { trainings_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function addTrainings(data) {
  await fetch(trainings_url, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddTrainings(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => addTrainings(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("trainings");
      toast({
        title: "Training record being added!",
        status: "success",
      });
    },
  });

  return mutate;
}
