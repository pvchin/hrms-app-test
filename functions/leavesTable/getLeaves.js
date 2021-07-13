const { table } = require("./airtable-leaves");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id, fv, fi } = event.queryStringParameters;
  // const { id, filterValue, filterField } = event.queryStringParameters;
  // console.log(filterValue, filterField);

  if (id) {
    const leave = await table.find(id);
    const formattedLeaves = { id: leave.id, ...leave.fields };
    if (leave.error) {
      return {
        statusCode: 404,
        body: `No Leave with id: ${id}`,
      };
    }

    return formattedReturn(200, formattedLeaves);
  }

  if (fv) {
    const leaves = await table
      .select({ view: "sortedview", filterByFormula: `empid = '${fv}'` })
      .firstPage();
    const formattedLeaves = leaves.map((leave) => ({
      id: leave.id,
      ...leave.fields,
    }));

    return formattedReturn(200, formattedLeaves);
  }

  if (fi) {
    const leaves = await table
      .select({ view: "sortedview", filterByFormula: `status = '${fi}'` })
      .firstPage();
    const formattedLeaves = leaves.map((leave) => ({
      id: leave.id,
      ...leave.fields,
    }));

    return formattedReturn(200, formattedLeaves);
  }

  try {
    const leaves = await table.select({ view: "sortedview" }).firstPage();
    const formattedLeaves = leaves.map((leave) => ({
      id: leave.id,
      ...leave.fields,
    }));

    return formattedReturn(200, formattedLeaves);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
