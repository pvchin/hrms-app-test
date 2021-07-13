const { table } = require("./airtable-dailyallowsdetls");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id } = JSON.parse(event.body);
  try {
    const deletedDailyAllowsDetl = await table.destroy(id);
    return formattedReturn(200, deletedDailyAllowsDetl);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
