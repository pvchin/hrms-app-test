const { table } = require("./airtable-leaves");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id } = JSON.parse(event.body);
  try {
    const deletedLeave = await table.destroy(id);
    return formattedReturn(200, deletedLeave);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
