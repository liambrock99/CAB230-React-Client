import React from "react";
import { Map, Popup, TileLayer, CircleMarker } from "react-leaflet";

export default function MapWrapper(props) {
  return (
    <Map
      center={[-25.73, 134.48]}
      zoom={4}
      style={{ height: "800px", width: "80%", margin: "50px auto" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {props.data.map(e => (
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
