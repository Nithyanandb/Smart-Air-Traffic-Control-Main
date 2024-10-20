package com.example.demo.Service;

import com.example.demo.Entity.Airport;
import com.example.demo.Repository.AirportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.net.URI;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Service
public class RoutePlanningService {

    @Autowired
    private RouteRepository routeRepository;

    public Map<Airport, Double> findShortestPath(Airport startAirport, Airport destinationAirport) {
        // Fetch all routes and create an adjacency list representation
        List<Route> routes = routeRepository.findAll();
        Map<Airport, Map<Airport, Double>> graph = createGraph(routes);

        // Implement Dijkstra's Algorithm here
        Map<Airport, Double> shortestPaths = dijkstra(graph, startAirport);
        return shortestPaths;
    }

    private Map<Airport, Map<Airport, Double>> createGraph(List<Route> routes) {
        Map<Airport, Map<Airport, Double>> graph = new HashMap<>();
        for (Route route : routes) {
            graph.computeIfAbsent(route.getFromAirport(), k -> new HashMap<>())
                    .put(route.getToAirport(), route.getDistance());
        }
        return graph;
    }

    private Map<Airport, Double> dijkstra(Map<Airport, Map<Airport, Double>> graph, Airport start) {
        // Dijkstra's algorithm implementation (similar to the Python code shared earlier)
        Map<Airport, Double> distances = new HashMap<>();
        PriorityQueue<Map.Entry<Airport, Double>> priorityQueue = new PriorityQueue<>(Map.Entry.comparingByValue());

        distances.put(start, 0.0);
        priorityQueue.offer(new AbstractMap.SimpleEntry<>(start, 0.0));

        while (!priorityQueue.isEmpty()) {
            Map.Entry<Airport, Double> current = priorityQueue.poll();
            Airport currentAirport = current.getKey();
            Double currentDistance = current.getValue();

            if (currentDistance > distances.getOrDefault(currentAirport, Double.MAX_VALUE)) {
                continue;
            }

            for (Map.Entry<Airport, Double> neighborEntry : graph.getOrDefault(currentAirport, Collections.emptyMap()).entrySet()) {
                Airport neighbor = neighborEntry.getKey();
                Double distance = neighborEntry.getValue();
                Double newDistance = currentDistance + distance;

                if (newDistance < distances.getOrDefault(neighbor, Double.MAX_VALUE)) {
                    distances.put(neighbor, newDistance);
                    priorityQueue.offer(new AbstractMap.SimpleEntry<>(neighbor, newDistance));
                }
            }
        }

        return distances;
    }
}