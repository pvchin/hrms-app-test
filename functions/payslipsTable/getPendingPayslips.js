const { table } = require("./airtable-payslips");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  try {
    const payslips = await table
      .select({ view: "pendingview" })
      .firstPage();
    const formattedAllows = payslips.map((item) => ({
      id: item.id,
      ...item.fields,
    }));

    return formattedReturn(200, formattedAllows);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
