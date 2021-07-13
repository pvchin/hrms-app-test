const { table } = require("./airtable-payslipitems");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id, ...fields } = JSON.parse(event.body);
  try {
    const updatedPayslipitem = await table.update([{ id, fields }]);
    return formattedReturn(200, updatedPayslipitem);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
