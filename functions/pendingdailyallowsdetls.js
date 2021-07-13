const formattedReturn = require("./formattedReturn");
const getPendingDailyAllowsDetls = require("./dailyallowsdetlsTable/getPendingDailyAllowsDetls");

exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getPendingDailyAllowsDetls(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
