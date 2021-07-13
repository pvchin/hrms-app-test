require("dotenv").config();
var Airtable = require("airtable");

var base = new Airtable({
  apiKey: process.env.AIRTABLE_API_ID,
}).base(process.env.AIRTABLE_BASE_ID);

const table = base("allowances");

module.exports = { table };
