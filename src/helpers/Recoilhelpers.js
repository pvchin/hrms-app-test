import { atom, selector } from "recoil";
import { departments_url } from "../utils/constants";

export const departmentsState = atom({
  key: "departmentsState",
  default: [],
});

export const departmentsSelector = selector({
  key: "departmentsSelector",
  get: async () => {
      const res = await fetch(departments_url);
      const data = await res.json();
    return data;
  },
});
