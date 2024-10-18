import React, { useEffect, useState } from "react";
import { getAirportsWithWeather, createAirport, updateAirport } from "../api/api";
import './AirportList.css';
import {
    Button,
    TextField,
    Typography,
    CircularProgress,
    Container,
    Grid,   
    Paper,
    
} from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const AirportList = () => {
    const [airports, setAirports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newAirport, setNewAirport] = useState({
        id: null, 
        name: "",
        code: "",
        location: "",
    });
 
    useEffect(() => {
        const fetchAirports = async () => {
            try {
                const response = await getAirportsWithWeather();
                setAirports(response.data);
            } catch (error) {
                console.error("Error fetching airports with weather:", error);
                setError("Failed to load airports");
            } finally {
                setLoading(false);
            }
        };

        fetchAirports();
    }, []);

  

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewAirport((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (newAirport.id) {
                await updateAirport(newAirport.id, newAirport);
            } else {
                await createAirport(newAirport);
            }

            const response = await getAirportsWithWeather();
            setAirports(response.data);
            setNewAirport({ id: null, name: "", code: "", location: "" });
        } catch (error) {
            console.error("Error adding/updating airport:", error);
            setError("Failed to add or update airport");
        }
    };

    const chartData = {
        labels: airports.map((airport) => airport.airport.name),
        datasets: [
            {
                label: "Temperature (°C)",
                data: airports.map((airport) => airport.weather?.main?.temp || 0),
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
                label: "Humidity (%)",
                data: airports.map((airport) => airport.weather?.main?.humidity || 0),
                backgroundColor: "rgba(54, 162, 235, 0.5)",
            },
            {
                label: "Wind Speed (m/s)",
                data: airports.map((airport) => airport.weather?.wind?.speed || 0),
                backgroundColor: "rgba(75, 192, 192, 0.5)",
            },
        ],
    };

    return (
        <div className="main">
          
            <video className="ma" loop controls muted autoPlay src="https://assets.mixkit.co/videos/7030/7030-720.mp4"></video>
        <Container className="container">
            <Typography variant="h4" align="center" padding={"25px"} style ={{fontWeight:"bold", color: "black", paddingTop: "30px", paddingLeft: "20px", marginTop: "0px", position:"relative"}}>
                Airport Weather Dashboard
            </Typography>
            {loading ? (
                <div className="loading">
                    <CircularProgress />
                </div>
            ) : error ? (
                <Typography className="error">{error}</Typography>
            ) : (
                
                <Grid container spacing={4}>
            
                    <Grid item xs={12}>
    <Paper className="chart-container" style={{ background: "black" }}>
        <Bar data={chartData} />
    </Paper>
</Grid>
<Grid item xs={12}>
    <Paper elevation={2} style={{ padding: "0px", width: "100%" }}>
        <Typography variant="h4" style={{fontWeight:"bold", color: "black", paddingTop: "30px", paddingLeft: "20px", marginTop: "0px", position:"relative"}}>Airports</Typography>
        <ul className="grid-container" >
            {airports.map((airportWithWeather, index) => (
                <li key={airportWithWeather.airport.id} className={`airport-item slide-in ${loading ? 'hidden' : ''}`} >
                    <Typography style={{ marginTop: "50px", borderRadius: "5px", padding: "20px", width: "90%", backgroundColor: "black", color: "white" }}>
                        {airportWithWeather.airport.name} ({airportWithWeather.airport.code}) - {airportWithWeather.airport.location}
                    </Typography>
                    <Typography style={{ padding: "10px", marginTop: "50px", color: "black" ,
fontWeight:"bold"}}>
                        Temperature: {airportWithWeather.weather?.main?.temp !== undefined ? `${airportWithWeather.weather.main.temp} °C` : "N/A"}
                    </Typography>
                    <Typography style={{ padding: "10px", color: "black",fontWeight:"bold" }}>
                        Humidity: {airportWithWeather.weather?.main?.humidity !== undefined ? `${airportWithWeather.weather.main.humidity}%` : "N/A"}
                    </Typography>
                    <Typography style={{ padding: "10px" , color: "black",fontWeight:"bold"}}>
                        Wind: {airportWithWeather.weather?.wind?.speed !== undefined ? `${airportWithWeather.weather.wind.speed} m/s` : "N/A"}
                    </Typography>
                </li>
            ))}
          
        </ul>
    </Paper>
</Grid>
</Grid>
            )}
            <div className="add">
                <Typography variant="h5" gutterBottom style ={{fontWeight:"bold", color: "black", paddingTop: "0px", paddingLeft: "20px", marginTop: "0px",marginBottom:"-39px", position:"relative"}}>
                    Add New Airport
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Airport Name"
                        name="name"
                        value={newAirport.name}
                        onChange={handleChange}
                        required
                        fullWidth
                        margin="normal"
                        InputProps={{
                            style: { backgroundColor: '#ffffff', color: '#000' }
                        }}
                    />
                    <TextField
                        label="Airport Code"
                        name="code"
                        value={newAirport.code}
                        onChange={handleChange}
                        required
                        fullWidth
                        margin="normal"
                        InputProps={{
                            style: { backgroundColor: '#ffffff', color: '#000' }
                        }}
                    />
                    <TextField
                        label="Location"
                        name="location"
                        value={newAirport.location}
                        onChange={handleChange}
                        required
                        fullWidth
                        margin="normal"
                        InputProps={{
                            style: { backgroundColor: 'white', color: '#000' }
                        }}
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Add Airport
                    </Button>
                </form>
            </div>
        </Container>
        </div>
    );
};

export default AirportList;
