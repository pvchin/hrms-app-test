const formattedReturn = require("./formattedReturn");
const getPayslipDeductions = require("./payslip_deductionsTable/getPayslipDeductions");
const createPayslipDeduction = require("./payslip_deductionsTable/createPayslipDeduction");
const deletePayslipDeduction = require("./payslip_deductionsTable/deletePayslipDeduction");
const updatePayslipDeduction = require("./payslip_deductionsTable/updatePayslipDeduction");
exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getPayslipDeductions(event);
  } else if (event.httpMethod === "POST") {
    return await createPayslipDeduction(event);
  } else if (event.httpMethod === "PUT") {
    return await updatePayslipDeduction(event);
  } else if (event.httpMethod === "DELETE") {
    return await deletePayslipDeduction(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
