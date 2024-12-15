package Air_Traffic_Control.App.Service;

import Air_Traffic_Control.App.Entity.Plane;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AeroplaneService {
    private final List<Plane> planes = new ArrayList<>();

    public List<Plane> getAllPlanes() {
        return planes;
    }

    public void addPlane(Plane plane) {
        planes.add(plane);
    }
}
