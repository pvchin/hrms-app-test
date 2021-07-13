const formattedReturn = require("./formattedReturn");
const getEmployees = require("./employeesTable/getEmployees");
const createEmployee = require("./employeesTable/createEmployee");
const deleteEmployee = require("./employeesTable/deleteEmployee");
const updateEmployee = require("./employeesTable/updateEmployee");
exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getEmployees(event);
  } else if (event.httpMethod === "POST") {
    return await createEmployee(event);
  } else if (event.httpMethod === "PUT") {
    return await updateEmployee(event);
  } else if (event.httpMethod === "DELETE") {
    return await deleteEmployee(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
