const formattedReturn = require("./formattedReturn");
const getEducation = require("./educationsTable/getEducation");
const createEducation = require("./educationsTable/createEducation");
const deleteEducation = require("./educationsTable/deleteEducation");
const updateEducation = require("./educationsTable/updateEducation");
exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getEducation(event);
  } else if (event.httpMethod === "POST") {
    return await createEducation(event);
  } else if (event.httpMethod === "PUT") {
    return await updateEducation(event);
  } else if (event.httpMethod === "DELETE") {
    return await deleteEducation(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
