export function filterByEmpId(employees, empId) {
  // eslint-disable-next-line array-callback-return
  return employees
    .filter((item) => item.empid === empId)
    .map((r) => {
      return { ...r };
    });
}
