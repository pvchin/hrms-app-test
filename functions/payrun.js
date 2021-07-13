const formattedReturn = require("./formattedReturn");
const getPayrun = require("./payrunTable/getPayrun");
const createPayrun = require("./payrunTable/createPayrun");
const deletePayrun = require("./payrunTable/deletePayrun");
const updatePayrun = require("./payrunTable/updatePayrun");
exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getPayrun(event);
  } else if (event.httpMethod === "POST") {
    return await createPayrun(event);
  } else if (event.httpMethod === "PUT") {
    return await updatePayrun(event);
  } else if (event.httpMethod === "DELETE") {
    return await deletePayrun(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
