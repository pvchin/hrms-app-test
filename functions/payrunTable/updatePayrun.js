const { table } = require("./airtable-payrun");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id, ...fields } = JSON.parse(event.body);
  try {
    const updatedPayrun = await table.update([{ id, fields }]);
    return formattedReturn(200, updatedPayrun);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
