package com.example.demo.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
public class Route {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "from_airport_id")
    private Airport fromAirport;

    @ManyToOne
    @JoinColumn(name = "to_airport_id")
    private Airport toAirport;

    private Double distance;

    // Getters and setters
}
