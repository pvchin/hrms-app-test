const { table } = require("./airtable-payitems");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { ...fields } = JSON.parse(event.body);
  try {
    const createdPayitem = await table.create([{ fields }]);
    return formattedReturn(200, createdPayitem);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
