import React from "react";
import Moment from "react-moment";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import DirectionsIcon from "@mui/icons-material/Directions";
import AlertDialog from "./DialogAdress";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import "../styles/App.scss";
import { Box } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";

const ResultComponents = ({ data }) => {
  const customTheme = createTheme({
    components: {
      MuiTable: {
        styleOverrides: { root: {
          
        } },
      },
    },
  });

  const columns = [
    {
      field: "valeur",
      headerName: "prix",
      editable: false,
      valueGetter: (params) => {
        return `${params.row.valeur}`;
      },
    },
    {
      field: "adresse",
      headerName: "Last name",
      editable: false,
      renderCell: (params) => {
        return (
          <div className="Adress-Container">
            <div className="mobile">
              <AlertDialog
                adress={params.row.adresse}
                city={params.row.ville}
              />
            </div>
            <div className="desktop">
              {params.row.adresse}
              <Button
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps?q=${params.row.adresse} - ${params.row.ville}`
                  )
                }
              >
                <DirectionsIcon />
              </Button>
            </div>
          </div>
        );
      },
    },
  ];

  let id = 0;

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
            {/* <DataTable
              pagination
              columns={columns}
              data={data}
              customStyles={customStyles}
              highlightOnHover
              pointerOnHover
            /> */}
            {/* <ThemeProvider theme={customTheme}> */}
              <Box sx={{ height: 400, width: "100%", marginTop: 4 }}>
                <DataGrid
                  rows={data}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  disableSelectionOnClick
                  disableColumnSelector
                  editMode={false}
                  autoHeight={true}
                  sx={{ m: 2 }}
                  getRowId={(row) => {
                    id++;
                    return id;
                  }}
                />
              </Box>
            {/* </ThemeProvider> */}
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
