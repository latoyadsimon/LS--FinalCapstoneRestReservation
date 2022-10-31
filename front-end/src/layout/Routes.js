import React, { useEffect, useState } from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import CreateReservation from "../reservations/CreateReservation";
import Reservations from "../dashboard/Reservations";
import CreateTable from "../tables/CreateTable";
import CreateSeatReservation from "../reservations/CreateSeatReservation";
import CreateSeatTable from "../tables/CreateSeatTable";

import useQuery from "../utils/useQuery";
import { listTables } from "../utils/api";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  const query = useQuery();
  const date = query.get("date");

  //try to refactor later and put it in the component that uses it instead of having it here.
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  console.log("Routes line 25:", tables);

  useEffect(() => {
    const abortController = new AbortController();

    listTables(abortController.signal).then(setTables).catch(setTablesError);

    return () => abortController.abort();
  }, []);

  console.log(date);
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations/new">
        <CreateReservation />
      </Route>
      <Route exact={true} path="/reservations/:reservation_id/seat">
        <CreateSeatReservation tables={tables} />
      </Route>

      <Route exact={true} path="/tables">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/tables/new">
        <CreateTable />
      </Route>

      <Route exact={true} path="/tables/:table_id/seat">
        <CreateSeatTable />
      </Route>

      <Route exact={true} path="/dashboard">
        <Dashboard date={date || today()} />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
