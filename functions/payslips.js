const formattedReturn = require("./formattedReturn");
const getPayslips = require("./payslipsTable/getPayslips");
const createPayslip = require("./payslipsTable/createPayslip");
const deletePayslip = require("./payslipsTable/deletePayslip");
const updatePayslip = require("./payslipsTable/updatePayslip");
exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getPayslips(event);
  } else if (event.httpMethod === "POST") {
    return await createPayslip(event);
  } else if (event.httpMethod === "PUT") {
    return await updatePayslip(event);
  } else if (event.httpMethod === "DELETE") {
    return await deletePayslip(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
