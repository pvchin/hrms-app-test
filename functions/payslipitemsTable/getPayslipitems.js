const { table } = require("./airtable-payslipitems");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id, fv, period } = event.queryStringParameters;
  console.log(event.queryStringParameters);

  if (id) {
    const payslipitems = await table.find(id);
    const formattedPayslipitems = {
      id: payslipitem.id,
      ...payslipitem.fields,
    };
    if (payslipitems.error) {
      return {
        statusCode: 404,
        body: `No Payslip Item with id: ${id}`,
      };
    }
    return formattedReturn(200, formattedPayslipitems);
  }
  if (fv) {
    const payslipitems = await table
      .select({
        // filterByFormula: 'AND(period="2021-02")',
        // filterByFormula: 'AND(empid="rec1rEYb2ZrHRgiTE",period="2021-02")',
        filterByFormula: `period ='${fv}'` ,
      })
      .firstPage();
    const formattedPayslipitems = payslipitems.map((item) => ({
      id: item.id,
      ...item.fields,
    }));

    return formattedReturn(200, formattedPayslipitems);
  }

  try {
    const payslipitems = await table.select().firstPage();
    const formattedPayslipitems = payslipitems.map((item) => ({
      id: item.id,
      ...item.fields,
    }));

    return formattedReturn(200, formattedPayslipitems);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
