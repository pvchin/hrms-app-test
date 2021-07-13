import { useMutation, useQueryClient } from "react-query";
import { departments_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function addDepartments(data) {
  await fetch(departments_url, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddDepartments(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();
  
  const { mutate } = useMutation((data) => addDepartments(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("departments");
       toast({
         title: "Department item being added!",
         status: "success",
       });
    },
  });

  return mutate;
}
