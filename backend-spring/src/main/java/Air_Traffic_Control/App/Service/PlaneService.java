package Air_Traffic_Control.App.Service;

import Air_Traffic_Control.App.Entity.Airport;
import Air_Traffic_Control.App.Entity.Plane;
import Air_Traffic_Control.App.Repository.AirportRepository;
import Air_Traffic_Control.App.Repository.PlaneRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlaneService {


private final PlaneRepository planeRepository;
private final AirportService airportService;
    public PlaneService( AirportService airportService,PlaneRepository planeRepository) {
this.airportService = airportService;
        this.planeRepository = planeRepository;
    }

    public List<Plane> getAllPlane() {
        return planeRepository.findAll();
    }


    public Plane addPlane(Plane plane) {
        if (plane.getAirport() != null) {
            Airport airport = airportService.getAirportByCode(plane.getAirport().getCode());
            plane.setAirport(airport);
            airport.getPlanes().add(plane);
            airportService.addAirport(airport);
        }
        return planeRepository.save(plane);
    }
    public Plane getPlaneById(Long id) {
        return planeRepository.findById(id).orElse(null);
    }

}