const { table } = require("./airtable-deductions");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id } = JSON.parse(event.body);
  try {
    const deletedDeduction = await table.destroy(id);
    return formattedReturn(200, deletedDeduction);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
