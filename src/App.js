import "./styles/App.scss";
import superagent from "superagent";
import { useState } from "react";
import { useEffect } from "react";
import InputSearch from "./components/InputSearch";
import SelectTypeFuel from "./components/SelectTypeFuel";
import SubmitButton from "./components/SubmitButton";
import { Button } from "@mui/material";
import ResultComponents from "./components/ResultComponents";

function App() {
  // state
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [typedData, setTypedData] = useState([]);
  const [searchValue, setSearchValue] = useState("paris");
  const [typedFuel, setTypedFuel] = useState("Gazole");
  const [isError, setIsError] = useState(false);
  const [cityList, setCityList] = useState([]);

  // fetch data from API
  useEffect(() => {
    async function fetchData() {
      try {
        await superagent
          .get(`${process.env.REACT_APP_URL_API}/api`)
          .then((response) => {
            if (!response.body || response.body.length === 0)
              return setIsError(true);
            setData(response.body.result);
            setCityList(response.body.listCityName);
            setIsLoading(false);
          });
      } catch (error) {
        setIsError(true);
        console.log(`error: ${error}`);
      }
    }

    fetchData();
  }, []);

  // filter data & submit function
  const handleSubmit = () => {
    // filter data
    const filtered = data.filter(
      (item) => item.ville === searchValue && item[`${typedFuel}`]
    );
    // reforming data for table result
    let result = [];
    for (let element of filtered) {
      const Res = {
        ville: element.ville,
        adresse: element.adresse,
        nom: element[`${typedFuel}`].nom,
        valeur: element[`${typedFuel}`].valeur,
      };

      result.push(Res);
    }
    setTypedData(result);
  };

  return (
    <div>
      {/* loading component */}
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
          {isError ? (
            <div className="Error-Container">
              <div id="alert">Une erreur est survenue !</div>
              <div>Veuillez réessayer plus tard.</div>
              <Button
                sx={{ marginTop: 1 }}
                variant="contained"
                onClick={() => window.location.reload()}
              >
                recharger la page
              </Button>
            </div>
          ) : (
            <div>
              {/* Title */}
              <div className="Title-Container">
                <h1 className="Title">⛽ essence tracker</h1>
              </div>
              {/* All Inputs */}
              <div className="Inputs-Container">
                <div className="Group-Container">
                  {/* search */}
                  <InputSearch
                    value={searchValue}
                    cityList={cityList}
                    onChange={(event, value) => setSearchValue(value)}
                  />
                  {/* type fuel input */}
                  <SelectTypeFuel
                    value={typedFuel}
                    onChange={(e) => {
                      setTypedFuel(e.target.value);
                    }}
                  />
                </div>
                {/* submit button */}
                <SubmitButton onClick={() => handleSubmit()} />
              </div>
              {/* Results */}
              <ResultComponents data={typedData}/>
            </div>
          )}
        </main>
      )}
    </div>
  );
}

export default App;
