const { table } = require("./airtable-payslipdeductions");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id, ...fields } = JSON.parse(event.body);
  try {
    const updatedPayslipDeduction = await table.update([{ id, fields }]);
    return formattedReturn(200, updatedPayslipDeduction);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
