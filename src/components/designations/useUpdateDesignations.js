import { useMutation, useQueryClient } from "react-query";
import { designations_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function updateDesignations(data) {
  const { id, ...fields } = data;

  await fetch(designations_url, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateDesignations(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => updateDesignations(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("designations");
      toast({
        title: "Designation item being updated!",
        status: "success",
      });
    },
  });

  return mutate;
}
