const formattedReturn = require("./formattedReturn");
const getDesignations = require("./designationsTable/getDesignations");
const createDesignation = require("./designationsTable/createDesignation");
const deleteDesignation = require("./designationsTable/deleteDesignation");
const updateDesignation = require("./designationsTable/updateDesignation");
exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getDesignations(event);
  } else if (event.httpMethod === "POST") {
    return await createDesignation(event);
  } else if (event.httpMethod === "PUT") {
    return await updateDesignation(event);
  } else if (event.httpMethod === "DELETE") {
    return await deleteDesignation(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
