const { table } = require("./airtable-dailyallowsdetls");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id, ...fields } = JSON.parse(event.body);
  try {
    const updatedDailyAllowsDetl = await table.update([{ id, fields }]);
    return formattedReturn(200, updatedDailyAllowsDetl);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
