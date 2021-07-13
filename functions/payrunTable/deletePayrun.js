const { table } = require("./airtable-payrun");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id } = JSON.parse(event.body);
  try {
    const deletedPayrun = await table.destroy(id);
    return formattedReturn(200, deletedPayrun);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
