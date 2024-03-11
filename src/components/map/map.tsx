import { useMap } from "../hooks/use-map";
import { useEffect, useRef, FC } from "react";
import leaflet from 'leaflet';

import 'leaflet/dist/leaflet.css';
import { Offer } from '../../types/offer';
import { CityName } from '../../types/city-name';
import { URL_MARKER_DEFAULT, URL_MARKER_ACTIVE } from '../const/const';

type TMapProps = {
  city: CityName;
  offers: Offer[];
  activeOfferId?: string | null;
};

const defaultMarkerIcon = leaflet.icon({
  iconUrl: URL_MARKER_DEFAULT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
})

const activeMarkerIcon = leaflet.icon({
  iconUrl: URL_MARKER_ACTIVE,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
})

export const Map: FC<TMapProps> = ({city, offers, activeOfferId}: TMapProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const map = useMap({location: city.location, containerRef: mapContainerRef});

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        leaflet
          .marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          }, {
            icon: offer.id === activeOfferId ? activeMarkerIcon : defaultMarkerIcon,
          })
          .addTo(map);
      });
    }
  }, [activeOfferId, map, offers]);

  return <section className="cities__map map" ref={mapContainerRef} />;
}
