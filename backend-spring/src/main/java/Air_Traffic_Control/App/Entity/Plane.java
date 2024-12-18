package Air_Traffic_Control.App.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Plane {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String model;

    private int capacity;


    @ManyToOne
    @JoinColumn(name = "airport_id")
    @JsonBackReference
    private Airport airport;
}
