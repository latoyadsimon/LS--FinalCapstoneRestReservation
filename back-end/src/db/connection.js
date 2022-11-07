
//development db
const environment = process.env.NODE_ENV || "development";
const config = require("../../knexfile")[environment];
const knex = require("knex")(config);

module.exports = knex;

//production db
// const environment = process.env.NODE_ENV || "production";
// const config = require("../../knexfile")[environment];
// const knex = require("knex")(config);

// module.exports = knex;
