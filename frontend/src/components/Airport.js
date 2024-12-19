import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Airport.css";
import Nav_Bar from "./Nav_Bar";

function Airport() {
  const [airports, setAirports] = useState([]);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState(null);
  const [selectedAirport, setSelectedAirport] = useState(null);
 const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const fetchAirports = async () => {
      try {
        const response = await axios.get("/airports");
        const formattedAirports = response.data.map((item) => ({
          ...item.airport,
          weather: item.weather?.main || null,
        }));
        setAirports(formattedAirports);
      } catch (error) {
        setError("Failed to fetch airports. Please try again later.");
        console.error(error);
      }
      finally {
        setIsLoading(false);
      }
    };

    fetchAirports();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    if (!name || !code || !location) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post("/airports", { name, code, location });
      const newAirport = {
        ...response.data.airport,
        weather: response.data.weather?.main || null,
      };
      setAirports([...airports, newAirport]);
      setName("");
      setCode("");
      setLocation("");
    } catch (error) {
      if (error.response && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  const handleAirportClick = (airport) => {
    setSelectedAirport(airport);
  };

  return (
    <div>
      <div className="fly-high">
        <Nav_Bar />

        <div className="plane-cont">
          <h2 className="text-center">Manage Airports</h2>
          {error && (
            <div className="alert alert-danger" role="alert">
              <p>{error}</p>
            </div>
          )}

          <div className="airport-box">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">
                  Airport Name
                  <div className="py-4">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      required
                      aria-required="true"
                      aria-label="Airport Name"
                    />
                  </div>
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="code">
                  Airport Code
                  <div className="py-4">
                    <input
                      type="text"
                      id="code"
                      name="code"
                      className="form-control"
                      value={code}
                      onChange={(event) => setCode(event.target.value)}
                      required
                      aria-required="true"
                      aria-label="Airport Code"
                    />
                  </div>
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="location">
                  Airport Location
                  <div className="py-4">
                    <input
                      type="text"
                      id="location"
                      name="location"
                      className="form-control"
                      value={location}
                      onChange={(event) => setLocation(event.target.value)}
                      required
                      aria-required="true"
                      aria-label="Airport Location"
                    />
                  </div>
                </label>
              </div>
              <button type="submit" className="plane-btn py-2">
                Add Airport
              </button>
            </form>
          </div>
        </div>

        <div className="tab mt-5">
          <h2 className="text-center mt-5 py-5">Airports</h2>
          <div className="airport-cards ">
            {airports.map((airport) => (
              <div key={airport.id} className="card fly-in bg-white" style={{ color: 'black' }} onClick={() => handleAirportClick(airport)}>
                <h3 className="card-title">{airport.name}</h3>
                <br />
                <p className="card-text">Code: {airport.code}</p>
                <p className="card-text">Location: {airport.location}</p>
                {airport.weather ? (
                  <div className="dum">
                                <p className="card-text">
              Temperature: {airport.weather.temp}°C
            </p>
            <p className="card-text">Humidity: {airport.weather.humidity}%</p>
            <p className="card-text">Pressure: {airport.weather.pressure} hPa</p>
<p className="card-text">Wind Speed: {airport.weather.speed} m/s</p>
</div>
) : (
<p>Weather data unavailable</p>
)}
</div>
))}
</div>
</div>


{selectedAirport && (
  <div className={`airport-detail ${selectedAirport ? 'show' : ''}`}>
    <h2>Airport Details</h2>
    <p>
      <strong>Name:</strong> {selectedAirport.name}
    </p>
    <p>
      <strong>Code:</strong> {selectedAirport.code}
    </p>
    <p>
      <strong>Location:</strong> {selectedAirport.location}
    </p>
    <p>
      <strong>Tracks:</strong> {selectedAirport.tracks}
    </p>
    <p>
      <strong>Allotted:</strong> {selectedAirport.allotted}
    </p>
    <p>
      <strong>Free:</strong> {selectedAirport.free}
    </p>
    <p>
      <strong>Occupied:</strong> {selectedAirport.occupied}
    </p>
  </div>
)}
</div>
</div>
);
}
export default Airport;