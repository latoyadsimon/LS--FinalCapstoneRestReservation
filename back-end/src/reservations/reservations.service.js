//const { today } = require("../../../front-end/src/utils/date-time");

const knex = require("../db/connection");

function list(date) {
  // return knex("reservations").select("*");
  return knex("reservations")
    .where("reservation_date", date)
    .orderBy("reservation_time");
}

function read(reservation_id) {
  return knex("reservations").where({ reservation_id }).first();
}

// function reservationIsToday() {
//   return knex("reservations")
//     .select("*")
//     .where({ "reservations.reservation_date": today });
// }

function create(newReservation) {
  return knex("reservations")
    .insert(newReservation, "*")
    .then((createdRecords) => createdRecords[0]);
}

function update(updatedReservation) {
  return knex("reservations")
    .where({ reservation_id: updatedReservation.reservation_id })
    .update(updatedReservation, "*")
    .then((updatedRecord) => updatedRecord[0]);
}

function destroy(reservation_Id) {
  return knex("reservations").where({ reservation_Id }).del();
}

module.exports = {
  list,
  read,
  // reservationIsToday,
  create,
  update,
  delete: destroy,
};
