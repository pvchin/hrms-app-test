const { table } = require("./airtable-dailyallowances");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id } = JSON.parse(event.body);
  try {
    const deletedDailyAllowances = await table.destroy(id);
    return formattedReturn(200, deletedDailyAllowances);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
