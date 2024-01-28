import { useEffect, useState } from "react";

type Response = {
    results: Result[]
}

type Result = {
    id: string
    prix: number
    adresse: string
}

export function useQuery(cp: string, fuel: string) {
    const [data, setData] = useState<Result[] | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        // to get only fuel price on request
        const fuelName = fuel.toLowerCase();
        const encodedUri = encodeURI(`https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/prix-des-carburants-en-france-flux-instantane-v2/records?select=adresse,${fuelName}_prix AS prix,id&where=cp like "${cp}" and carburants_disponibles in ("${fuel}")&limit=-1`)
        setIsLoading(true);
        fetch(encodedUri)
            .then((r) => {
                if (!r.ok) throw new Error(r.statusText);
                return r.json()
            })
            .then((data: Response) => {
                const sortedData = data.results.sort((a, b) => a.prix - b.prix);
                setData(sortedData);
            })
            .catch(e => setError(e))
            .finally(() => setIsLoading(false));
    }, [cp, fuel]);

    return { data, error, isLoading };
}