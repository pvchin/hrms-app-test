const { table } = require("./airtable-family");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id, rec_id, ...fields } = JSON.parse(event.body);
  try {
    const updatedFamily = await table.update([{ id, fields }]);
    return formattedReturn(200, updatedFamily);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
