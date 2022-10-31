import React from "react";
import { Link } from "react-router-dom";

function Tables({ tables = [] }) {
  const rows = tables.length ? (
    tables.map((table) => {
      return (
        <div className="form-group row" key={table.table_id}>
          <div className="col-sm-1">{table.table_id}</div>
          <div>{table.table_name}</div>
          <div>{table.capacity}</div>
          <div data-table-id-status={table.table_id}>{table.status}</div>
        </div>
      );
    })
  ) : (
    <div>No tables found</div>
  );
  return <div className="table">{rows}</div>;
}

export default Tables;
