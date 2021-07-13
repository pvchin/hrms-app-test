const formattedReturn = require("./formattedReturn");
const getUnpaidDailyAllows = require("./dailyallowancesTable/getUnpaidDailyAllowance");

exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getUnpaidDailyAllows(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
