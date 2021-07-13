const formattedReturn = require("./formattedReturn");
const getDailyAllowsDetls = require("./dailyallowsdetlsTable/getDailyAllowsDetls");
const createDailyAllowsDetl = require("./dailyallowsdetlsTable/createDailyAllowsDetl");
const deleteDailyAllowsDetl = require("./dailyallowsdetlsTable/deleteDailyAllowsDetl");
const updateDailyAllowsDetl = require("./dailyallowsdetlsTable/updateDailyAllowsDetl");
exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getDailyAllowsDetls(event);
  } else if (event.httpMethod === "POST") {
    return await createDailyAllowsDetl(event);
  } else if (event.httpMethod === "PUT") {
    return await updateDailyAllowsDetl(event);
  } else if (event.httpMethod === "DELETE") {
    return await deleteDailyAllowsDetl(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
