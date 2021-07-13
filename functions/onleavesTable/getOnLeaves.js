const { table } = require("./airtable-onleaves");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  try {
    const onleaves = await table.select({ view: "onleaveview" }).firstPage();
    const formattedLeaves = onleaves.map((leave) => ({
      id: leave.id,
      ...leave.fields,
    }));

    return formattedReturn(200, formattedLeaves);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
