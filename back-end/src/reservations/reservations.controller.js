const reservationsService = require("./reservations.service");
//const { today } = require("../../../front-end/src/utils/date-time");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

//middleware/helper functions

async function reservationExists(req, res, next) {
  const { reservation_id } = req.params || req.body.data;
  const reservation = await reservationsService.read(reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    next();
  } else {
    next({
      status: 404,
      message: `Reservation not found. ${reservation_id}`,
    });
  }
}

const hasRequiredProperties = hasProperties(
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
);

//added status
const validFields = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
  "status",
];

function hasValidFields(req, res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !validFields.includes(field)
  );

  if (invalidFields.length)
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  next();
}

/**
 * Check "isValidNumber" handler for reservation resources
 */
function isValidNumber(req, res, next) {
  const { data = {} } = req.body;
  // console.log("this should be the number of people:", data["people"]);
  if (data["people"] === 0 || !Number.isInteger(data["people"])) {
    return next({ status: 400, message: `Invalid number of people` });
  }
  next();
}

/**
 * Check "isValidDate" handler for reservation resources
 */
function isValidDate(req, res, next) {
  const { data = {} } = req.body;
  const reservation_date = new Date(data["reservation_date"]);
  const day = reservation_date.getUTCDay(); //check this on mdn-- this is finding the number for the day of the week,
  //according to universal time: 0 for Sunday, 1 for Monday, 2 for Tuesday, and so on.
  // console.log("this is the reservation date:", reservation_date);

  if (isNaN(Date.parse(data["reservation_date"]))) {
    return next({ status: 400, message: `Invalid reservation_date` });
  }
  if (day === 2) {
    return next({ status: 400, message: `Restaurant is closed on Tuesdays` });
  }

  //check to see if same day reservations can be made*****
  if (reservation_date < new Date()) {
    return next({
      status: 400,
      message: `Reservation must be set in the future`,
    });
  }
  next();
}

/**
 * Check "isTime" handler for reservation resources
 */
//this is using regexp; regular expressions, patterns
function isTime(req, res, next) {
  const { data = {} } = req.body;
  //HH:MM 24-hour with leading 0 || don't know what this one is yet***
  if (
    /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(data["reservation_time"]) ||
    /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test(
      data["reservation_time"]
    )
  ) {
    if (data["reservation_time"] < "10:30") {
      return next({
        status: 400,
        message: "restaurant is not open until 10:30AM",
      });
    }

    if (data["reservation_time"] > "21:30") {
      return next({
        status: 400,
        message: "cannot schedule a reservation after 9:30pm",
      });
    }
    return next();
  }
  next({ status: 400, message: `Invalid reservation_time` });
}

/**
 * Check checkStatus handler for reservation resources
 */
function checkStatus(req, res, next) {
  const { data } = req.body;
  //console.log("this is from the check status", data["status"]);
  if (data["status"] === "seated") {
    return next({ status: 400, message: `reservation is seated` });
  }
  if (data["status"] === "finished") {
    return next({ status: 400, message: `finished` });
  }
  next();
}

const validStatus = ["booked", "finished", "seated"];

function hasValidStatus(req, res, next) {
  const { status } = req.body.data;
  console.log("hasValidStatus:", status);
  if (!validStatus.includes(status)) {
    return next({
      status: 400,
      message: `unknown`,
    });
  }
  // if (status === "finished") {
  //   return next({
  //     status: 400,
  //     message: `a finished reservation`,
  //   });
  // }
  next();
}

// function youAlreadyAte(req, res, next) {
//   const { status } = req.body.data;
//   console.log("youAlreadyAte:", status);
//   if (status === "finished") {
//     return next({
//       status: 400,
//       message: `a finished reservation cannot be updated`,
//     });
//   }
//   next();
// }

/**
 * Create handler for reservation resources
 */
async function create(req, res) {
  const data = await reservationsService.create(req.body.data);
  res.status(201).json({ data });
}

/**
 * Read handler for reservation resources
 */
//**change made here */
function read(req, res) {
  res.status(200).json({ data: res.locals.reservation });
}

/**
 * Update handler for reservation resources
 */
async function update(req, res, next) {
  // const { reservation_id } = res.locals.reservation;
  // req.body.data.reservation_id = reservation_id;
  // const data = await reservationsService.update(req.body.data);
  // res.json({ data });
  //a different way to write  const updatedReservation

  const updatedReservation = {
    ...req.body.data,
    reservation_id: res.locals.reservation.reservation_id,
    status: req.body.data.status,
  };

  if (res.locals.reservation.status === "finished") {
    return next({
      status: 400,
      message: `a finished reservation cannot be updated`,
    });
  }
  const data = await reservationsService.update(updatedReservation);
  res.status(200).json({ data });
}

/**
 * Delete handler for reservation resources
 */

async function destroy(req, res) {
  const { reservation } = res.locals;
  await reservationsService.delete(reservation.reservation_id);
  res.sendStatus(204);
}

/**
 * List handler (basic) for reservation resources
 */
async function list(req, res) {
  const data = await reservationsService.list(req.query.date);
  res.json({
    data,
  });
}

module.exports = {
  create: [
    hasRequiredProperties,
    hasValidFields,
    isTime,
    isValidDate,
    isValidNumber,
    checkStatus,
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(reservationExists), read],
  reservationExists: [reservationExists],
  update: [
    reservationExists,
    hasValidFields,
    // hasRequiredProperties,
    //isValidNumber,
    // isValidDate,
    //isTime,
    //checkStatus,

    hasValidStatus,
    // youAlreadyAte,
    asyncErrorBoundary(update),
  ],
  delete: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(destroy)],
  list: asyncErrorBoundary(list),
};
