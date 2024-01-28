import React from "react";
import { Button } from "./ui/button";
import { LocateIcon } from "lucide-react"

interface GeolocationButtonI {
  onPostalCodeFound: (code: string) => void;
}

interface ResponseI {
  center: number[];
  features: {
    properties: {
      city: string;
      citycode: string;
      context: string;
      postcode: string;
    }
  }[]
}

const GeolocationButton = ({ onPostalCodeFound }: GeolocationButtonI) => {
  const Submit = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    };

    async function success(pos: GeolocationPosition) {
      const crd = pos.coords;

      console.log(`précision : ${crd.accuracy}`);
      const res = await fetch(`https://api-adresse.data.gouv.fr/reverse/?lon=${crd.longitude}&lat=${crd.latitude}&type=street`)
      const data: ResponseI = await res.json();
      if (data.features[0].properties.postcode) {
        onPostalCodeFound(data.features[0].properties.postcode);
      }
    }

    function error(err: GeolocationPositionError) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  return (
    <div>
      <Button
        onClick={Submit}
      >
        <LocateIcon />
      </Button>
    </div>
  );
};

export default GeolocationButton;
