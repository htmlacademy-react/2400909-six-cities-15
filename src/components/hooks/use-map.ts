import { useEffect, useRef, useState } from 'react';
import leaflet, { Map as LeafletMap } from 'leaflet';
import { RefObject } from 'react';

type TUseMapProps = {
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  containerRef: RefObject<HTMLElement | null>;
}

const TILE_LAYER_URL_PATTERN =
  'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const TILE_LAYER_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

export const useMap = ({location, containerRef}: TUseMapProps): Map | null => {
  const [map, setMap] = useState<LeafletMap | null>(null);
  const isRenderedRef = useRef(false);

  useEffect(() : void => {
    if (containerRef.current !== null && !isRenderedRef.current) {
      const instance = leaflet.map(containerRef.current, {
        center: {
          lat: location.latitude,
          lng: location.longitude,
        },
        zoom: location.zoom,
      });

      leaflet
        .tileLayer(TILE_LAYER_URL_PATTERN, {
          attribution: TILE_LAYER_ATTRIBUTION,
        })
        .addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [containerRef, location]);

  return map;
};


