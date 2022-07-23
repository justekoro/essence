import React from "react";
import DataTable from "react-data-table-component";
import Moment from "react-moment";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import AlertDialog from "./DialogAdress";
import "../styles/App.scss";

const ResultComponents = ({ data }) => {
  const customStyles = {
    headRow: {
      style: {
        border: "none",
      },
    },
    headCells: {
      style: {
        color: "#202124",
        fontSize: "14px",
      },
    },
    rows: {
      style: {
        overflow: "visible",
      },
      highlightOnHoverStyle: {
        backgroundColor: "rgb(230, 244, 244)",
        borderBottomColor: "#FFFFFF",
        borderRadius: "25px",
        outline: "1px solid #FFFFFF",
      },
    },
    pagination: {
      style: {
        border: "none",
      },
    },
  };

  const columns = [
    {
      name: "Prix",
      selector: (row) => {
        return row.valeur;
      },
      sortable: true,
    },
    {
      name: "Adresse",
      selector: (row) => {
        return <div className="Adress-Container">
          <div className="mobile"><AlertDialog adress={row.adresse} city={row.ville}/></div>
          <div className="desktop">{row.adresse}</div>
        </div>
      },
      sortable: true,
    },
  ];

  return (
    <div>
      {data.length === 0 ? (
        <div className="Not-found-Container">
          <ErrorOutlineIcon sx={{ color: "red", height: 40, width: 40 }} />
          <div className="Text">Aucune donnée trouvée.</div>
        </div>
      ) : (
        <div>
          {/* results */}
          <div className="Results">
            <DataTable
              pagination
              columns={columns}
              data={data}
              customStyles={customStyles}
              highlightOnHover
              pointerOnHover
            />
          </div>
          {/* Update Date */}
          <div className="Update-Container">
            <div className="">Mis à jour le: </div>
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
