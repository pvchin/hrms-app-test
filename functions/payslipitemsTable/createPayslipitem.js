const { table } = require("./airtable-payslipitems");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { ...fields } = JSON.parse(event.body);
  try {
    const createdPayslipitem = await table.create([{ fields }]);
    return formattedReturn(200, createdPayslipitem);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
