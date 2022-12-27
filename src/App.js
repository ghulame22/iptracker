import "./App.css";
import axios from "axios";
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function App() {
  const [api, setApi] = useState({});
  const [data, setData] = useState("");

  const handleClick = () => {
    axios
      .get(
        `https://geo.ipify.org/api/v2/country,city?apiKey=at_G03eHaVZQz5f2aV4i4evRNSDRcxHo&ipAddress=${data}`
      )
      .then((res) => {
        setApi(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="bg-cover">
        <span>IP Address Tracker</span>
        <div className="buttonInside">
          <input
            className="inputBox"
            type="text"
            placeholder="Search for any IP address or domain"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
          <button className="btn" type="button" onClick={handleClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14">
              <path
                fill="none"
                stroke="#FFF"
                strokeWidth="3"
                d="M2 1l6 6-6 6"
              />
            </svg>
          </button>
        </div>
        <div className="detailBox">
          <div className="component">
            <span>IP ADDRESS</span>
            <div className="detailedOutput">
              <span>{api?.ip}</span>
            </div>
          </div>
          <div className="component">
            <span>LOCATION</span>
            <div className="detailedOutput">
              <span>
                {api?.location?.city} {api?.location?.country}{" "}
                {api?.location?.postalCode}
              </span>
            </div>
          </div>
          <div className="component">
            <span>TIMEZONE</span>
            <div className="detailedOutput">
              <span>{api?.location?.timezone}</span>
            </div>
          </div>
          <div className="component">
            <span>ISP</span>
            <div className="detailedOutput">
              <span>{api?.isp}</span>
            </div>
          </div>
        </div>
      </div>
      <MapContainer
        center={[19.899094091155916, 75.27630960064279]}
        zoom={10}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[19.899094091155916, 75.27630960064279]}>
          <Popup>{api?.ip}</Popup>
        </Marker>
      </MapContainer>
    </>
  );
}

export default App;
