/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router({ mergeParams: true });
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./reservations.controller");

router
  .route("/")
  .post(controller.create)
  .get(controller.list)
  .all(methodNotAllowed);

router
  .route("/:reservation_id")
  .get(controller.read)
  .patch(controller.update)
  .delete(controller.delete)
  .all(methodNotAllowed);

module.exports = router;
//difference between update router, put changes all of the data, patch changes some of the data
