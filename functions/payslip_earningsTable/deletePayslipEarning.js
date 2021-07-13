const { table } = require("./airtable-payslipearnings");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id } = JSON.parse(event.body);
  try {
    const deletedPayslipEarning = await table.destroy(id);
    return formattedReturn(200, deletedPayslipEarning);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
