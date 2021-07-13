const formattedReturn = require("./formattedReturn");
const getExpenses = require("./expensesTable/getExpenses");
const createExpense = require("./expensesTable/createExpense");
const deleteExpense = require("./expensesTable/deleteExpense");
const updateExpense = require("./expensesTable/updateExpense");
exports.handler = async (event) => {
  if (event.httpMethod === "GET") {
    return await getExpenses(event);
  } else if (event.httpMethod === "POST") {
    return await createExpense(event);
  } else if (event.httpMethod === "PUT") {
    return await updateExpense(event);
  } else if (event.httpMethod === "DELETE") {
    return await deleteExpense(event);
  } else {
    console.log(event.httpMethod);
    return formattedReturn(405, {});
  }
};
