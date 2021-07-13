const formattedReturn = require("./formattedReturn");
const getOnLeaves = require("./onleavesTable/getOnLeaves");

exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getOnLeaves(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
