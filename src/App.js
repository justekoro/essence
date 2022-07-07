import "./styles/App.scss";
import superagent from "superagent";
import { useState } from "react";
import { useEffect } from "react";
import DataTable from "react-data-table-component";
import Moment from "react-moment";
import SelectTypeSearch from "./components/SelectTypeSearch";
import InputSearch from "./components/InputSearch";
import SelectTypeFuel from "./components/SelectTypeFuel";
import SubmitButton from "./components/SubmitButton";
import ResultComponents from "./components/ResultComponents";

function App() {
  // state
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [typedData, setTypedData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchType, setSearchType] = useState("City");
  const [typedFuel, setTypedFuel] = useState("All");

  // fetch data from API
  useEffect(() => {
    superagent
      .get(
        "https://data.economie.gouv.fr/api/records/1.0/search/?rows=-1&start=0&fields=id,adresse,com_arm_name,prix_maj,prix_nom,prix_valeur,prix_id,reg_code,reg_name,dep_code,dep_name,cp,com_arm_code,pop,geom&dataset=prix-carburants-fichier-instantane-test-ods-copie&timezone=Europe%2FBerlin"
      )
      .then((response) => {
        if (!response.body.records || response.body.records.length === 0)
          return alert("Aucune donnée trouvée");
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
              data.filter((item) => {
                const str = `${item["fields"].com_arm_name}`;
                const normalizedSearchValue = normalize(searchValue);
                const normalizeStr = normalize(str);
                return normalizeStr === normalizedSearchValue;
              })
            )
          : setTypedData(
              data.filter((item) => {
                const str = `${item["fields"].com_arm_name}`;
                const normalizedSearchValue = normalize(searchValue);
                const normalizeStr = normalize(str);
                return (
                  normalizeStr === normalizedSearchValue &&
                  item["fields"].prix_nom === typedFuel
                );
              })
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
              data.filter((item) => {
                const str = `${item["fields"].dep_name}`;
                const normalizedSearchValue = normalize(searchValue);
                const normalizeStr = normalize(str);
                return normalizeStr === normalizedSearchValue;
              })
            )
          : setTypedData(
              data.filter((item) => {
                const str = `${item["fields"].dep_name}`;
                const normalizedSearchValue = normalize(searchValue);
                const normalizeStr = normalize(str);
                return (
                  normalizeStr === normalizedSearchValue &&
                  item["fields"].prix_nom === typedFuel
                );
              })
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
              data.filter((item) => {
                const str = `${item["fields"].com_arm_name}`;
                const normalizedSearchValue = normalize(searchValue);
                const normalizeStr = normalize(str);
                return normalizeStr === normalizedSearchValue;
              })
            )
          : setTypedData(
              data.filter((item) => {
                const str = `${item["fields"].com_arm_name}`;
                const normalizedSearchValue = normalize(searchValue);
                const normalizeStr = normalize(str);
                return (
                  normalizeStr === normalizedSearchValue &&
                  item["fields"].prix_nom === typedFuel
                );
              })
            );
        break;
    }
  };

  //normalize function
  const normalize = (str) => {
    return str.toLowerCase().replace(/\s/g, "");
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
              <SelectTypeSearch
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
              />
              {/* search */}
              <InputSearch
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
              />
              {/* type fuel input */}
              <SelectTypeFuel
                onChange={(e) => setTypedFuel(e.target.value)}
                value={typedFuel}
              />
            </div>
            {/* submit button */}
            <SubmitButton onClick={() => handleSubmit()} />
          </div>
          {/* Results */}
          <ResultComponents typedData={typedData} />
        </main>
      )}
    </div>
  );
}

export default App;
