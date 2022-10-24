import React, { useEffect, useState } from "react";
import { listReservations, cancelReservation, finishTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
//import DashboardDetails from "./DashboardDetails";
import Reservations from "./Reservations";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

//make a useEffect, inside make an api call(a fetch) to /reservations api, including the date variable in the query string as a template literal, console.log it out, use string methods to format it

function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  function onCancel(reservation_id) {
    cancelReservation(reservation_id)
      .then(loadDashboard)
      .catch(setReservationsError);
  }

  function onFinish(table_id, reservation_id) {
    finishTable(table_id, reservation_id).then(loadDashboard);
  }

  console.log("reservations on dashboard: ", reservations);
  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        {/* <h4 className="mb-0">Reservations for {date}</h4> */}
        <h4 className="mb-0">Reservations for {reservations}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <Reservations reservations={reservations} onCancel={onCancel} />
      {/* {JSON.stringify(reservations)}
      <DashboardDetails /> */}
    </main>
  );
}

export default Dashboard;
