import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import CountryList from "./CountryList";

// Примерни данни за офисите
const offices = [
  { id: 1, name: "Офис София", position: [42.6977, 23.3219] },
  { id: 2, name: "Офис Пловдив", position: [42.1354, 24.7453] },
  { id: 3, name: "Офис Варна", position: [43.2141, 27.9147] },
];

function InteractiveMapWithLocations() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOffices = offices.filter((office) =>
    office.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ height: "60vh", display: 'flex', width: '80%', margin: '0 auto', border: '3px solid red'}}>  
      <div style={{width: '30%'}}>
        <input
          type="text"
          placeholder="Търсене по град или офис..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <ul>
          <CountryList />
        </ul>
      </div>
      <MapContainer
        center={[42.6977, 23.3219]}
        zoom={7}
        style={{height: '100%' ,width:"100%"}}
        maxBounds={[
          [41.235, 22.357],
          [44.216, 28.917],
        ]}
        maxBoundsViscosity={1.0}
        scrollWheelZoom={false}
        dragging={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        {filteredOffices.map((office) => (
          <Marker key={office.id} position={office.position}>
            <Popup>{office.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default InteractiveMapWithLocations;
