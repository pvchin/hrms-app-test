const { table } = require("./airtable-employees");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { id } = JSON.parse(event.body);
  try {
    const deletedEmployee = await table.destroy(id);
    return formattedReturn(200, deletedEmployee);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
