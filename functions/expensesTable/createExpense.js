const { table } = require("./airtable-expenses");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { ...fields } = JSON.parse(event.body);
  try {
    const createdExpense = await table.create([{ fields }]);
    return formattedReturn(200, createdExpense);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
