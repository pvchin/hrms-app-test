const { table } = require("./airtable-dailyallowsdetls");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { ...fields } = JSON.parse(event.body);
  try {
    const createdDailyAllowsDetl = await table.create([{ fields }]);
    return formattedReturn(200, createdDailyAllowsDetl);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
