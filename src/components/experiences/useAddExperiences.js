import { useMutation, useQueryClient } from "react-query";
import { experiences_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function addExperiences(data) {
  await fetch(experiences_url, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddExperiences(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => addExperiences(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("experiences");
      toast({
        title: "Experience record being added!",
        status: "success",
      });
    },
  });

  return mutate;
}
