package Air_Traffic_Control.App.Repository;

import Air_Traffic_Control.App.Entity.Airport;
import Air_Traffic_Control.App.Entity.Flight;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FlightRepository extends JpaRepository<Flight, Long> {
    List<Flight> findByOrigin(Airport origin); // Update to use the Airport entity

}
