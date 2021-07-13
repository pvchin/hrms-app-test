const { table } = require("./airtable-trainings");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { ...fields } = JSON.parse(event.body);
  try {
    const createdTraining = await table.create([{ fields }]);
    return formattedReturn(200, createdTraining);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
