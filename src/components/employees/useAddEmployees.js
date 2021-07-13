import { useMutation, useQueryClient } from "react-query";
import { employees_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function addEmployees(data) {
  await fetch(employees_url, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddEmployees(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => addEmployees(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("employees");
      toast({
        title: "Employee record being added!",
        status: "success",
      });
    },
  });

  return mutate;
}
