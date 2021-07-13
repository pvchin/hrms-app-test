const { table } = require("./airtable-payitems");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id } = JSON.parse(event.body);
  try {
    const deletedPayitem = await table.destroy(id);
    return formattedReturn(200, deletedPayitem);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
