import { useMap } from '../hooks/use-map';
import { useEffect, useRef, FC } from 'react';
import leaflet, { LayerGroup, Map as LeafletMap } from 'leaflet';

import 'leaflet/dist/leaflet.css';
import { Offer } from '../../types/offer';
import { URL_MARKER_DEFAULT, URL_MARKER_ACTIVE } from '../const/const';
import { ExtendedOffer } from '../../types/extended-offer';
import { useAppSelector } from '../hooks/store';
import { offersSelectors } from '../../store/slices/offers';

type TMapProps = {
  className: string;
  offers: (Offer | ExtendedOffer)[];
  //activeOfferId?: string | null;
};

const defaultMarkerIcon = leaflet.icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const activeMarkerIcon = leaflet.icon({
  iconUrl: URL_MARKER_ACTIVE,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export const Map: FC<TMapProps> = ({className, offers}: TMapProps) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const activeId = useAppSelector(offersSelectors.activeId);
  const {city} = offers[0];
  const map: LeafletMap | null = useMap({location: city.location, containerRef: mapContainerRef});
  const markerLayer = useRef<LayerGroup>(leaflet.layerGroup());

  useEffect(() => {
    if (map) {
      //map.setView([city.location.latitude, city.location.longitude], city.location.zoom);
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
            icon: offer.id === activeId ? activeMarkerIcon : defaultMarkerIcon,
          })
          .addTo(markerLayer.current);
      });
      markerLayer.current.addTo(map);
    }
  }, [activeId, map, offers]);

  return <section className={`map ${className}`} ref={mapContainerRef} />;
};
