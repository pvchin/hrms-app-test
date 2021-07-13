const { table } = require("./airtable-payslipearnings");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id, ...fields } = JSON.parse(event.body);
  try {
    const updatedPayslipEarning = await table.update([{ id, fields }]);
    return formattedReturn(200, updatedPayslipEarning);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
