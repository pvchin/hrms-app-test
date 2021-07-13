export function filterByEmpId(dailyallows, empId) {
  // eslint-disable-next-line array-callback-return
  return dailyallows
    .filter((item) => item.empid === empId)
    .map((r) => {
      return { ...r };
    });
}
