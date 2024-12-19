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


    public Plane() {}

    public Plane(Airport airport, String name, String model, int capacity) {
        if (airport != null) {
            this.airport = airport;
        }
        this.name = name;
        this.model = model;
        this.capacity = capacity;
    }
}