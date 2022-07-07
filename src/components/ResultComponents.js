import React from "react";
import DataTable from "react-data-table-component";
import Moment from "react-moment";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const ResultComponents = ({ typedData }) => {
  const columns = [
    {
      name: "prix",
      selector: (row) => row["fields"].prix_valeur,
      sortable: true,
    },
    {
      name: "adresse",
      selector: (row) => row["fields"].adresse,
      sortable: true,
    },
    {
      name: "type",
      selector: (row) => row["fields"].prix_nom,
      sortable: true,
    },
  ];

  return (
    <div>
      {typedData.length === 0 ? (
        <div className="Not-found-Container">
          <ErrorOutlineIcon sx={{ color: "red", height: 40, width: 40 }} />
          <div className="Text">Aucune donnée trouver.</div>
        </div>
      ) : (
        <div>
          {/* results */}
          <div className="Results">
            <DataTable pagination columns={columns} data={typedData} />
          </div>
          {/* Update Date */}
          <div className="Update-Container">
            <div className="">mis à jour le: </div>
            <Moment className="moment" format="YYYY/MM/DD">
              {Date.now()}
            </Moment>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultComponents;
