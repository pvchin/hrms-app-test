const { table } = require("./airtable-education");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id } = JSON.parse(event.body);
  try {
    const deletedEducation = await table.destroy(id);
    return formattedReturn(200, deletedEducation);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
