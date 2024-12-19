package Air_Traffic_Control.App.Repository;

import Air_Traffic_Control.App.Entity.Airport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface AirportRepository extends JpaRepository<Airport, Long> {
    Airport findByCode(String code);
    boolean existsByCode(String code);
}
