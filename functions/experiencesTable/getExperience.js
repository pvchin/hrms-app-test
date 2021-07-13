const { table } = require("./airtable-experiences");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id, fv } = event.queryStringParameters;
  //const { id, filterValue, filterField } = event.queryStringParameters;

  if (id) {
    const experience = await table.find(id);
    const formattedExperience = { id: experience.id, ...experience.fields };
    if (experience.error) {
      return {
        statusCode: 404,
        body: `No Experience with id: ${id}`,
      };
    }

    return formattedReturn(200, formattedExperience);
  }
  if (fv) {
    const experience = await table
      .select({ filterByFormula: `empid = '${fv}'` })
      .firstPage();
    const formattedExperience = experience.map((e) => ({
      id: e.id,
      ...e.fields,
    }));

    return formattedReturn(200, formattedExperience);
  }

  try {
    const experience = await table.select().firstPage();
    const formattedExperience = experience.map((e) => ({
      id: e.id,
      ...e.fields,
    }));

    return formattedReturn(200, formattedExperience);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
