package Air_Traffic_Control.App.Service;

import Air_Traffic_Control.App.Entity.Airport;
import Air_Traffic_Control.App.Entity.Flight;
import Air_Traffic_Control.App.Repository.FlightRepository;
import Air_Traffic_Control.App.Repository.AirportRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FlightService {

    private final FlightRepository flightRepository;
    private final AirportRepository airportRepository; // Inject the AirportRepository

    public FlightService(FlightRepository flightRepository, AirportRepository airportRepository) {
        this.flightRepository = flightRepository;
        this.airportRepository = airportRepository; // Initialize the repository
    }


    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }


    public void addFlight(Long planeId, Long originId, Long destinationId, double distance) {
        // Find the origin and destination airports
        Airport origin = airportRepository.findById(originId).orElse(null);
        Airport destination = airportRepository.findById(destinationId).orElse(null);

        // Create a new flight if both airports are found
        if (origin != null && destination != null) {
            Flight flight = new Flight(origin, destination, distance);
            flightRepository.save(flight);
        } else {
            // Handle the case where one of the airports was not found
            throw new IllegalArgumentException("Invalid airport IDs provided.");
        }
    }
}
