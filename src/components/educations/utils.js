export function filterByEmpId(educations, empId) {
  return educations.filter((item) => {
    item.empId.map((t) => t).includes(empId);
  });
}
