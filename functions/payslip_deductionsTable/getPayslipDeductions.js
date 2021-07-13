const { table } = require("./airtable-payslipdeductions");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id, fv, period } = event.queryStringParameters;
  // const { id, filterValue, filterField } = event.queryStringParameters;
  // console.log(filterValue, filterField);
  try {
    if (id) {
      const payslipdeductions = await table.find(id);
      const formattedPayslipDeductions = {
        id: payslipdeduction.id,
        ...payslipdeduction.fields,
      };
      if (payslipdeductions.error) {
        return {
          statusCode: 404,
          body: `No Payslip Deduction with id: ${id}`,
        };
      }

      return formattedReturn(200, formattedPayslipDeductions);
    }
  } catch (error) {
    console.error(err);
    return formattedReturn(500, {});
  }
  try {
    if (fv) {
      const payslipdeductions = await table
        .select({
          // filterByFormula: 'AND(period="2021-02")',
          // filterByFormula: 'AND(empid="rec1rEYb2ZrHRgiTE",period="2021-02")',
          filterByFormula: `AND(empid="${fv}",period="${period}")`,
        })
        .firstPage();
      const formattedPayslipDeductions = payslipdeductions.map(
        (payslipdeduction) => ({
          id: payslipdeduction.id,
          ...payslipdeduction.fields,
        })
      );

      return formattedReturn(200, formattedPayslipDeductions);
    }
  } catch (error) {
    console.error(err);
    return formattedReturn(500, {});
  }
  try {
    const payslipdeductions = await table.select().firstPage();
    const formattedPayslipDeductions = payslipdeductions.map(
      (payslipdeduction) => ({
        id: payslipdeduction.id,
        ...payslipdeduction.fields,
      })
    );

    return formattedReturn(200, formattedPayslipDeductions);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
