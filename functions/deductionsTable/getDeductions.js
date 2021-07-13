const { table } = require("./airtable-deductions");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id, fv } = event.queryStringParameters;
  // const { id, filterValue, filterField } = event.queryStringParameters;
  // console.log(filterValue, filterField);

  if (id) {
    const deduction = await table.find(id);
    const formattedDeductions = { id: deduction.id, ...deduction.fields };
    if (deduction.error) {
      return {
        statusCode: 404,
        body: `No Deduction with id: ${id}`,
      };
    }

    return formattedReturn(200, formattedDeductions);
  }
  if (fv) {
    const deductions = await table
      .select({ filterByFormula: `gender=${fv}` })
      .firstPage();
    const formattedDeductions = deductions.map((deduction) => ({
      id: deduction.id,
      ...deduction.fields,
    }));

    return formattedReturn(200, formattedDeductions);
  }

  try {
    const deductions = await table.select().firstPage();
    const formattedDeductions = deductions.map((deduction) => ({
      id: deduction.id,
      ...deduction.fields,
    }));

    return formattedReturn(200, formattedDeductions);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
