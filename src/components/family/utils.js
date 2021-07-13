export function filterByEmpId(family, empId) {
  return family.filter((item) => {
    item.empId.map((t) => t).includes(empId);
  });
}
