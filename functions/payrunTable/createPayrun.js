const { table } = require("./airtable-payrun");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { ...fields } = JSON.parse(event.body);
  try {
    const createdPayrun = await table.create([{ fields }]);
    return formattedReturn(200, createdPayrun);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
