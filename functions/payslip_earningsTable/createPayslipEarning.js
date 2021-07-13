const { table } = require("./airtable-payslipearnings");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { ...fields } = JSON.parse(event.body);
  try {
    const createdPayslipEarning = await table.create([{ fields }]);
    return formattedReturn(200, createdPayslipEarning);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
