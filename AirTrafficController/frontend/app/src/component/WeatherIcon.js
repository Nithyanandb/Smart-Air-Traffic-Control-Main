import React from 'react';
import { styled } from '@mui/material/styles';

// Create a styled image component
const StyledIcon = styled('img')({
    width: '50px',
    height: '50px',
});

const WeatherIcon = ({ condition }) => {
    const getWeatherIcon = (condition) => {
        switch (condition) {
            case 'Clear':
                return 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Sunny_icon.svg';
            case 'Clouds':
                return 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Cloud_icon.svg';
            case 'Rain':
                return 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Rain_icon.svg';
            case 'Snow':
                return 'https://upload.wikimedia.org/wikipedia/commons/4/44/Snow_icon.svg';
            case 'Thunderstorm':
                return 'https://upload.wikimedia.org/wikipedia/commons/1/19/Thunderstorm_icon.svg';
            default:
                return 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Default_icon.svg'; // Fallback icon
        }
    };

    return (
        <StyledIcon src={getWeatherIcon(condition)} alt={condition} />
    );
};

export default WeatherIcon;
