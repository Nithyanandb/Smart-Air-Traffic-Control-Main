package com.example.demo.Controller;

import com.example.demo.Entity.Airport;
import com.example.demo.Service.AirportService;
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
@RequestMapping("/api/route-planning")
public class RoutePlanningController {

    @Autowired
    private RoutePlanningService routePlanningService;

    @GetMapping("/shortest-path")
    public ResponseEntity<Map<Airport, Double>> getShortestPath(
            @RequestParam Long startAirportId,
            @RequestParam Long destinationAirportId) {

        Airport startAirport = airportRepository.findById(startAirportId).orElseThrow();
        Airport destinationAirport = airportRepository.findById(destinationAirportId).orElseThrow();

        Map<Airport, Double> shortestPaths = routePlanningService.findShortestPath(startAirport, destinationAirport);
        return ResponseEntity.ok(shortestPaths);
    }
}
