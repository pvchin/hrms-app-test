const { table } = require("./airtable-payslips");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { ...fields } = JSON.parse(event.body);
  try {
    const createdPayslip = await table.create([{ fields }]);
    return formattedReturn(200, createdPayslip);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
