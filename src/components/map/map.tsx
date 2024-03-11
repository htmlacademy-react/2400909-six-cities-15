import { useMap } from "../hooks/use-map";
import { useEffect, useRef, FC } from "react";
import leaflet, { LayerGroup } from 'leaflet';

import 'leaflet/dist/leaflet.css';
import { Offer, City } from '../../types/offer';
import { URL_MARKER_DEFAULT, URL_MARKER_ACTIVE } from '../const/const';

type TMapProps = {
  city: City;
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
  const markerLayer = useRef<LayerGroup>(leaflet.layerGroup());

  useEffect(() => {
    if (map) {
      map.setView([city.location.latitude, city.location.longitude], city.location.zoom);
      // markerLayer.current.addTo(map);
      // markerLayer.current.clearLayers();
    }
  }, [city, map]);

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
          .addTo(markerLayer.current);
      });
    }
  }, [activeOfferId, map, offers]);

  return <section className="cities__map map" ref={mapContainerRef} />;
}
