const formattedReturn = require("./formattedReturn");
const getExperience = require("./experiencesTable/getExperience");
const createExperience = require("./experiencesTable/createExperience");
const deleteExperience = require("./experiencesTable/deleteExperience");
const updateExperience = require("./experiencesTable/updateExperience");
exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getExperience(event);
  } else if (event.httpMethod === "POST") {
    return await createExperience(event);
  } else if (event.httpMethod === "PUT") {
    return await updateExperience(event);
  } else if (event.httpMethod === "DELETE") {
    return await deleteExperience(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
