package Air_Traffic_Control.App.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;



@Data
@Entity
public class Route {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Airport origin;
    @ManyToOne
    private Airport destination;


    public Route() {}


    public Route(Airport origin, Airport destination) {
        this.origin = origin;
        this.destination = destination;
    }


}
