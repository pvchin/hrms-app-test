const { table } = require("./airtable-periods");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id, filterValue } = event.queryStringParameters;
  // const { id, filterValue, filterField } = event.queryStringParameters;
  // console.log(filterValue, filterField);

  try {
    const periods = await table.select().firstPage();
    const formattedPeriods = periods.map((period) => ({
      id: period.id,
      ...period.fields,
    }));

    return formattedReturn(200, formattedPeriods);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
