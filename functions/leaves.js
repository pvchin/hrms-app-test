const formattedReturn = require("./formattedReturn");
const getLeaves = require("./leavesTable/getLeaves");
const createLeave = require("./leavesTable/createLeave");
const deleteLeave = require("./leavesTable/deleteLeave");
const updateLeave = require("./leavesTable/updateLeave");
exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getLeaves(event);
  } else if (event.httpMethod === "POST") {
    return await createLeave(event);
  } else if (event.httpMethod === "PUT") {
    return await updateLeave(event);
  } else if (event.httpMethod === "DELETE") {
    return await deleteLeave(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
