const formattedReturn = require("./formattedReturn");
const getPayslipEarnings = require("./payslip_earningsTable/getPayslipEarnings");
const createPayslipEarning = require("./payslip_earningsTable/createPayslipEarning");
const deletePayslipEarning = require("./payslip_earningsTable/deletePayslipEarning");
const updatePayslipEarning = require("./payslip_earningsTable/updatePayslipEarning");
exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getPayslipEarnings(event);
  } else if (event.httpMethod === "POST") {
    return await createPayslipEarning(event);
  } else if (event.httpMethod === "PUT") {
    return await updatePayslipEarning(event);
  } else if (event.httpMethod === "DELETE") {
    return await deletePayslipEarning(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
