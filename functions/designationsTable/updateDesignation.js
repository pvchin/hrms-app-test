const { table } = require("./airtable-designations");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id, ...fields } = JSON.parse(event.body);
  try {
    const updatedDepartment = await table.update([{ id, fields }]);
    return formattedReturn(200, updatedDepartment);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
