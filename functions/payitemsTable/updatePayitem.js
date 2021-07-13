const { table } = require("./airtable-payitems");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id, ...fields } = JSON.parse(event.body);
  try {
    const updatedPayitem = await table.update([{ id, fields }]);
    return formattedReturn(200, updatedPayitem);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
