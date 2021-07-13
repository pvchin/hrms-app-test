const { table } = require("./airtable-wpexpiry");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  try {
    const wpexpiry = await table.select({ view: "wpexpiryview" }).firstPage();
    const formattedWPExpiry = wpexpiry.map((rec) => ({
      id: rec.id,
      ...rec.fields,
    }));

    return formattedReturn(200, formattedWPExpiry);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
