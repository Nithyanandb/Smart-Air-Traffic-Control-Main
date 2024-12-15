package Air_Traffic_Control.App.Repository;

import Air_Traffic_Control.App.Entity.Plane;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AeroplaneRepository extends JpaRepository<Plane, Long> {

}
