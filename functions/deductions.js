const formattedReturn = require("./formattedReturn");
const getDeductions = require("./deductionsTable/getDeductions");
const createDeduction = require("./deductionsTable/createDeduction");
const deleteDeduction = require("./deductionsTable/deleteDeduction");
const updateDeduction = require("./deductionsTable/updateDeduction");
exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getDeductions(event);
  } else if (event.httpMethod === "POST") {
    return await createDeduction(event);
  } else if (event.httpMethod === "PUT") {
    return await updateDeduction(event);
  } else if (event.httpMethod === "DELETE") {
    return await deleteDeduction(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
