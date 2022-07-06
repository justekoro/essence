import "./styles/App.scss";
import superagent from "superagent";
import { useState } from "react";
import { useEffect } from "react";
import DataTable from "react-data-table-component";
import Moment from "react-moment";

function App() {
  // state
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [typedData, setTypedData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchType, setSearchType] = useState("City");
  const [typedFuel, setTypedFuel] = useState("All");

  // variables
  const columns = [
    {
      name: "Id",
      selector: (row) => row["fields"].id,
      sortable: true,
    },
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

  // fetch data from API
  useEffect(() => {
    superagent
      .get(
        "https://data.economie.gouv.fr/api/records/1.0/search/?rows=-1&start=0&fields=id,adresse,com_arm_name,prix_maj,prix_nom,prix_valeur,prix_id,reg_code,reg_name,dep_code,dep_name,cp,com_arm_code,pop,geom&dataset=prix-carburants-fichier-instantane-test-ods-copie&timezone=Europe%2FBerlin"
      )
      .then((response) => {
        setData(response.body.records);
        console.log(response.body.records);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        alert("Erreur lors de la récupération des données");
      });
  }, []);

  // filter data & submit function
  const handleSubmit = (e) => {
    switch (searchType) {
      case "City":
        typedFuel === "All"
          ? setTypedData(
              data.filter((item) => item["fields"].com_arm_name === searchValue)
            )
          : setTypedData(
              data.filter(
                (item) =>
                  item["fields"].com_arm_name === searchValue &&
                  item["fields"].prix_nom === typedFuel
              )
            );
        break;

      case "Postal-Code":
        typedFuel === "All"
          ? setTypedData(
              data.filter((item) => item["fields"].cp === searchValue)
            )
          : setTypedData(
              data.filter(
                (item) =>
                  item["fields"].cp === searchValue &&
                  item["fields"].prix_nom === typedFuel
              )
            );
        break;

      case "Dep":
        typedFuel === "All"
          ? setTypedData(
              data.filter((item) => item["fields"].dep_name === searchValue)
            )
          : setTypedData(
              data.filter(
                (item) =>
                  item["fields"].dep_name === searchValue &&
                  item["fields"].prix_nom === typedFuel
              )
            );
        break;

      case "Dep-Code":
        typedFuel === "All"
          ? setTypedData(
              data.filter((item) => item["fields"].dep_code === searchValue)
            )
          : setTypedData(
              data.filter(
                (item) =>
                  item["fields"].dep_code === searchValue &&
                  item["fields"].prix_nom === typedFuel
              )
            );
        break;

      default:
        typedFuel === "All"
          ? setTypedData(
              data.filter((item) => item["fields"].com_arm_name === searchValue)
            )
          : setTypedData(
              data.filter(
                (item) =>
                  item["fields"].com_arm_name === searchValue &&
                  item["fields"].prix_nom === typedFuel
              )
            );
        break;
    }
  };

  return (
    <div>
      {isLoading ? (
        <div className="Loading-Container">
          <svg className="loading" id="loading" viewBox="0 0 50 50">
            <circle
              className="path"
              cx="25"
              cy="25"
              r="20"
              fill="none"
              strokeWidth="5"
            ></circle>
          </svg>
        </div>
      ) : (
        <main>
          {/* Title */}
          <div className="Title-Container">
            <h1 className="Title">⛽ essence tracker</h1>
          </div>
          {/* All Inputs */}
          <div className="Inputs-Container">
            <div className="Group-Container">
              {/* type of search */}
              <select
                className="Input-Type-Search"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
              >
                <option disabled>Type de recherche</option>
                <option value={"City"}>Vile</option>
                <option value={"Postal-Code"}>Code Postal</option>
                <option value={"Dep"}>Département</option>
                <option value={"Dep-Code"}>Code Département</option>
              </select>
              {/* search */}
              <input
                className="Input-Search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              {/* type fuel input */}
              <select
                className="Input-Type-Fuel"
                value={typedFuel}
                onChange={(e) => setTypedFuel(e.target.value)}
              >
                <option value={"All"}>Tout</option>
                <option value={"Gazole"}>Gazole</option>
                <option value={"E85"}>E85</option>
                <option value={"E10"}>E10</option>
                <option value={"SP98"}>SP98</option>
                <option value={"SP95"}>SP95</option>
                <option value={"GPLc"}>GPLc</option>
              </select>
            </div>
            {/* submit button */}
            <button className="Input-Submit" onClick={() => handleSubmit()}>
              Envoyer
            </button>
          </div>
          {typedData.length === 0 ? (
            <div className="Not-found-Container">
              <div className="Text">
                Aucune donnée trouver
                <br />
                Veuillez bien vérifier la recherche entrer
                <br />
                n'oublier pas les majuscules et les accents
                <br />
                Ex: Saint-Priest ≠ saint-priest
              </div>
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
        </main>
      )}
    </div>
  );
}

export default App;
