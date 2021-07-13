const { table } = require("./airtable-payslips");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id, ...fields } = JSON.parse(event.body);
  try {
    const updatedPayslip = await table.update([{ id, fields }]);
    return formattedReturn(200, updatedPayslip);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
