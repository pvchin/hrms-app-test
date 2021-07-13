import { useMutation, useQueryClient } from "react-query";
import { employees_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function updateEmployees(data) {
  const { id, rec_id, ...fields } = data;

  await fetch(employees_url, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateEmployees(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => updateEmployees(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("employees");
      toast({
        title: "Employee record being updated!",
        status: "success",
      });
    },
  });

  return mutate;
}
