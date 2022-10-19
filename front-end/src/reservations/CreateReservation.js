import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function CreateReservation() {
  const history = useHistory();

  const [reservation, setReservation] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  });

  const [error, setError] = useState(null);

  function cancelHandler() {
    history.push("/");
  }

  function submitHandler(event) {
    event.preventDefault();
    createReservation(reservation)
      .then(() => {
        history.push("/");
      })
      .catch(setError);
  }
  //37.5 startercode
  function changeHandler({ target: { name, value } }) {
    setReservation((previousReservation) => ({
      ...previousReservation,
      [name]: value,
    }));
  }

  return (
    <main>
      <h1>Create Reservation</h1>
      <ErrorAlert error={error} />
      <form onSubmit={submitHandler}>
        <p>we look forward to your arrival</p>
        <div>
          <div>
            <label className="form-label" htmlFor="first_name">
              First Name
            </label>
            <input
              className="form-control"
              id="first_name"
              name="first_name"
              type="text"
              value={reservation.first_name}
              onChange={changeHandler}
              required={true}
            />
            <small className="form-text text-muted">
              Enter your first name
            </small>
          </div>

          <div>
            <label className="form-label" htmlFor="last_name">
              Last Name
            </label>
            <input
              className="form-control"
              id="last_name"
              name="last_name"
              type="text"
              value={reservation.last_name}
              onChange={changeHandler}
              required={true}
            />
            <small className="form-text text-muted">Enter your last name</small>
          </div>
        </div>

        <div>
          <label className="form-label" htmlFor="mobile_number">
            Mobile Number
          </label>
          <input
            className="form-control"
            id="mobile_number"
            name="mobile_number"
            type="text"
            value={reservation.mobile_number}
            onChange={changeHandler}
            required={true}
          />
          <small className="form-text text-muted">
            Enter your mobile number
          </small>
        </div>

        <div>
          <label className="form-label" htmlFor="reservation_date">
            Date of Reservation
          </label>
          <input
            className="form-control"
            id="reservation_date"
            name="reservation_date"
            type="date"
            value={reservation.reservation_date}
            onChange={changeHandler}
            required={true}
          />
          <small className="form-text text-muted">Pick a Date</small>
        </div>

        <div>
          <label className="form-label" htmlFor="reservation_time">
            Reservation Time
          </label>
          <input
            className="form-control"
            id="reservation_time"
            name="reservation_time"
            type="time"
            value={reservation.reservation_time}
            onChange={changeHandler}
            required={true}
          />
          <small className="form-text text-muted">
            At what time can we expect you to be joining us?
          </small>
        </div>

        <div>
          <button
            type="button"
            className="btn btn-secondary mr-2"
            onClick={cancelHandler}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </main>
  );
}

export default CreateReservation;
