const { table } = require("./airtable-family");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { ...fields } = JSON.parse(event.body);
  try {
    const createdFamily = await table.create([{ fields }]);
    return formattedReturn(200, createdFamily);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
