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
    public PlaneService( PlaneRepository planeRepository) {

        this.planeRepository = planeRepository;
    }

    public List<Plane> getAllPlane() {
        return planeRepository.findAll();
    }

    public Plane addPlane(Plane plane) {
        return planeRepository.save(plane);
    }


    public Plane getPlaneById(Long id) {
        return planeRepository.findById(id).orElse(null);
    }

}