import React from "react";
import { Button } from "./ui/button";
import { LocateIcon } from "lucide-react"

interface GeolocationButtonI {
  onPostCodeFound: (code: string) => void;
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

const GeolocationButton = ({ onPostCodeFound }: GeolocationButtonI) => {
  const Submit = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    };

    async function success(pos: GeolocationPosition) {
      const crd = pos.coords;

      // fetch reverse geocoding to get postcode
      const res = await fetch(`https://api-adresse.data.gouv.fr/reverse/?lon=${crd.longitude}&lat=${crd.latitude}&type=street`)
      const data: ResponseI = await res.json();
      // if postcode was found, run function passed as props
      if (data.features[0].properties.postcode) {
        onPostCodeFound(data.features[0].properties.postcode);
      }
    }

    function error(err: GeolocationPositionError) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    // get postion of user
    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  return (
    <Button
      title="Me géolocaliser"
      onClick={Submit}
    >
      <LocateIcon />
    </Button>
  );
};

export default GeolocationButton;
