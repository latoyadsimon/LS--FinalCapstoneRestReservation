import React from "react";
// import { useHistory } from "react-router-dom";
// import { createReservation } from "../utils/api";
// import ErrorAlert from "../layout/ErrorAlert";
import FormReservation from "./FormReservation";

function CreateReservation() {
  // const history = useHistory();

  // const [reservation, setReservation] = useState({
  //   first_name: "",
  //   last_name: "",
  //   mobile_number: "",
  //   reservation_date: "",
  //   reservation_time: "",
  //   people: "",
  // });

  // const [error, setError] = useState(null);

  // function cancelHandler() {
  //   history.push("/");
  // }

  // function submitHandler(event) {
  //   event.preventDefault();
  //   createReservation(reservation)
  //     .then(() => {
  //       history.push("/");
  //     })
  //     .catch(setError);
  // }
  // //37.5 startercode
  // function changeHandler({ target: { name, value } }) {
  //   setReservation((previousReservation) => ({
  //     ...previousReservation,
  //     [name]: value,
  //   }));
  // }

  return (
    <main>
      <h1> Create a New Reservation </h1>
      <FormReservation />
    </main>
  );
}

export default CreateReservation;
