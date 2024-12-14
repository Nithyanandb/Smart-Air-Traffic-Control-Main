import React, { useState, useEffect } from 'react';
import './App.css';
import { Navbar, Container, Row, Col, Form, Button, Table } from 'react-bootstrap';

function App() {
  const [airports, setAirports] = useState([]);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    // fetch airports from API
    fetch('/airports')
      .then(response => response.json())
      .then(data => setAirports(data));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // add airport to API
    fetch('/airports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, code, location }),
    })
      .then(response => response.json())
      .then(data => {
        setAirports([...airports, data]);
        setName('');
        setCode('');
        setLocation('');
      })
      .catch(error => setError('Error adding airport'));
  };

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Air Traffic Control</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/airports">
                Airports
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/planes">
                Planes
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/route">
                Find Shortest Route
              </a>
            </li>
          </ul>
        </Navbar.Collapse>
      </Navbar>

      <Container className="mt-4">
        <h1 className="text-center">Manage Airports</h1>
        {error && (
          <div className="alert alert-danger">
            <p>{error}</p>
          </div>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Airport Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="code">
            <Form.Label>Airport Code</Form.Label>
            <Form.Control
              type="text"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="location">
            <Form.Label>Airport Location</Form.Label>
            <Form.Control
              type="text"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Airport
          </Button>
        </Form>

        <div className="mt-4">
          <h2>Existing Airports</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Code</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {airports.map((airport) => (
                <tr key={airport.id}>
                  <td>{airport.name}</td>
                  <td>{airport.code}</td>
                  <td>{airport.location}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>

      <footer className="footer">
        <div className="container text-center">
          <p>&copy; 2024 Air Traffic Control. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;