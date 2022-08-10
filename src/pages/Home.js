import "../styles/App.scss";
import superagent from "superagent";
import { useState, useCallback } from "react";
import { useEffect } from "react";
import InputSearch from "../components/InputSearch";
import SelectTypeFuel from "../components/SelectTypeFuel";
import SubmitButton from "../components/SubmitButton";
import { Button } from "@mui/material";
import ResultComponents from "../components/ResultComponents";
import GeolocationButton from "../components/GeolocationButton";
import ThemeSwitch from "../components/ThemeSwitch";
import { Typography } from "@mui/material";

function Home() {
  // state
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [typedData, setTypedData] = useState([]);
  const [searchValue, setSearchValue] = useState("paris");
  const [typedFuel, setTypedFuel] = useState("Gazole");
  const [isError, setIsError] = useState(false);
  const [cityList, setCityList] = useState([]);

  // filter data & submit function
  const handleSubmit = useCallback(() => {
    if (searchValue === "") return;
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
    const res = result.sort(function compare(a, b) {
      if (a.valeur < b.valeur) return -1;
      if (a.valeur > b.valeur) return 1;
      // a doit être égal à b
      return 0;
    });
    setTypedData(res);
  }, [searchValue, data, typedFuel]);

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

  useEffect(() => {
    handleSubmit();
    return () => {
      // clean up
    };
  }, [searchValue, typedFuel, handleSubmit]);

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
                <ThemeSwitch/>
                <Typography className="Title" variant="h1">⛽ Essence tracker</Typography>
              </div>
              {/* All Inputs */}
              <div className="Inputs-Container">
                <div className="Group-Container">
                  {/* géolocalisation */}
                  <GeolocationButton
                    onClick={(value) => {
                      setSearchValue(value);
                    }}
                  />
                  {/* search */}
                  <InputSearch
                    value={searchValue}
                    cityList={cityList}
                    onChange={(event, value) => {
                      setSearchValue(value);
                      // handle automately re-render result and change search
                    }}
                  />
                  {/* type fuel input */}
                  <SelectTypeFuel
                    value={typedFuel}
                    onChange={async (e) => {
                      setTypedFuel(e.target.value);
                      // handle automately re-render result and change type fuel
                    }}
                  />
                </div>
                {/* submit button */}
                <SubmitButton onClick={() => handleSubmit()} />
              </div>
              {/* Results */}
              <ResultComponents data={typedData} />
            </div>
          )}
        </main>
      )}
    </div>
  );
}

export default Home;
