const { table } = require("./airtable-allowances");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id } = JSON.parse(event.body);
  try {
    const deletedAllowance = await table.destroy(id);
    return formattedReturn(200, deletedAllowance);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
