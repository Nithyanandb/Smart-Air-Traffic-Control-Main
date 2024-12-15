import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Airport.css";

function Airport() {
  const [airports, setAirports] = useState([]);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState(null);

  // Fetch airports with weather details on component load
  useEffect(() => {
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
    };
    fetchAirports();
  }, []);

  // Handle form submission to add a new airport
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

  return (
    <div>
      <div  className="fly-high">     <nav className="nav-bar" role="navigation" aria-label="main navigation">
        <Link className="nav-link" to="/">
          Air Traffic Control
        </Link>
        <div className="nav-y">
          <ul className="nav-b">
            <li className="nav-item">
              <Link className="nav-l" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-l" to="/airports">
                Airports
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-l" to="/planes">
                Planes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-l" to="/route">
                Find Shortest Route
              </Link>
            </li>
          </ul>
        </div>
      </nav>

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
 
        <div className="tab mt-4">
          <h2 className="text-center mt-5 py-2">Airports</h2>
          <div className="airport-cards">
            {airports.map((airport) => (
              <div key={airport.id} className="card bg-white" style={{color:'black'}}> 
                <h3 className="card-title">{airport.name}</h3>
                <br></br>
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
      </div>
    </div>
  );
}

export default Airport;
