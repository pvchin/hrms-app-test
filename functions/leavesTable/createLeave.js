const { table } = require("./airtable-leaves");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { ...fields } = JSON.parse(event.body);
  try {
    const createdLeave = await table.create([{ fields }]);
    return formattedReturn(200, createdLeave);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
