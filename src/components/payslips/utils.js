export function filterByEmpId(payslips, empId) {
  // eslint-disable-next-line array-callback-return
  return payslips
    .filter((item) => item.empid === empId)
    .map((r) => {
      return { ...r };
    });
}
