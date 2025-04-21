'use client';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
import { useEffect, useRef, useState } from 'react';

const mockProperties = [
  { id: 1, title: 'Flat in London', lat: 51.505, lng: -0.09 },
  { id: 2, title: 'House in York', lat: 53.96, lng: -1.08 },
  { id: 3, title: 'Apartment in Bristol', lat: 51.45, lng: -2.59 },
];

function DrawControl({ onDraw }) {
  const map = useMap();
  const drawControlRef = useRef();

  useEffect(() => {
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    const drawControl = new L.Control.Draw({
      draw: {
        polygon: true,
        rectangle: true,
        circle: false,
        marker: false,
        polyline: false,
        circlemarker: false,
      },
      edit: {
        featureGroup: drawnItems,
      },
    });

    drawControlRef.current = drawControl;
    map.addControl(drawControl);

    map.on(L.Draw.Event.CREATED, (e) => {
      drawnItems.clearLayers(); // Allow only one shape at a time
      const layer = e.layer;
      drawnItems.addLayer(layer);
      const shape = layer.toGeoJSON();
      onDraw(shape);
    });

    return () => {
      map.removeControl(drawControl);
    };
  }, [map, onDraw]);

  return null;
}

export default function MapWithDraw() {
  const [visibleProps, setVisibleProps] = useState(mockProperties);

  const handleDraw = (shapeGeoJSON) => {
    const drawnPolygon = shapeGeoJSON.geometry;

    const inside = mockProperties.filter((prop) => {
      const pt = [prop.lng, prop.lat]; // GeoJSON is [lng, lat]
      return L.geoJSON(drawnPolygon).getBounds().contains(L.latLng(pt[1], pt[0]));
    });

    setVisibleProps(inside);
  };

  return (
    <MapContainer center={[51.505, -0.09]} zoom={6} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <DrawControl onDraw={handleDraw} />

      {visibleProps.map((prop) => (
        <Marker key={prop.id} position={[prop.lat, prop.lng]}>
          <Popup>
            <strong>{prop.title}</strong>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
