const { table } = require("./airtable-dailyallowsdetls");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id, fi, fv, period } = event.queryStringParameters;
  // const { id, filterValue, filterField } = event.queryStringParameters;
  // console.log(filterValue, filterField);

  if (id) {
    const dailyallowsdetls = await table.find(id);
    const formattedDailyAllowsDetls = {
      id: dailyallowsdetls.id,
      ...dailyallowsdetls.fields,
    };
    if (dailyallowsdetls.error) {
      return {
        statusCode: 404,
        body: `No Daily Allowances Details with id: ${id}`,
      };
    }

    return formattedReturn(200, formattedDailyAllowsDetls);
  }

  if (fi) {
    const dailyallowsdetls = await table
      .select({
        view: "sortedview",
        // filterByFormula: 'AND(period="2021-02")',
        // filterByFormula: 'AND(empid="rec1rEYb2ZrHRgiTE",period="2021-02")',
        filterByFormula: `period = '${fi}'`,
      })
      .firstPage();
    const formattedDailyAllowsDetls = dailyallowsdetls.map((e) => ({
      id: e.id,
      ...e.fields,
    }));

    return formattedReturn(200, formattedDailyAllowsDetls);
  }

  if (fv) {
    const dailyallowsdetls = await table
      .select({
        view: "sortedview",
        // filterByFormula: 'AND(period="2021-02")',
        // filterByFormula: 'AND(empid="rec1rEYb2ZrHRgiTE",period="2021-02")',
        filterByFormula: `AND(empid="${fv}",period="${period}")`,
      })
      .firstPage();
    const formattedDailyAllowsDetls = dailyallowsdetls.map((e) => ({
      id: e.id,
      ...e.fields,
    }));

    return formattedReturn(200, formattedDailyAllowsDetls);
  }

  try {
    const dailyallowsdetls = await table
      .select({ view: "sortedview" })
      .firstPage();
    const formattedDailyAllowsDetls = dailyallowsdetls.map(
      (dailyallowsdetl) => ({
        id: dailyallowsdetl.id,
        ...dailyallowsdetl.fields,
      })
    );

    return formattedReturn(200, formattedDailyAllowsDetls);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
