import { useMap } from '../hooks/use-map';
import { useEffect, useRef, FC } from 'react';
import leaflet, { Map as LeafletMap } from 'leaflet';

import 'leaflet/dist/leaflet.css';
import { Offer } from '../../types/offer';
import { URL_MARKER_DEFAULT, URL_MARKER_ACTIVE } from '../const/const';
import { ExtendedOffer } from '../../types/extended-offer';

type TMapProps = {
  className: string;
  offers: (Offer | ExtendedOffer)[];
  activeOfferId?: string | null;
};

const defaultMarkerIcon = leaflet.icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [28, 40],
  iconAnchor: [14, 40],
});

const activeMarkerIcon = leaflet.icon({
  iconUrl: URL_MARKER_ACTIVE,
  iconSize: [28, 40],
  iconAnchor: [14, 40],
});

export const Map: FC<TMapProps> = ({className, offers, activeOfferId}: TMapProps) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const {city} = offers[0];
  const map: LeafletMap | null = useMap({location: city.location, containerRef: mapContainerRef});

  useEffect(() => {
    if (map) {
      map.panTo({
        lat: city.location.latitude,
        lng: city.location.longitude,
      });
    }
  }, [city, map]);

  useEffect(() => {
    const markerLayer = leaflet.layerGroup();

    if (map) {
      offers.forEach((offer) => {
        leaflet
          .marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          }, {
            icon: offer.id === activeOfferId ? activeMarkerIcon : defaultMarkerIcon,
          })
          .addTo(markerLayer);
      });
      markerLayer.addTo(map);

      return () => {
        map.removeLayer(markerLayer);
      }
    }
  }, [activeOfferId, map, offers]);

  return <section className={`${className}__map map`} ref={mapContainerRef} />;
};
