import { useMutation, useQueryClient } from "react-query";
import { experiences_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function updateExperiencs(data) {
  const { id, ...fields } = data;

  await fetch(experiences_url, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateExperiences(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => updateExperiencs(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("experiences");
      toast({
        title: "Experience record being updated!",
        status: "success",
      });
    },
  });

  return mutate;
}
