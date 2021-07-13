const { table } = require("./airtable-employees");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id, ...fields } = JSON.parse(event.body);
  try {
    const updatedEmployee = await table.update([{ id, fields }]);
    return formattedReturn(200, updatedEmployee);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
