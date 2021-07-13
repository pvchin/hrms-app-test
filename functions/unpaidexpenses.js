const formattedReturn = require("./formattedReturn");
const getUnpaidExpenses = require("./expensesTable/getUnpaidExpenses");

exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getUnpaidExpenses(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
