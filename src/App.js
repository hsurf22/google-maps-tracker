import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px',
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

function trackData() {
  const kmlUrl = 'https://raw.githubusercontent.com/hsurf22/kml-data/main/hike.kml';
  return kmlUrl;
}

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDKE2FtzKdCDViDtVQ5NOzNvVq73G-hjuM',
  });

  /* eslint-disable no-unused-vars */
  const [theMap, setMap] = React.useState(null);
  /* eslint-enable no-unused-vars */

  const onLoad = React.useCallback(async (map) => {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);

    /* eslint-disable no-unused-vars */
    const track = new window.google.maps.KmlLayer({
      url: trackData(),
      map,
    });
    /* eslint-enable no-unused-vars */

    const image = {
      url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
      // This marker is 20 pixels wide by 32 pixels high.
      size: new window.google.maps.Size(20, 32),
      // The origin for this image is (0, 0).
      origin: new window.google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor: new window.google.maps.Point(0, 32),
    };

    const uluru = { lng: -118.47898337, lat: 34.72801251 };

    /* eslint-disable no-unused-vars */
    const marker = new window.google.maps.Marker({
      icon: image,
      position: uluru,
      map,
      title: 'End!',
    });
    /* eslint-enable no-unused-vars */
  }, []);

  /* eslint-disable no-unused-vars */
  const onUnmount = React.useCallback((map) => {
    setMap(null);
  }, []);
  /* eslint-enable no-unused-vars */

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      { /* Child components, such as markers, info windows, etc. */ }

    </GoogleMap>
  ) : (<div>Google maps is loading...</div>);
}

export default MyComponent;
