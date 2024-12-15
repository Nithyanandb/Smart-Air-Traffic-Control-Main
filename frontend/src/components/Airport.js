import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Airport.css';
function AirportsPage() {
    const [airports, setAirports] = useState([]);
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [location, setLocation] = useState('');

    useEffect(() => {
        axios.get('/airports')
            .then(response => {
                setAirports(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newAirport = { name, code, location };
        axios.post('/airports', newAirport)
            .then(response => {
                setAirports([...airports, response.data]);
                setName('');
                setCode('');
                setLocation('');
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div>
            <h1>Airports</h1>
            <ul>
                {airports.map(airport => (
                    <li key={airport.id}>{airport.name}</li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
                </label>
                <label>
                    Code:
                    <input type="text" value={code} onChange={(event) => setCode(event.target.value)} />
                </label>
                <label>
                    Location:
                    <input type="text" value={location} onChange={(event) => setLocation(event.target.value)} />
                </label>
                <button type="submit">Add Airport</button>
            </form>
        </div>
    );
}

export default AirportsPage;