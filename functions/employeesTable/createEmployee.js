const { table } = require("./airtable-employees");
const formattedReturn = require("../formattedReturn");
module.exports = async (event) => {
  const { ...fields } = JSON.parse(event.body);
  try {
    const createdEmployee = await table.create([{ fields }]);
    return formattedReturn(200, createdEmployee);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
