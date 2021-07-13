const { table } = require("./airtable-designations");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id } = JSON.parse(event.body);
  try {
    const deletedDesignation = await table.destroy(id);
    return formattedReturn(200, deletedDesignation);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
