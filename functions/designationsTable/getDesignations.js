const { table } = require("./airtable-designations");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id, filterValue } = event.queryStringParameters;
  // const { id, filterValue, filterField } = event.queryStringParameters;
  // console.log(filterValue, filterField);

  if (id) {
    const designation = await table.find(id);
    const formattedDesignations = { id: designation.id, ...designation.fields };
    if (designation.error) {
      return {
        statusCode: 404,
        body: `No Designation with id: ${id}`,
      };
    }

    return formattedReturn(200, formattedDesignations);
  }
  if (filterValue) {
    const designations = await table
      .select({ filterByFormula: `gender=${filterValue}` })
      .firstPage();
    const formattedDesignations = designations.map((designationt) => ({
      id: designation.id,
      ...designation.fields,
    }));

    return formattedReturn(200, formattedDesignations);
  }

  try {
    const designations = await table.select().firstPage();
    const formattedDesignations = designations.map((designation) => ({
      id: designation.id,
      ...designation.fields,
    }));

    return formattedReturn(200, formattedDesignations);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
