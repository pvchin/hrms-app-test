const { table } = require("./airtable-allowances");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { ...fields } = JSON.parse(event.body);
  try {
    const createdAllowance = await table.create([{ fields }]);
    return formattedReturn(200, createdAllowance);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
