import axios from "axios";
import { selector, useRecoilValue, useSetRecoilState } from "recoil";
import {
  empidState,
  allowsPeriodState,
  allowsDataDetlsState,
} from "./atomdata";
import { departments_url } from "../../utils/constants";
import {
  dailyallowances_url,
  dailyallowsdetls_url,
  employees_url,
} from "../../utils/constants";

export const fetchDepartmentsSelector = selector({
  key: "departmentsSelector",
  get: async ({ get }) => {
    try {
      const res = await fetch(departments_url);
      const data = await res.json();

      return data;
    } catch (error) {
      throw error;
    }
  },
});

export const fetchEmployeesSelector = selector({
  key: "employeesSelector",
  get: async ({ get }) => {
    try {
      const res = await fetch(employees_url);
      const data = await res.json();

      return data;
    } catch (error) {
      throw error;
    }
  },
});

export const fetchDailyAllowancesSelector = selector({
  key: "dailyallowancesSelector",
  get: async ({ get }) => {
    try {
      const period = get(allowsPeriodState);
      const { data } = await axios.get(`${dailyallowances_url}?fv=${period}`);
      const res = await data;

      return res;
    } catch (error) {
      throw error;
    }
  },
});

export const fetchDailyAllowsDetlsSelector = selector({
  key: "dailyallowsDetlsSelector",
  get: async ({ get }) => {
    try {
      const period = get(allowsPeriodState);
      const empid = get(empidState);
      const { data } = await axios.get(
        `${dailyallowsdetls_url}?fv=${empid}&period=${period}`
      );
      const res = await data;

      return res;
    } catch (error) {
      throw error;
    }
  },
});
