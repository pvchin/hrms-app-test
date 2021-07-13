export function filterByEmpId(experiences, empId) {
  return experiences.filter((item) => {
    item.empId.map((t) => t).includes(empId);
  });
}
