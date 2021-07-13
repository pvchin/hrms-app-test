const { table } = require("./airtable-expenses");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id, fv, fi } = event.queryStringParameters;
  // const { id, filterValue, filterField } = event.queryStringParameters;
  // console.log(filterValue, filterField);

  if (id) {
    const expense = await table.find(id);
    const formattedExpenses = { id: expense.id, ...expense.fields };
    if (expense.error) {
      return {
        statusCode: 404,
        body: `No Expense with id: ${id}`,
      };
    }

    return formattedReturn(200, formattedExpenses);
  }
  if (fv) {
    const expenses = await table
      .select({ view: "sortedview",filterByFormula: `empid = '${fv}'` })
      .firstPage();
    const formattedExpenses = expenses.map((expense) => ({
      id: expense.id,
      ...expense.fields,
    }));

    return formattedReturn(200, formattedExpenses);
  }

  if (fi) {
    const expenses = await table
      .select({ view: "sortedview",filterByFormula: `status = '${fi}'` })
      .firstPage();
    const formattedExpenses = expenses.map((expense) => ({
      id: expense.id,
      ...expense.fields,
    }));

    return formattedReturn(200, formattedExpenses);
  }

  try {
    const expenses = await table.select().firstPage();
    const formattedExpenses = expenses.map((expense) => ({
      id: expense.id,
      ...expense.fields,
    }));

    return formattedReturn(200, formattedExpenses);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
