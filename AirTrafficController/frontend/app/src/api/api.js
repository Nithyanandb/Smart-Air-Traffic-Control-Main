import axios from 'axios';

const API_URL = 'http://localhost:2000/api/airports'; 

export const getAllAirports = () => {
    return axios.get(API_URL); 
};

export const createAirport = (airport) => {
    return axios.post(API_URL, airport); 
};

export const updateAirport = (id, updatedAirport) => {
    return axios.put(`${API_URL}/${id}`, updatedAirport); 
};

export const getAirportsWithWeather = () => {
    return axios.get(`${API_URL}/weather`); 
};
