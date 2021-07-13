const { table } = require("./airtable-expenses");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  try {
    const expenses = await table.select({ view: "approvedview" }).firstPage();
    const formattedExpenses = expenses.map((item) => ({
      id: item.id,
      ...item.fields,
    }));

    return formattedReturn(200, formattedExpenses);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
