package com.example.demo.Entity;

import lombok.Data;

@Data
public class AirportWithWeather {
    private Airport airport;
    private Weather weather;

    public AirportWithWeather(Airport airport, Weather weather) {
        this.airport = airport;
        this.weather = weather;
    }
}
