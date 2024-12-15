package Air_Traffic_Control.App.Service;

import Air_Traffic_Control.App.Entity.Plane;
import Air_Traffic_Control.App.Repository.PlaneRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PlaneService {


    private final PlaneRepository planeRepository;
    private final List<Plane> plane = new ArrayList<>();

    public PlaneService(PlaneRepository planeRepository) {
        this.planeRepository = planeRepository;
    }

    public List<Plane> getAllPlane() {
       return planeRepository.findAll();
    }

    public Plane addPlane(Plane plane) {
        planeRepository.save(plane);
        return plane;
    }
}
