const { table } = require("./airtable-allowances");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id, fv } = event.queryStringParameters;
  // const { id, filterValue, filterField } = event.queryStringParameters;
  // console.log(filterValue, filterField);

  if (id) {
    const allowance = await table.find(id);
    const formattedAllowances = { id: allowance.id, ...allowance.fields };
    if (allowance.error) {
      return {
        statusCode: 404,
        body: `No Allowance with id: ${id}`,
      };
    }

    return formattedReturn(200, formattedAllowances);
  }
  if (fv) {
    const allowances = await table
      .select({ filterByFormula: `empid = '${fv}'` })
      .firstPage();
    const formattedAllowances = allowances.map((allowance) => ({
      id: allowance.id,
      ...allowance.fields,
    }));

    return formattedReturn(200, formattedAllowances);
  }

  try {
    const allowances = await table.select().firstPage();
    const formattedAllowances = allowances.map((allowance) => ({
      id: allowance.id,
      ...allowance.fields,
    }));

    return formattedReturn(200, formattedAllowances);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
