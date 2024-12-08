package com.example.demo.Controller;

import com.example.demo.Entity.Airport;
import com.example.demo.Entity.AirportWithWeather;
import com.example.demo.Entity.Weather;
import com.example.demo.Service.AirportService;
import com.example.demo.Service.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/airports")
@CrossOrigin(origins = "http://localhost:3000")
public class AirportWeatherController {

    private final AirportService airportService;
    private final WeatherService weatherService;

    @Autowired
    public AirportWeatherController(AirportService airportService, WeatherService weatherService) {
        this.airportService = airportService;
        this.weatherService = weatherService;
    }

    @GetMapping
    public ResponseEntity<List<Airport>> getAllAirports() {
        List<Airport> airports = airportService.getAllAirports();
        return ResponseEntity.ok(airports);
    }

    @GetMapping("/weather")
    public ResponseEntity<List<Map<String, Object>>> getAirportsWithWeather() {
        List<Airport> airports = airportService.getAllAirports();
        List<Map<String, Object>> airportsWithWeather = new ArrayList<>();

        // even i can get separately , hence  => object = {airport data  + weather data}

        for (Airport airport : airports) {
            Weather weatherData = weatherService.getWeather(airport.getLocation());

            if (weatherData == null) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(List.of(
                        Map.of("error", "Failed to fetch weather data for airport: " + airport.getName())
                ));
            }

            Map<String, Object> airportWithWeather = new HashMap<>();
            airportWithWeather.put("airport", airport);
            airportWithWeather.put("weather", weatherData);
            airportsWithWeather.add(airportWithWeather);
        }

        return ResponseEntity.ok(airportsWithWeather);
    }

    @PostMapping
    public ResponseEntity<Airport> addAirport(@RequestBody Airport airport) {
        Airport createdAirport = airportService.createAirport(airport);
        return ResponseEntity.created(URI.create("/api/airports/" + createdAirport.getId())).body(createdAirport);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Airport> updateAirport(@PathVariable Long id, @RequestBody Airport airport) {
        Airport updatedAirport = airportService.updateAirport(id, airport);
        if (updatedAirport != null) {
            return ResponseEntity.ok(updatedAirport);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAirport(@PathVariable Long id) {
        boolean isDeleted = airportService.deleteAirportById(id);
        if (isDeleted) {
            return ResponseEntity.ok("Airport deleted successfully!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Airport could not be deleted. It may not exist.");
        }
    }
}
