const { table } = require("./airtable-dailyallowances");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id, ...fields } = JSON.parse(event.body);
  try {
    const updatedDailyAllowances = await table.update([{ id, fields }]);
    return formattedReturn(200, updatedDailyAllowances);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
