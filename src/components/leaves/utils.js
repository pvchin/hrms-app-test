export function filterByEmpId(leaves, empId) {
  // eslint-disable-next-line array-callback-return
  return leaves
    .filter((item) => item.empid === empId)
    .map((r) => {
      return { ...r };
    });
}
