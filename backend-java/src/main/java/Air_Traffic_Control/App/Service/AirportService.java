package Air_Traffic_Control.App.Service;

import Air_Traffic_Control.App.Entity.Airport;
import Air_Traffic_Control.App.Repository.AirportRepository;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class AirportService {

    private final AirportRepository airportRepository;

    public AirportService(AirportRepository airportRepository) {
        this.airportRepository = airportRepository;
    }

    public List<Airport> getAllAirports() {
        return airportRepository.findAll();
    }

    public Airport addAirport(Airport airport) {
        airportRepository.save(airport);
        return airport;
    }

    public Airport getAirportByCode(String code) {
        return airportRepository.findByCode(code);
    }

    public boolean existsByCode(String code) {
        return airportRepository.existsByCode(code);
    }

}
