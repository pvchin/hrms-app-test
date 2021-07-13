export function filterByEmpId(expenses, empId) {
  // eslint-disable-next-line array-callback-return
  return expenses
    .filter((item) => item.empid === empId)
    .map((r) => {
      return { ...r };
    });
}
