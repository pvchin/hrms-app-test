const { table } = require("./airtable-dailyallowances");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { ...fields } = JSON.parse(event.body);
  try {
    const createdDailyAllowance = await table.create([{ fields }]);
    return formattedReturn(200, createdDailyAllowance);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
