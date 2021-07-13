const { table } = require("./airtable-designations");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { ...fields } = JSON.parse(event.body);
  try {
    const createdDesignation = await table.create([{ fields }]);
    return formattedReturn(200, createdDesignation);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
