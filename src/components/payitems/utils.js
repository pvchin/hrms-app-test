export function filterByEmpId(payitems, empId) {
  // eslint-disable-next-line array-callback-return
  return payitems
    .filter((item) => item.empid === empId)
    .map((r) => {
      return { ...r };
    });
}
