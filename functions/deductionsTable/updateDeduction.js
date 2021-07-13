const { table } = require("./airtable-deductions");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id, ...fields } = JSON.parse(event.body);
  try {
    const updatedDeduction = await table.update([{ id, fields }]);
    return formattedReturn(200, updatedDeduction);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
