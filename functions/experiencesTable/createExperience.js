const { table } = require("./airtable-experiences");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { ...fields } = JSON.parse(event.body);
  try {
    const createdExperience = await table.create([{ fields }]);
    return formattedReturn(200, createdExperience);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
