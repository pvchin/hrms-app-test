const { table } = require("./airtable-expenses");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id } = JSON.parse(event.body);
  try {
    const deletedExpense = await table.destroy(id);
    return formattedReturn(200, deletedExpense);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
