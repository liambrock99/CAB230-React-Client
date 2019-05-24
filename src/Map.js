import React from "react";
import HeatmapLayer from "react-leaflet-heatmap-layer";
import {
  Map,
  Popup,
  TileLayer,
  Marker,
  LayersControl,
  FeatureGroup
} from "react-leaflet";

export default function MapWrapper(props) {
  return (
    <Map center={props.center} zoom={props.zoom} style={props.style}>
      <LayersControl>
        <LayersControl.BaseLayer name="Base" checked>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        </LayersControl.BaseLayer>
        <LayersControl.Overlay name="Heatmap" checked>
          <FeatureGroup color="Blue">
            <HeatmapLayer
              points={props.data}
              longitudeExtractor={e => e.lng}
              latitudeExtractor={e => e.lat}
              intensityExtractor={e => (e.total )}
            />
          </FeatureGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Markers">
          <FeatureGroup>
            {props.data
              .filter(e => e.lat !== null && e.lng !== null) // remove any entries with null lat/lngs that would break the app
              .map(e => (
                <Marker key={e.LGA} position={[e.lat, e.lng]}>
                  <Popup>
                    {e.LGA}
                    <br />
                    Total: {e.total}
                  </Popup>
                </Marker>
              ))}
          </FeatureGroup>
        </LayersControl.Overlay>
      </LayersControl>
    </Map>
  );
}
