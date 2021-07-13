const { table } = require("./airtable-payslipearnings");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id, fv, period } = event.queryStringParameters;
  console.log(event.queryStringParameters);
  // const { id, filterValue, filterField } = event.queryStringParameters;
  // console.log(filterValue, filterField);

  if (id) {
    const payslipearnings = await table.find(id);
    const formattedPayslipEarnings = {
      id: payslipearning.id,
      ...payslipearning.fields,
    };
    if (payslipearnings.error) {
      return {
        statusCode: 404,
        body: `No Payslip Earning with id: ${id}`,
      };
    }
    return formattedReturn(200, formattedPayslipEarnings);
  }
  if (fv) {
    const payslipearnings = await table
      .select({
        // filterByFormula: 'AND(period="2021-02")',
        // filterByFormula: 'AND(empid="rec1rEYb2ZrHRgiTE",period="2021-02")',
        filterByFormula: `AND(empid="${fv}",period="${period}")`,
      })
      .firstPage();
    const formattedPayslipEarnings = payslipearnings.map((payslipearning) => ({
      id: payslipearning.id,
      ...payslipearning.fields,
    }));

    return formattedReturn(200, formattedPayslipEarnings);
  }

  try {
    const payslipearnings = await table.select().firstPage();
    const formattedPayslipEarnings = payslipearnings.map((payslipearning) => ({
      id: payslipearning.id,
      ...payslipearning.fields,
    }));

    return formattedReturn(200, formattedPayslipEarnings);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
