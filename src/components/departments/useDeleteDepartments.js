import { useMutation, useQueryClient } from "react-query";
import { departments_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function deleteDepartments(id) {
  await fetch(departments_url, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteDepartments(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => deleteDepartments(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("departments");
      toast({
        title: "Department item being deleted!",
        status: "warning",
      });
    },
  });

  return mutate;
}
