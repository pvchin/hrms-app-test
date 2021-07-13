const { table } = require("./airtable-dailyallowsdetls");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  try {
    const dailyallowsdetls = await table
      .select({ view: "pendingview" })
      .firstPage();
    const formattedAllows = dailyallowsdetls.map((item) => ({
      id: item.id,
      ...item.fields,
    }));

    return formattedReturn(200, formattedAllows);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
