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

    public List<Airport> getAllAirports()
    {
        return airportRepository.findAll();
    }

    public Airport createAirport(Airport airport)
    {
        return airportRepository.save(airport);
    }

    public boolean updateAirport(Long id, Airport airport)
    {
        Optional<Airport> prevId = airportRepository.findById(id);
        if (prevId.isPresent())
        {
            Airport airportUpdated = airportRepository.save(airport);
            return true;
        }
        else
        {
            return false;
        }
    }

}
