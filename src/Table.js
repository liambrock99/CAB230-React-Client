import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

export function Table(props) {

    const columns = [
        {
          Header: "Area",
          accessor: "LGA"
        },
        {
          Header: "Total",
          accessor: "total"
        }
    ];

    return (
        <ReactTable 
          data={props.data} 
          columns={columns}
        />
    )
}

