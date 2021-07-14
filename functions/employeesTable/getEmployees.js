const { table } = require("./airtable-employees");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id, fv, fi } = event.queryStringParameters;
  // const { id, filterValue, filterField } = event.queryStringParameters;
  // console.log(filterValue, filterField);

  if (id) {
    const employee = await table.find(id);
    const formattedEmployees = { id: employee.id, ...employee.fields };
    if (employee.error) {
      return {
        statusCode: 404,
        body: `No Employee with id: ${id}`,
      };
    }

    return formattedReturn(200, formattedEmployees);
  }

  try {
    if (fv) {
      const employees = await table
        .select({
          filterByFormula: `email = '${fv}'`,
        })
        .all();
      // const formattedEmployees = { id: employees.id, ...employees.fields };
      const formattedEmployees = employees.map((employee) => ({
        id: employee.id,
        ...employee.fields,
      }));
      if (employees.error) {
        return {
          statusCode: 404,
          body: `No Employee with email: ${fv}`,
        };
      }
      return formattedReturn(200, formattedEmployees);
    }
  } catch (error) {
    return formattedReturn(404, {});
  }

  try {
    if (fi) {
      // const { id, linkid, ...fields } = JSON.parse(event.body);
      // console.log(linkid);
      const employees = await table
        .select({ filterByFormula: `id = '${fi}'` })
        .firstPage();
      const formattedEmployees = employees.map((e) => ({
        id: e.id,
        ...e.fields,
      }));

      return formattedReturn(200, formattedEmployees);
    }
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }

  try {
    const employees = await table.select().all();
    const formattedEmployees = employees.map((employee) => ({
      id: employee.id,
      ...employee.fields,
    }));

    return formattedReturn(200, formattedEmployees);
  } catch (err) {
    return formattedReturn(500, {});
  }
};
