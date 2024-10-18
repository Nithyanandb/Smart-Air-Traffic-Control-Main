package com.example.demo.Service;

import com.example.demo.Entity.Airport;
import com.example.demo.Repository.AirportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AirportService {

    @Autowired
    private AirportRepository airportRepository;

    public List<Airport> getAllAirports() {
        return airportRepository.findAll();
    }

    public Airport createAirport(Airport airport) {
        return airportRepository.save(airport);
    }

    public Airport updateAirport(Long id, Airport updatedAirport) {
        Optional<Airport> existingAirport = airportRepository.findById(id);
        if (existingAirport.isPresent()) {
            Airport airport = existingAirport.get();
            airport.setName(updatedAirport.getName());
            airport.setCode(updatedAirport.getCode());
            airport.setLocation(updatedAirport.getLocation());
            return airportRepository.save(airport);
        } else {
            return null;
        }
    }

    public boolean deleteAirportById(Long id) {
        if (airportRepository.existsById(id)) {
            airportRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
