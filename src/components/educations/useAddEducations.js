import { useMutation, useQueryClient } from "react-query";
import { educations_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function addEducations(data) {
  await fetch(educations_url, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddEducations(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => addEducations(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("educations");
      toast({
        title: "Education record being added!",
        status: "success",
      });
    },
  });

  return mutate;
}
