package Air_Traffic_Control.App.Service;

import Air_Traffic_Control.App.Entity.Airport;
import Air_Traffic_Control.App.Entity.Flight;
import Air_Traffic_Control.App.Repository.AirportRepository;
import Air_Traffic_Control.App.Repository.FlightRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FlightService {

    private final FlightRepository flightRepository;
    private final AirportRepository airportRepository;

    public FlightService(FlightRepository flightRepository, AirportRepository airportRepository) {
        this.flightRepository = flightRepository;
        this.airportRepository = airportRepository;
    }

    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }

    public void addFlight(Long originId, Long destinationId, double distance) {
        Airport origin = airportRepository.findById(originId).orElse(null);
        Airport destination = airportRepository.findById(destinationId).orElse(null);

        if (origin != null && destination != null) {
            Flight flight = new Flight(origin, destination, distance);
            flightRepository.save(flight);
        } else {
            throw new IllegalArgumentException("Invalid airport IDs provided.");
        }
    }

}