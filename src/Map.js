import React from "react";
import { Map, Popup, TileLayer, CircleMarker } from "react-leaflet";

export default function MapWrapper(props) {
  return (
    <Map
      center={props.center}
      zoom={props.zoom}
      style={props.style}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {props.data
        .filter(e => e.lat !== null && e.lng !== null) // remove any entries with null lat/lngs that would break the app
        .map(e => (
          <CircleMarker
            key={e.LGA}
            center={[e.lat, e.lng]}
            radius={e.total * 0.001}
          >
            <Popup>
              {e.LGA}
              <br />
              Total: {e.total}
            </Popup>
          </CircleMarker>
        ))}
    </Map>
  );
}
