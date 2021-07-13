const { table } = require("./airtable-deductions");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { ...fields } = JSON.parse(event.body);
  try {
    const createdDeduction = await table.create([{ fields }]);
    return formattedReturn(200, createdDeduction);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
