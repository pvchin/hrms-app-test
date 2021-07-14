const { table } = require("./airtable-family");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id, fv } = event.queryStringParameters;
  //const { id, filterValue, filterField } = event.queryStringParameters;

  if (id) {
    const family = await table.find(id);
    const formattedFamily = { id: family.id, ...family.fields };
    if (family.error) {
      return {
        statusCode: 404,
        body: `No Family with id: ${id}`,
      };
    }

    return formattedReturn(200, formattedFamily);
  }
  try {
    if (fv) {
      // const { id, linkid, ...fields } = JSON.parse(event.body);
      // console.log(linkid);
      const family = await table
        .select({ filterByFormula: `empid = '${fv}'` })
        .firstPage();
      const formattedFamily = family.map((e) => ({
        id: e.id,
        ...e.fields,
      }));

      return formattedReturn(200, formattedFamily);
    }
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }

  try {
    const family = await table.select().firstPage();
    const formattedFamily = family.map((e) => ({
      id: e.id,
      ...e.fields,
    }));

    return formattedReturn(200, formattedFamily);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
