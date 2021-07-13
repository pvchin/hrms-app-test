import { useMutation, useQueryClient } from "react-query";
import { dailyallowsdetls_url } from "../../utils/constants";
import { useCustomToast } from "../../helpers/useCustomToast";

async function addDailyAllowsDetls(data) {
  await fetch(dailyallowsdetls_url, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddDailyAllowsDetls(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation((data) => addDailyAllowsDetls(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("dailyallowsdetls");
    //   toast({
    //     title: "Site Allowance daily record being added!",
    //     status: "success",
    //   });
    },
  });

  return mutate;
}
