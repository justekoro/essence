import React from "react";
import DataTable from "react-data-table-component";
import Moment from "react-moment";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const ResultComponents = ({ data }) => {

  const columns = [
    {
      name: "prix",
      selector: (row) => {
        return row.valeur;
      },
      sortable: true,
    },
    {
      name: "adresse",
      selector: (row) => {
        return row.adresse;
      },
      sortable: true,
    },
    {
      name: "type",
      selector: (row) => {
        return row.nom;
      },
      sortable: true,
    },
  ];

  return (
    <div>
      {data.length === 0 ? (
        <div className="Not-found-Container">
          <ErrorOutlineIcon sx={{ color: "red", height: 40, width: 40 }} />
          <div className="Text">Aucune donnée trouver.</div>
        </div>
      ) : (
        <div>
          {/* results */}
          <div className="Results">
            <DataTable pagination columns={columns} data={data} />
          </div>
          {/* Update Date */}
          <div className="Update-Container">
            <div className="">mis à jour le: </div>
            <Moment className="moment" format="DD/MM/YYYY">
              {Date.now()}
            </Moment>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultComponents;