const knex = require("../db/connection");

async function list() {
  return knex("tables").select("*").orderBy("table_name");
}

function read(table_id) {
  return knex("tables").select("*").where({ table_id }).first();
}

function create(newTable) {
  return knex("tables")
    .insert(newTable, "*")
    .then((createdRecords) => createdRecords[0]);
}

// function update(updatedTable) {
//   return knex("tables")
//     .where({ table_id: updatedTable.table_id })
//     .update(updatedTable, "*")
//     .then((updatedRecord) => updatedRecord[0]);
// }

// //removing reservation_id from params
// function finishTable(table_id) {
//   console.log("this is from the finishTable service", table_id);
//   return knex("tables")
//     .where({ table_id: table_id })
//     .update({ reservation_id: null })
//     .returning("*");
// }

//this function uses transactions -- look that up girl
function finishTable(table_id, reservation_id) {
  return knex.transaction(function (trx) {
    return trx("tables")
      .where({ table_id: table_id })
      .update({ reservation_id: null })
      .then(() => {
        return trx("reservations")
          .where({ reservation_id })
          .update({ status: "finished" });
      });
  });
}
// -------------------------------------------

function seatTable(reservation_id, table_id) {
  return knex.transaction(function (trx) {
    return knex("tables")
      .where({ table_id: table_id })
      .update({ reservation_id })
      .returning("*")
      .then((updatedTable) => updatedTable[0])
      .then(() => {
        return trx("reservations")
          .where({ reservation_id })
          .update({ status: "seated" });
      });
  });
}

// function seatTable(reservation_id, table_id) {
//   return knex("tables")
//     .where({ table_id: table_id })
//     .update({ reservation_id })
//     .returning("*")
//     .then((updatedTable) => updatedTable[0]);
// }

// function destroy(table_Id) {
//   return knex("tables").where({ table_Id }).del();
// }

module.exports = {
  list,
  read,
  create,
  seatTable,
  finishTable,
  // delete: destroy,
};
