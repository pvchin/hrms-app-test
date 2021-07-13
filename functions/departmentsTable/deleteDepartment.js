const { table } = require("./airtable-departments");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id } = JSON.parse(event.body);
  try {
    const deletedDepartment = await table.destroy(id);
    return formattedReturn(200, deletedDepartment);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
