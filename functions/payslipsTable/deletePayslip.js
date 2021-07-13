const { table } = require("./airtable-payslips");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id } = JSON.parse(event.body);
  try {
    const deletedPayslip = await table.destroy(id);
    return formattedReturn(200, deletedPayslip);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
