const { table } = require("./airtable-payitems");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id } = event.queryStringParameters;
  
  if (id) {
    const payitem = await table.find(id);
    const formattedPayitems = { id: payitem.id, ...payitem.fields };
    if (payitem.error) {
      return {
        statusCode: 404,
        body: `No Payitem with id: ${id}`,
      };
    }

    return formattedReturn(200, formattedPayitems);
  }

  
  try {
    const payitems = await table.select().firstPage();
    const formattedPayitems = payitems.map((item) => ({
      id: item.id,
      ...item.fields,
    }));

    return formattedReturn(200, formattedPayitems);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
