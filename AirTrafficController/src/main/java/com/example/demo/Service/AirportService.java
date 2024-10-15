package com.example.demo.Service;

import com.example.demo.Entity.Airport;
import com.example.demo.Repository.AirportRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AirportService {

    @Autowired
    private AirportRepository airportRepository;

    public List<Airport> getAllAirports()
    {
        return airportRepository.findAll();
    }
}
