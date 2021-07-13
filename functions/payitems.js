const formattedReturn = require("./formattedReturn");
const getPayitems = require("./payitemsTable/getPayitems");
const createPayitem = require("./payitemsTable/createPayitem");
const deletePayitem = require("./payitemsTable/deletePayitem");
const updatePayitem = require("./payitemsTable/updatePayitem");
exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getPayitems(event);
  } else if (event.httpMethod === "POST") {
    return await createPayitem(event);
  } else if (event.httpMethod === "PUT") {
    return await updatePayitem(event);
  } else if (event.httpMethod === "DELETE") {
    return await deletePayitem(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
