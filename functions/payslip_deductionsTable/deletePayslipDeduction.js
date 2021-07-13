const { table } = require("./airtable-payslipdeductions");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id } = JSON.parse(event.body);
  try {
    const deletedPayslipDeduction = await table.destroy(id);
    return formattedReturn(200, deletedPayslipDeduction);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
