const formattedReturn = require("./formattedReturn");
const getDepartments = require("./departmentsTable/getDepartments");
const createDepartment = require("./departmentsTable/createDepartment");
const deleteDepartment = require("./departmentsTable/deleteDepartment");
const updateDepartment = require("./departmentsTable/updateDepartment");
exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getDepartments(event);
  } else if (event.httpMethod === "POST") {
    return await createDepartment(event);
  } else if (event.httpMethod === "PUT") {
    return await updateDepartment(event);
  } else if (event.httpMethod === "DELETE") {
    return await deleteDepartment(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
