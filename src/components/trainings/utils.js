export function filterByEmpId(trainings, empId) {
  // eslint-disable-next-line array-callback-return
  return trainings
    .filter((item) => item.empid === empId)
    .map((r) => {
      return { ...r };
    });
}
