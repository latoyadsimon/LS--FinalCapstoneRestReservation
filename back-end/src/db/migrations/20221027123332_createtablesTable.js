exports.up = function (knex) {
  return knex.schema.createTable("tables", (table) => {
    table.increments("table_id").primary();
    table.string("table_name").notNullable();
    table.integer("capacity").notNullable();
    table.integer("reservation_id").unsigned();
    table.string("status").defaultTo("booked");
    table
      .foreign("reservation_id")
      .references("reservation_id")
      .inTable("reservations")
      .onDelete("CASCADE");
    table.timestamps(true, true);
  });
};
//we need to add a column for reservation id
//added a column for the reservation status
exports.down = function (knex) {
  return knex.schema.dropTable("tables");
};
