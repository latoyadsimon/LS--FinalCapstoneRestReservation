const seatsService = require("./seats.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

//middleware /helper functions

async function reservationExists(req, res, next) {
  const reservation_id = res.locals.reservation_id;
  const reservation = await reservationsService.read(reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    next();
  } else {
    next({
      status: 404,
      message: `Reservation cannot be found. ${reservation_id}`,
    });
  }
}

async function seatExists(req, res, next) {
  const seat_id = res.locals.seat_id;
  const seat = await seatsService.read(seat_id);
  if (seat) {
    res.locals.seat = seat;
    next();
  } else {
    next({
      status: 404,
      message: `seat cannot be found. ${seat_id}`,
    });
  }
}

// async function reservationIdExists(req, res, next) {

// }

//crudl functions

async function update(req, res) {
  const updatedSeat = {
    ...req.body.data,
    seat_id: res.locals.seat.seat_id,
  };

  const data = await seatsService.update(updatedSeat);
  res.json({ data });
}

async function destroy(req, res) {
  const { seat } = res.locals;
  await seatsService.delete(seat.seat_id);
  res.sendStatus(204);
}

module.exports = {
  update: [seatExists, asyncErrorBoundary(update)],
  delete: [seatExists, asyncErrorBoundary(destroy)],
};
