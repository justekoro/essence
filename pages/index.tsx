import { useState } from "react";
import SelectTypeFuel from "@/components/SelectTypeFuel";
import ResultComponents from "@/components/ResultComponents";
import ThemeSwitch from "@/components/ThemeSwitch";
import GeolocationButton from "@/components/GeolocationButton"
import { useQuery } from "@/hooks/useQuery";
import { useDebounce } from "@uidotdev/usehooks";
import { Input } from "@/components/ui/input";
import { InfoIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";

function Home() {
  // state
  const [searchValue, setSearchValue] = useState("69800");
  const debouncedSearchValue = useDebounce(searchValue, 300);
  const [typedFuel, setTypedFuel] = useState("Gazole");
  const { data, error, isLoading } = useQuery(debouncedSearchValue, typedFuel);

  return (
    <main className="flex flex-col items-center">
      {/* Title */}
      <ThemeSwitch className="my-2" />
      <h1 className="text-4xl md:text-6xl text-center font-bold my-2">⛽ Essence tracker</h1>
      {/* All Inputs */}
      <div className="flex flex-col items-center my-2 gap-2 md:flex-row">
        {/* Geolocation */}
        <GeolocationButton
          onPostCodeFound={(postalcode) => setSearchValue(postalcode)}
        />
        {/* search */}
        <Label htmlFor="postCode" className="sr-only">Entrer un code postal</Label>
        <Input
          value={searchValue}
          type="number"
          id="postCode"
          placeholder="Entrer un code postal"
          onChange={(e) => setSearchValue(e.currentTarget.value)}
        />
        {/* type fuel input */}
        <SelectTypeFuel
          value={typedFuel}
          onChange={(value) =>
            setTypedFuel(value)
          }
        />
      </div>
      {isLoading ?
        <Skeleton className="w-10/12 h-52" /> :
        error ? (
          <><InfoIcon /><p className="text-center">Une erreur est survenue, veuillez réessayer plus tard.</p></>
        ) :
          <ResultComponents data={data} />}
    </main>
  )
}

export default Home;
