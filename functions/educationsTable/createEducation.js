const { table } = require("./airtable-education");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { ...fields } = JSON.parse(event.body);
  try {
    const createdEducation = await table.create([{ fields }]);
    return formattedReturn(200, createdEducation);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
