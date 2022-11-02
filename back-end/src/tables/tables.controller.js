const tablesService = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const reservationsService = require("../reservations/reservations.service");

//middleware/ helper functions

//come back to check the const table_id = res.locals.table_id
async function tablesExists(req, res, next) {
  // const table_id = res.locals.table_id;
  const table_id = req.params.table_id;
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

async function reservationIdExists(req, res, next) {
  const resId = req.body.data.reservation_id;
  const reservation = await reservationsService.read(resId);

  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }

  return next({
    status: 404,
    message: `${req.body.data.reservation_id} not found`,
  });
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
  // console.log("this should be the capacity:", data["capacity"]);

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

function tableOccupied(req, res, next) {
  const { people } = res.locals.reservation;
  const { reservation_id, capacity } = res.locals.table;

  if (reservation_id != null) {
    return next({
      status: 400,
      message: "table is occupied",
    });
  }

  if (people > capacity) {
    return next({
      status: 400,
      message: "reservation is greater than table capacity",
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
  const data = await tablesService.list();
  res.json({
    data,
  });
}

async function read(req, res) {
  res.status(200).json({ data: res.locals.table });
}

// async function update(req, res) {
//   const updatedTable = {
//     ...req.body.data,
//     table_id: res.locals.table.table_id,
//   };

//   const data = await tablesService.update(updatedTable);
//   res.json({ data });
// }

async function finishTable(req, res, next) {
  const { table_id } = req.params;
  // const updatedReservation = { ...req.body.data };
  const { reservation_id } = req.body.data;

  const data = tablesService.finishTable(reservation_id, table_id);
  res.status(200).json({ data });
}

async function seatTable(req, res) {
  const { table_id } = req.params;
  const { reservation_id } = req.body.data;

  const data = await tablesService.seatTable(reservation_id, table_id);
  res.status(200).json({ data });
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

  finishTable: [
    asyncErrorBoundary(tablesExists),
    asyncErrorBoundary(finishTable),
  ],
  seatTable: [
    hasProperties("reservation_id"),
    asyncErrorBoundary(reservationIdExists),
    asyncErrorBoundary(tablesExists),
    tableOccupied,
    asyncErrorBoundary(seatTable),
  ],
  list: asyncErrorBoundary(list),
};
