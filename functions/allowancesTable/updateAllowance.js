const { table } = require("./airtable-allowances");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id, ...fields } = JSON.parse(event.body);
  try {
    const updatedAllowance = await table.update([{ id, fields }]);
    return formattedReturn(200, updatedAllowance);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
