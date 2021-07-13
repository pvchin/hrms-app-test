import { useMutation, useQueryClient } from "react-query";
import { designations_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function addDesignations(data) {
  await fetch(designations_url, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddDesignations(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => addDesignations(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("designations");
      toast({
        title: "Designation item being added!",
        status: "success",
      });
    },
  });

  return mutate;
}
