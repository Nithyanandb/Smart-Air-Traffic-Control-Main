// Plane.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../static/Plane.css";
import Nav_Bar from "./Nav_Bar";

function Plane() {
  const [planes, setPlanes] = useState([]);
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [airport, setAirport] = useState("");
  const [airports, setAirports] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [airportsRes, planesRes] = await Promise.all([
          axios.get("/airports"),
          axios.get("/planes"),
        ]);
        const airportData = airportsRes.data.map((entry) => entry.airport);
        setAirports(airportData);
        setPlanes(planesRes.data);
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!name || !model || !capacity || !airport) {
      setError("Please fill in all fields.");
      return;
    }
  
    if (capacity <= 0) {
      setError("Capacity must be a positive number.");
      return;
    }
  
    try {
      const newPlane = {
        name,
        model,
        capacity: parseInt(capacity), 
        airport: { id: airport },
      };
  
      await axios.post("/planes", newPlane);
  
      const updatedPlanes = await axios.get("/planes");
      setPlanes(updatedPlanes.data);
  
      setName("");
      setModel("");
      setCapacity(0);
      setAirport("");
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to add the plane. Please try again later.");
    }
  };

  return (
    <div className="fly-high">
      <Nav_Bar />
      <div className="plane-cont">
        <h2 className="text-center">Manage Planes</h2>

        {error && (
          <div className="alert alert-danger" role="alert">
            <p>{error}</p>
          </div>
        )}

        {isLoading ? (
          <div className="text-center">
            <p>Loading...</p>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">
                  Plane Name
                  <div className="py-4">
                    <input
                      type="text"
                      id="name"
                      className="form-control"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      required
                    />
                    
                  </div>
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="model">
                  Plane Model
                  <div className="py-4">
                  <input
  type="text"
  id="model"
  className="form-control"
  value={model}
  onChange={(event) => setModel(event.target.value)}
  required
/>
                  </div>
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="capacity">
                  Plane Capacity
                  <div className="py-4">
                    <input
                      type="number"
                      id="capacity"
                      className="form-control"
                      value={capacity}
                      onChange={(event) =>
                        setCapacity(event.target.valueAsNumber || 0)
                      }
                      required
                    />
                  </div>
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="airport">
                  Airport
                  <div className="py-4">

                  <select
  id="airport"
  className="form-control"
  value={airport}
  onChange={(event) => setAirport(event.target.value)}
  required
>
  <option value="" style={{color:'black'}}>Select an Airport</option>
  {airports.map((airport) => (
    <option key={airport.id} value={airport.id}>
      {airport.name} ({airport.code}) - {airport.location}
    </option>
  ))}
</select>

                  </div>
                </label>
              </div>

              <button type="submit" className="plane-btn py-2">
                Add Plane
              </button>
            </form>

            <div className="tab mt-4">
              <h2 className="text-center mt-5 py-2">Planes</h2>
              <table className="plane-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Model</th>
                    <th>Capacity</th>
                    <th>Airport</th>
                  </tr>
                </thead>
                <tbody>
                  {planes.map((plane) => (
                    <tr key={plane.id}>
                      <td>{plane.name}</td>
                      <td>{plane.model}</td>
                      <td>{plane.capacity}</td>
                      <td>
                        {plane.airport
                          ? `${plane.airport.name} (${plane.airport.code}) - ${plane.airport.location}`
                          : "No Airport Assigned"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Plane;