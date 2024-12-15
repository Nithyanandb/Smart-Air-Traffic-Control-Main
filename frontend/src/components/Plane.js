import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../static/Plane.css";

function Plane() {
  const [planes, setPlanes] = useState([]);
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [airport, setAirport] = useState(""); // Add state for airport
  const [airports, setAirports] = useState([]); // To fetch and show airports
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch list of airports for the dropdown
    const fetchAirports = async () => {
      try {
        const response = await axios.get("/airports");
        setAirports(response.data); // Assuming /airports returns a list
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchPlanes = async () => {
      try {
        const response = await axios.get("/planes");
        setPlanes(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchAirports();
    fetchPlanes();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name || !model || !airport) {  // Validate if all fields are filled
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post("/planes", { 
        name, 
        model, 
        airport // Send airport in the POST request
      });
      setPlanes([...planes, response.data]);
      setName("");
      setModel("");
      setAirport(""); // Reset the airport after submission
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="fly-high">
      <nav className="nav-bar" role="navigation" aria-label="main navigation">
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
                  name="name"
                  className="form-control"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  aria-required="true"
                  aria-label="Plane Name"
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
                  name="model"
                  className="form-control"
                  value={model}
                  onChange={(event) => setModel(event.target.value)}
                  required
                  aria-required="true"
                  aria-label="Plane Model"
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
                  name="airport"
                  className="form-control"
                  value={airport}
                  onChange={(event) => setAirport(event.target.value)}
                  required
                  aria-required="true"
                  aria-label="Airport"
                >
                  <option value="">Select an Airport</option>
                  {airports.map((airport) => (
                    <option key={airport.id} value={airport.id}>
                      {airport.name}
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
          <h2 className="text-center  mt-5 py-2">Planes</h2>
          <table className="plane-table" aria-label="Existing Planes">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Model</th>
              </tr>
            </thead>
            <tbody>
              {planes.map((plane) => (
                <tr key={plane.id}>
                  <td>{plane.name}</td>
                  <td>{plane.model}</td>
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
