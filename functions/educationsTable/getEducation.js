const { table } = require("./airtable-education");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id, fv } = event.queryStringParameters;
  //const { id, filterValue, filterField } = event.queryStringParameters;

  if (id) {
    const education = await table.find(id);
    const formattedEducation = { id: education.id, ...education.fields };
    if (education.error) {
      return {
        statusCode: 404,
        body: `No Education with id: ${id}`,
      };
    }

    return formattedReturn(200, formattedEducation);
  }
  if (fv) {
    const education = await table
      .select({ filterByFormula: `empid = '${fv}'` })
      .firstPage();
    const formattedEducation = education.map((e) => ({
      id: e.id,
      ...e.fields,
    }));

    return formattedReturn(200, formattedEducation);
  }

  try {
    const education = await table.select().firstPage();
    const formattedEducation = education.map((education) => ({
      id: education.id,
      ...education.fields,
    }));

    return formattedReturn(200, formattedEducation);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
