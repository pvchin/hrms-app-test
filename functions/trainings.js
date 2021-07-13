const formattedReturn = require("./formattedReturn");
const getTrainings = require("./trainingsTable/getTrainings");
const createTraining = require("./trainingsTable/createTraining");
const deleteTraining = require("./trainingsTable/deleteTraining");
const updateTraining = require("./trainingsTable/updateTraining");
exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getTrainings(event);
  } else if (event.httpMethod === "POST") {
    return await createTraining(event);
  } else if (event.httpMethod === "PUT") {
    return await updateTraining(event);
  } else if (event.httpMethod === "DELETE") {
    return await deleteTraining(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
