import { useMutation, useQueryClient } from "react-query";
import { educations_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function updateEducations(data) {
  const { id, ...fields } = data;

  await fetch(educations_url, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateEducations(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => updateEducations(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("educations");
      toast({
        title: "Education record being updated!",
        status: "success",
      });
    },
  });

  return mutate;
}
