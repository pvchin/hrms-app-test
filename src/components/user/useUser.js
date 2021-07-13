import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";

import { queryKeys } from "../react-query/constants";
import { clearStoredUser, getStoredUser, setStoredUser } from "../user-storage";

async function getUser(user) {
  if (!user) return null;
  return user;
  //   const data = employees
  //     .filter((f) => f.email === user)
  //     .map((r) => {
  //       return { ...r };
  //     });
  //return user;
  //   if (!user) return null;
  //   const { data } = await axiosInstance.get(`/user/${user.id}`, {
  //     headers: getJWTHeader(user),
  //   });

  //   return data.user;
}

export function useUser() {
  const [user, setUser] = useState(getStoredUser() || null);
  const queryClient = useQueryClient();

  useQuery(queryKeys.user, () => getUser(user), {
    enabled: !!user,
    onSuccess: (data) => setUser(data),
  });

  // meant to be called from useAuth
  function updateUser(newUser) {
    // set user in state
    setUser(newUser);

    // update user in localstorage
    setStoredUser(newUser);

    // TODO: pre-populate user profile in React Query client
  }

  // meant to be called from useAuth
  function clearUser() {
    // update state
    setUser(null);

    // remove from localstorage
    clearStoredUser();

    queryClient.setQueryData(queryKeys.user, null);

    queryClient.removeQueries([queryKeys.user]);
  }

  return { user, updateUser, clearUser };
}
