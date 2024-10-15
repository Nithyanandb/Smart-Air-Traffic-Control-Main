package com.example.demo.Controller;

import com.example.demo.Service.AirportService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/")
public class AirportController {

    private final AirportService airportService;

    public AirportController(AirportService airportService) {
        this.airportService = airportService;
    }

    @GetMapping("/")
    public String sayHello(Model model) {

        model.addAttribute("airport", airportService.getAllAirports());
        return "Airport";
    }
}
