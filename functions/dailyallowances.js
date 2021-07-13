const formattedReturn = require("./formattedReturn");
const getDailyAllowances = require("./dailyallowancesTable/getDailyAllowances");
const createDailyAllowance = require("./dailyallowancesTable/createDailyAllowance");
const deleteDailyAllowance = require("./dailyallowancesTable/deleteDailyAllowance");
const updateDailyAllowance = require("./dailyallowancesTable/updateDailyAllowance");
exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getDailyAllowances(event);
  } else if (event.httpMethod === "POST") {
    return await createDailyAllowance(event);
  } else if (event.httpMethod === "PUT") {
    return await updateDailyAllowance(event);
  } else if (event.httpMethod === "DELETE") {
    return await deleteDailyAllowance(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
