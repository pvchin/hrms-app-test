const { table } = require("./airtable-education");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id, ...fields } = JSON.parse(event.body);
  try {
    const updatedEducation = await table.update([{ id, fields }]);
    return formattedReturn(200, updatedEducation);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
