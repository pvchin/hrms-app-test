const { table } = require("./airtable-trainings");
const formattedReturn = require("../formattedReturn");

module.exports = async (event) => {
  const { id, fv } = event.queryStringParameters;
  // const { id, filterValue, filterField } = event.queryStringParameters;
  // console.log(filterValue, filterField);

  if (id) {
    const training = await table.find(id);
    const formattedTrainings = { id: training.id, ...training.fields };
    if (training.error) {
      return {
        statusCode: 404,
        body: `No Training with id: ${id}`,
      };
    }

    return formattedReturn(200, formattedTrainings);
  }

  if (fv) {
    const trainings = await table
      .select({ filterByFormula: `empid = '${fv}'` })
      .firstPage();
    const formattedTrainings = trainings.map((training) => ({
      id: training.id,
      ...training.fields,
    }));

    return formattedReturn(200, formattedTrainings);
  }

  try {
    const trainings = await table.select().firstPage();
    const formattedTrainings = trainings.map((training) => ({
      id: training.id,
      ...training.fields,
    }));

    return formattedReturn(200, formattedTrainings);
  } catch (err) {
    console.error(err);
    return formattedReturn(500, {});
  }
};
