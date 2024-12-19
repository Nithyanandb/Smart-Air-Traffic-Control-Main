import React, { useState, useEffect } from "react";
import axios from "axios";
import "../static/Plane.css";
import Nav_Bar from "./Nav_Bar";

function Plane() {
  const [planes, setPlanes] = useState([]);
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [capacity, setCapacity] = useState("");
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
        setAirports(airportsRes.data);
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

    try {
      const newPlane = {
        name,
        model,
        capacity: parseInt(capacity),
        airportId: airport,
      };
      axios.defaults.headers.post['Content-Type'] = 'application/json';
      await axios.post("/planes", newPlane);

      const updatedPlanes = await axios.get("/planes");
      setPlanes(updatedPlanes.data);

      setName("");
      setModel("");
      setCapacity("");
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
        {isLoading ? (
          <div className="text-center">
            <p>Loading...</p>
          </div>
        ) : (
          <>
            <h2 className="text-center">Manage Planes</h2>

            {error && (
              <div className="alert alert-danger" role="alert">
                <p>{error}</p>
              </div>
            )}

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
                <label htmlFor="capacity">Plane Capacity
                  <div className="py-4">
                    <select
                      id="capacity"
                      type="number"
                      style={{ color: 'black' }}
                      className="form-contro"
                      value={capacity}
                      onChange={(e) => setCapacity(e.target.value)}
                      required
                    >
                      <option className="form-contro" value="">Select Capacity</option>
                      <option value="220">220</option>
                      <option value="100">100</option>
                      <option value="150">150</option>
                      <option value="200">200</option>
                      <option value="300">300</option>
                    </select>
                  </div>
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="airport">
                  Airport
                  <div className="py-4">
                    <select
                      id="airport"
                      style={{ color: 'black' }}
                      className="form-contro"
                      value={airport}
                      onChange={(event) => setAirport(event.target.value)}
                      required
                    >
                      <option value="" style={{ color: "black" }}>
                        Select an Airport
                      </option>
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
</>
)}
<div className="tab mt-4">
<h2 className="text-center mt-5 py-2">Planes</h2>
<table className="plane-table fly-in">
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
{plane.airport ? (
`${plane.airport.name} (${plane.airport.code}) - ${plane.airport.location}`
) : (
"No Airport Assigned"
)}
</td>
</tr>
))}
</tbody>
</table>
</div>
</div>
</div>
);
}

export default Plane;