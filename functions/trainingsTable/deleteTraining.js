const { table } = require("./airtable-trainings");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id } = JSON.parse(event.body);
  try {
    const deletedTraining = await table.destroy(id);
    return formattedReturn(200, deletedTraining);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
