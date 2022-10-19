const path = require("path");
const reservationsService = "./reservations.service";

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  res.json({
    data: [],
  });
}

module.exports = {
  list,
};
