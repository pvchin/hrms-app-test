const formattedReturn = require("./formattedReturn");
const getPayslipitems = require("./payslipitemsTable/getPayslipitems");
const createPayslipitem = require("./payslipitemsTable/createPayslipitem");
const deletePayslipitem = require("./payslipitemsTable/deletePayslipitem");
const updatePayslipitem = require("./payslipitemsTable/updatePayslipitem");
exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getPayslipitems(event);
  } else if (event.httpMethod === "POST") {
    return await createPayslipitem(event);
  } else if (event.httpMethod === "PUT") {
    return await updatePayslipitem(event);
  } else if (event.httpMethod === "DELETE") {
    return await deletePayslipitem(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
