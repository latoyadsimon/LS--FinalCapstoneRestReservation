const tablesService = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

//middleware/ helper functions

async function tablesExists(req, res, next) {
  const table_id = res.locals.table_id;
  const table = await tablesService.read(table_id);
  if (table) {
    res.locals.table = table;
    next();
  } else {
    next({
      status: 404,
      message: `table cannot be found. ${table_id}`,
    });
  }
}

const hasRequiredProperties = hasProperties("table_name", "capacity");

const VALID_PROPERTIES = ["table_name", "capacity"];

function hasValidFields(req, res, next) {
  const { data = {} } = req.body;
  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

function isValidNumber(req, res, next) {
  const { data = {} } = req.body;
  console.log("this should be the capacity:", data["capacity"]);

  if (data["capacity"] === 0 || !Number.isInteger(data["capacity"])) {
    return next({ status: 400, message: `Invalid number for capacity` });
  }
  next();
}

function isOneCharacter(req, res, next) {
  const { data = {} } = req.body;
  if (data["table_name"].length < 2) {
    return next({
      status: 400,
      message: `table_name needs to be more than one character`,
    });
  }
  next();
}

/**
 * Create handler for tables resources
 */
async function create(req, res) {
  const data = await tablesService.create(req.body.data);
  res.status(201).json({ data });
}

async function list(req, res) {
  const data = await tablesService.list(req.query.body);
  console.log("list table controller function", data);
  res.json({
    data,
  });
}

async function read(req, res) {
  res.status(200).json({ data: res.locals.table });
}

async function update(req, res) {
  const updatedTable = {
    ...req.body.data,
    table_id: res.locals.table.table_id,
  };

  const data = await tablesService.update(updatedTable);
  res.json({ data });
}

async function destroy(req, res) {
  const { table } = res.locals;
  await tablesService.delete(table.table_id);
  res.sendStatus(204);
}

module.exports = {
  create: [
    hasRequiredProperties,
    hasValidFields,
    isValidNumber,
    isOneCharacter,
    asyncErrorBoundary(create),
  ],
  read: [tablesExists, asyncErrorBoundary(read)],
  tablesExists,
  update: [
    tablesExists,
    hasValidFields,
    isValidNumber,
    asyncErrorBoundary(update),
  ],
  delete: [asyncErrorBoundary(tablesExists), asyncErrorBoundary(destroy)],
  list: asyncErrorBoundary(list),
};
