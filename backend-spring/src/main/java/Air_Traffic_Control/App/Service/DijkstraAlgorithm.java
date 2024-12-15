package Air_Traffic_Control.App.Service;

import Air_Traffic_Control.App.Entity.Airport;
import Air_Traffic_Control.App.Entity.Flight;
import Air_Traffic_Control.App.Entity.Result;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class DijkstraAlgorithm {

    private static final Logger logger = LoggerFactory.getLogger(DijkstraAlgorithm.class);

    public Result findShortestPath(Map<Airport, List<Flight>> graph, Airport start, Airport end) {
        Map<Airport, Double> distances = new HashMap<>();
        Map<Airport, Airport> previousNodes = new HashMap<>();
        PriorityQueue<Airport> priorityQueue = new PriorityQueue<>(Comparator.comparingDouble(distances::get));
        List<Airport> path = new ArrayList<>();
        double totalDistance = 0.0;


        for (Airport airport : graph.keySet()) {
            distances.put(airport, Double.MAX_VALUE);
            previousNodes.put(airport, null);
        }
        distances.put(start, 0.0);
        priorityQueue.add(start);

        while (!priorityQueue.isEmpty()) {
            Airport current = priorityQueue.poll();

            // Early exit if we reach the destination
            if (current.equals(end)) {
                logger.info("Reached destination: {}", end.getCode());
                while (previousNodes.get(current) != null) {
                    path.add(current);
                    current = previousNodes.get(current);
                }
                path.add(start);
                Collections.reverse(path);

                totalDistance = distances.get(end);

                // Prepare route steps for result
                List<String> routeSteps = new ArrayList<>();
                for (Airport airport : path) {
                    routeSteps.add(airport.getCode());
                }

                return new Result(routeSteps, totalDistance);
            }

            // Update neighbors (flights)
            List<Flight> flights = graph.get(current);
            if (flights != null) {
                for (Flight flight : flights) {
                    Airport neighbor = flight.getDestination();
                    double newDist = distances.get(current) + flight.getDistance();

                    // If a shorter path to the neighbor is found
                    if (newDist < distances.get(neighbor)) {
                        distances.put(neighbor, newDist);
                        previousNodes.put(neighbor, current);
                        priorityQueue.add(neighbor);
                    }
                }
            }
        }

        logger.warn("No path found from {} to {}", start.getCode(), end.getCode());

        return new Result(Collections.emptyList(), 0.0);
    }
}
