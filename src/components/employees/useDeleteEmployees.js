import { useMutation, useQueryClient } from "react-query";
import { employees_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function deleteEmployees(id) {
  await fetch(employees_url, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteEmployees(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => deleteEmployees(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("employees");
      toast({
        title: "Employee record being deleted!",
        status: "warning",
      });
    },
  });

  return mutate;
}
