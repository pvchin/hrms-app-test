const { table } = require("./airtable-expenses");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id, ...fields } = JSON.parse(event.body);
  try {
    const updatedExpense = await table.update([{ id, fields }]);
    return formattedReturn(200, updatedExpense);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
