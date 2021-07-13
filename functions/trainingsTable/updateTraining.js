const { table } = require("./airtable-trainings");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id, ...fields } = JSON.parse(event.body);
  try {
    const updatedTraining = await table.update([{ id, fields }]);
    return formattedReturn(200, updatedTraining);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
