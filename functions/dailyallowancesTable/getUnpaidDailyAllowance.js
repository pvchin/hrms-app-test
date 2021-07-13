const { table } = require("./airtable-dailyallowances");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  try {
    const dailyallows = await table.select({ view: "approvedview" }).firstPage();
    const formattedAllows = dailyallows.map((item) => ({
      id: item.id,
      ...item.fields,
    }));

    return formattedReturn(200, formattedAllows);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
