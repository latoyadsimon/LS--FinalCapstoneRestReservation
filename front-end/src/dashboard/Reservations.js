import React from "react";
import { Link } from "react-router-dom";

function Reservations({ onCancel, reservations = [] }) {
  function cancelHandler({
    target: { dataset: { reservationIdCancel } } = {},
  }) {
    if (
      reservationIdCancel &&
      window.confirm(
        "Do you want to cancel this reservation? This cannot be undone."
      )
    ) {
      onCancel(reservationIdCancel);
    }
  }

  const rows = reservations.length ? (
    reservations.map((reservation) => {
      return (
        <div className="form-group row" key={reservation.reservation_id}>
          <div className="col-sm-1">{reservation.reservation_id}</div>
          <div>
            {reservation.first_name}, {reservation.last_name}
          </div>
          <div>{reservation.mobile_number}</div>
          <div>{reservation.reservation_time}</div>
          <div>{reservation.reservation_date}</div>
          <div>{reservation.people}</div>
          <div data-reservation-id-status={reservation.reservation_id}>
            {reservation.status}
          </div>
          <Link to={`/reservations/${reservation.reservation_id}/seat`}>
            <button type="button" className="btn btn-primary">
              Seat
            </button>
          </Link>
        </div>
      );
    })
  ) : (
    <div>No reservations found</div>
  );

  return <div className="table">{rows}</div>;
}

export default Reservations;
