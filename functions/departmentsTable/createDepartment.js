const { table } = require("./airtable-departments");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { ...fields } = JSON.parse(event.body);
  try {
    const createdDepartment = await table.create([{ fields }]);
    return formattedReturn(200, createdDepartment);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
