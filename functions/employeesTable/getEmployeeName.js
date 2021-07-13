const { table } = require("./airtable-employees");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  try {
    const employees = await table
      .select({ view: "viewEmployeeName" })
      .firstPage();
    const formattedEmployees = employees.map((employee) => ({
      id: employee.id,
      ...employee.fields,
    }));

    return formattedReturn(200, formattedEmployees);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
