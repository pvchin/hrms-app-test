import { useMutation, useQueryClient } from "react-query";
import { family_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function addFamily(data) {
  await fetch(family_url, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddFamily(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => addFamily(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("family");
      toast({
        title: "Family record being added!",
        status: "success",
      });
    },
  });

  return mutate;
}
