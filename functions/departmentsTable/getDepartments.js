const { table } = require("./airtable-departments");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id, filterValue } = event.queryStringParameters;
  // const { id, filterValue, filterField } = event.queryStringParameters;
  // console.log(filterValue, filterField);

  if (id) {
    const department = await table.find(id);
    const formattedDepartments = { id: department.id, ...department.fields };
    if (department.error) {
      return {
        statusCode: 404,
        body: `No Department with id: ${id}`,
      };
    }

    return formattedReturn(200, formattedDepartments);
  }
  if (filterValue) {
    const departments = await table
      .select({ filterByFormula: `gender=${filterValue}` })
      .firstPage();
    const formattedDepartments = departments.map((department) => ({
      id: department.id,
      ...department.fields,
    }));

    return formattedReturn(200, formattedDepartments);
  }

  try {
    const departments = await table.select().firstPage();
    const formattedDepartments = departments.map((department) => ({
      id: department.id,
      ...department.fields,
    }));

    return formattedReturn(200, formattedDepartments);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
