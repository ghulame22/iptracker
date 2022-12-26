import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState("");
  const [click, setClick] = useState("")
  const [id, setId] = useState('');
  const [location, setLocation] = useState({City:"", State:"", zip:""});
  const [timezone, setTimezone] = useState('');
  const [isp, setIsp] = useState('');

  const handleClick = () => {
      setClick(data);
      console.log("raju");
  }
  // var map = L.map("map").setView([51.505, -0.09], 13);
  // L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  //   maxZoom: 19,
  //   attribution:
  //     '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  // }).addTo(map);

  useEffect(() => {
    axios
      .get(
        `https://geo.ipify.org/api/v2/country,city?apiKey=at_G03eHaVZQz5f2aV4i4evRNSDRcxHo&ipAddress=${click}`
      )
      .then((res) => {
        console.log(res);
        setId(res.data.ip);
        setLocation({City:res.data.location.city, State:res.data.location.country, zip:res.data.location.postalCode});
        setTimezone(res.data.location.timezone);
        setIsp(res.data.isp);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [click]);

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
            onChange={e => setData(e.target.value)}
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
              <span>
                {id}
              </span>
            </div>
          </div>
          <div className="component">
            <span>LOCATION</span>
            <div className="detailedOutput">
              <span>{location.City} {location.State} {location.zip}</span>
            </div>
          </div>
          <div className="component">
            <span>TIMEZONE</span>
            <div className="detailedOutput">
              <span>{timezone}</span>
            </div>
          </div>
          <div className="component">
            <span>ISP</span>
            <div className="detailedOutput">
              <span>{isp}</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        {/* <div id="map"></div> */}
      </div>
    </>
  );
}

export default App;
