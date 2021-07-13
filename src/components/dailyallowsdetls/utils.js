export function filterByEmpId(dailyallowsdetls, empId) {
  // eslint-disable-next-line array-callback-return
  return dailyallowsdetls
    .filter((item) => item.empid === empId)
    .map((r) => {
      return { ...r };
    });
}
