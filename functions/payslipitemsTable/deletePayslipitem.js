const { table } = require("./airtable-payslipitems");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id } = JSON.parse(event.body);
  try {
    const deletedPayslipitem = await table.destroy(id);
    return formattedReturn(200, deletedPayslipitem);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
