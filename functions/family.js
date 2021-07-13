const formattedReturn = require("./formattedReturn");
const getFamily = require("./familyTable/getFamily");
const createFamily = require("./familyTable/createFamily");
const deleteFamily = require("./familyTable/deleteFamily");
const updateFamily = require("./familyTable/updateFamily");
exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getFamily(event);
  } else if (event.httpMethod === "POST") {
    return await createFamily(event);
  } else if (event.httpMethod === "PUT") {
    return await updateFamily(event);
  } else if (event.httpMethod === "DELETE") {
    return await deleteFamily(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
