const { table } = require("./airtable-experiences");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id, ...fields } = JSON.parse(event.body);
  try {
    const updatedExperience = await table.update([{ id, fields }]);
    return formattedReturn(200, updatedExperience);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
