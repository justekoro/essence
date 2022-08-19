import React from "react";
import Moment from "react-moment";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import DirectionsIcon from "@mui/icons-material/Directions";
import AlertDialog from "./DialogAdress";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import styles from "../styles/Result.module.css";
import { Box } from "@mui/material";
import { useGridApiContext } from "@mui/x-data-grid";
import { useGridSelector } from "@mui/x-data-grid";
import { styled } from "@mui/material";
import { Pagination } from "@mui/material";
import { PaginationItem } from "@mui/material";
import { gridPageCountSelector } from "@mui/x-data-grid";
import { gridPageSelector } from "@mui/x-data-grid";

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  "& .MuiDataGrid-renderingZone": {
    maxHeight: "none !important",
  },
  "& .MuiDataGrid-cell": {
    lineHeight: "unset !important",
    maxHeight: "none !important",
    whiteSpace: "normal",
  },
  "& .MuiDataGrid-row": {
    maxHeight: "none !important",
  },
}));

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      variant="outlined"
      shape="rounded"
      page={page + 1}
      count={pageCount}
      // @ts-expect-error
      renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

const ResultComponents = ({ data }) => {
  const columns = [
    {
      field: "valeur",
      headerName: "prix",
      editable: false,
      flex: 1,
      valueGetter: (params) => {
        return `${params.row.valeur}`;
      },
    },
    {
      field: "adresse",
      headerName: "adresse",
      editable: false,
      flex: 1,
      renderCell: (params) => {
        return (
          <div>
            <div className={styles.Result_mobile}>
              <AlertDialog
                adress={params.row.adresse}
                city={params.row.ville}
              />
            </div>
            <div className={styles.Result_Desktop}>
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
        <div className={styles.Not_Found_Container}>
          <ErrorOutlineIcon sx={{ color: "red", height: 40, width: 40 }} />
          <div className={styles.Not_Found_Text}>Aucune donnée trouvée.</div>
        </div>
      ) : (
        <div>
          {/* results */}
          <div>
            <Box sx={{ height: 400, width: "100%", marginTop: 4, marginBottom: 4 }}>
              <StyledDataGrid
                rows={data}
                columns={columns}
                pageSize={10}
                disableColumnSelector={true}
                disableColumnFilter={true}
                disableColumnMenu={true}
                disableExtendRowFullWidth={true}
                components={{ Pagination: CustomPagination }}
                sx={{ m: 2 }}
                getRowId={(row) => {
                  id++;
                  return id;
                }}
              />
            </Box>
          </div>
          {/* Update Date */}
          <div className={styles.Update_Container}>
            <div>Mis à jour le: </div>
            <Moment className={styles.moment} format="DD/MM/YYYY">
              {Date.now()}
            </Moment>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultComponents;
