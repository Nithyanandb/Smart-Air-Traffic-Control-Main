import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WeatherPage() {
    const [airports, setAirports] = useState([]);

    useEffect(() => {
        axios.get('/weather')
            .then(response => {
                setAirports(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            <h1>Weather</h1>
            <ul>
                {airports.map((airport) => (
                    <li key={airport.airport.id}>
                        <h2>{airport.airport.name}</h2>
                        <p>Weather: {airport.weather}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default WeatherPage;