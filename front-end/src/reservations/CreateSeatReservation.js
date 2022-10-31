import React, { useState } from "react";

function CreateSeatReservation({ tables }) {
  console.log("line 4 of create seat reservations:", tables);
  //iterate through the table_id so we can make options out of all the created tables
  //we need to call the tables and get its id, table_name, capacity

  const [isOccupied, setIsOccupied] = useState(false);

  //when checked isOccupied will be true, when unchecked it will be false
  const handleOnChange = () => {
    setIsOccupied(!isOccupied);
    //console.log(isOccupied);
  };
  console.log(isOccupied);

  //maybe need to make status to set in the handleOnchange

  let rows = tables.map((table) => {
    return (
      <option key={table.table_id} value={table.table_id}>
        {table.table_name} - {table.capacity}
      </option>
    );
  });

  //const [tables, setTables] = useState([]);

  return (
    <main>
      <div>Create a new seat reservation:</div>
      <form>
        <div className="form-row align-items-center">
          <div className="col-auto my-1">
            <label className="mr-sm-2 sr-only" htmlFor="inlineFormCustomSelect">
              Preference
            </label>
            <select
              className="custom-select mr-sm-2"
              id="inlineFormCustomSelect"
              name="table_id"
            >
              <option defaultValue={0}>Choose...</option>
              {/* {checked === isOccupied ? !rows : rows} */}
              {rows}
              {/* {isOccupied ? null : rows} */}
            </select>
          </div>

          <div className="col-auto my-1">
            <div className="custom-control custom-checkbox mr-sm-2">
              <input
                type="checkbox"
                className="custom-control-input"
                id="occupied"
                value="occupied"
                checked={isOccupied}
                onChange={handleOnChange}
              />
              <label className="custom-control-label" htmlFor="occupied">
                Occupied
              </label>
            </div>
          </div>

          <div className="col-auto my-1">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}

export default CreateSeatReservation;
