const formattedReturn = require("./formattedReturn");
const getPeriods = require("./periodsTable/getPeriods");

exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getPeriods(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
