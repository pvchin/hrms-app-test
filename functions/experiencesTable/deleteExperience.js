const { table } = require("./airtable-experiences");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id } = JSON.parse(event.body);
  try {
    const deletedExperience = await table.destroy(id);
    return formattedReturn(200, deletedExperience);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
