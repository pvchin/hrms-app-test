const formattedReturn = require("./formattedReturn");
const getAllowances = require("./allowancesTable/getAllowances");
const createAllowance = require("./allowancesTable/createAllowance");
const deleteAllowance = require("./allowancesTable/deleteAllowance");
const updateAllowance = require("./allowancesTable/updateAllowance");
exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getAllowances(event);
  } else if (event.httpMethod === "POST") {
    return await createAllowance(event);
  } else if (event.httpMethod === "PUT") {
    return await updateAllowance(event);
  } else if (event.httpMethod === "DELETE") {
    return await deleteAllowance(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
