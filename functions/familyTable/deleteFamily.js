const { table } = require("./airtable-family");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id } = JSON.parse(event.body);
  try {
    const deletedFamily = await table.destroy(id);
    return formattedReturn(200, deletedFamily);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
