import { useMutation, useQueryClient } from "react-query";
import { departments_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function updateDepartments(data) {
  const { id, ...fields } = data;

  await fetch(departments_url, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateDepartments(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => updateDepartments(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("departments");
      toast({
        title: "Department item being updated!",
        status: "success",
      });
    },
  });

  return mutate;
}
