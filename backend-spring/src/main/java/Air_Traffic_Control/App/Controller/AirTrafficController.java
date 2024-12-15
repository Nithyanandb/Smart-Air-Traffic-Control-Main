package Air_Traffic_Control.App.Controller;

import Air_Traffic_Control.App.Entity.*;
import Air_Traffic_Control.App.Service.AirportService;
import Air_Traffic_Control.App.Service.PlaneService;
import Air_Traffic_Control.App.Service.RouteService;
import Air_Traffic_Control.App.Service.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/")
public class AirTrafficController {

    @Autowired
    private AirportService airportService;

    @Autowired
    private PlaneService planeService;

    @Autowired
    private RouteService routeService;

    @Autowired
    private WeatherService weatherService;

    @GetMapping("/airports")
    public ResponseEntity<List<Map<String, Object>>> getAirportsWithWeather() {
        List<Airport> airports = airportService.getAllAirports();
        List<Map<String, Object>> airportsWithWeather = new ArrayList<>();

        for (Airport airport : airports) {
            Weather weatherData = weatherService.getWeather(airport.getLocation());
            Map<String, Object> airportWithWeather = new HashMap<>();
            airportWithWeather.put("airport", airport);

            if (weatherData != null) {
                airportWithWeather.put("weather", weatherData);
            } else {
                airportWithWeather.put("weather", "Weather data unavailable");
            }

            airportsWithWeather.add(airportWithWeather);
        }

        return ResponseEntity.ok(airportsWithWeather);
    }


    @PostMapping("/airports")
    public ResponseEntity<Map<String, Object>> addAirport(@RequestBody Airport airport) {
        if (airport.getName() == null || airport.getCode() == null || airport.getLocation() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Missing required fields."));
        }

        if (airportService.existsByCode(airport.getCode())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "Airport with this code already exists."));
        }

        Airport createdAirport = airportService.addAirport(airport);


        Weather weatherData = weatherService.getWeather(createdAirport.getLocation());
        Map<String, Object> response = new HashMap<>();
        response.put("airport", createdAirport);

        if (weatherData != null) {
            response.put("weather", weatherData);
        } else {
            response.put("weather", "Weather data unavailable");
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }


    @GetMapping("/planes")
    public ResponseEntity<List<Plane>> getPlanes() {
        List<Plane> planes = planeService.getAllPlane();
        return ResponseEntity.ok(planes);
    }

    @PostMapping("/planes")
    public ResponseEntity<Plane> addPlane(@RequestBody Plane plane) {
        if (plane.getModel() == null || plane.getCapacity() <= 0 || plane.getAirport() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(null);
        }
        Plane createdPlane = planeService.addPlane(plane);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPlane);
    }

    @GetMapping("/route")
    public ResponseEntity<Result> getShortestRoute(@RequestParam String origin, @RequestParam String destination) {
        Result result = routeService.findShortestPath(origin, destination);
        return ResponseEntity.ok(result);
    }

}
