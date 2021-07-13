const { table } = require("./airtable-payslipdeductions");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { ...fields } = JSON.parse(event.body);
  try {
    const createdPayslipDeduction = await table.create([{ fields }]);
    return formattedReturn(200, createdPayslipDeduction);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
