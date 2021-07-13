const formattedReturn = require("./formattedReturn");
const getWPExpiry = require("./wpexpiryTable/getWPExpiry");

exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getWPExpiry(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
