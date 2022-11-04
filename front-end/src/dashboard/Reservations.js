import React from "react";

function Reservations({ reservation, loadDashboard }) {
  const {
    reservation_id,
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
    status,
  } = reservation;
  return (
    <>
      <tr key={reservation_id}>
        <td className="rowBorder">{reservation_id}</td>
        <td className="rowBorder">
          {last_name}, {first_name}
        </td>
        <td className="rowBorder">{mobile_number}</td>
        <td className="rowBorder">{reservation_date}</td>
        <td className="rowBorder">{reservation_time}</td>
        <td className="rowBorder">{people}</td>
        <td data-reservation-id-status={reservation_id} className="rowBorder">
          {status}
        </td>
        <td>
          <a
            href={`/reservations/${reservation_id}/seat`}
            type="button"
            className="btn btn-primary"
          >
            Seat
          </a>
        </td>
      </tr>
    </>
  );
}

export default Reservations;
