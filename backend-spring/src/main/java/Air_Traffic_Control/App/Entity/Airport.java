package Air_Traffic_Control.App.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class Airport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String code;

    private String location;

    @JsonIgnore
    @OneToMany(mappedBy = "airport")
    private List<Plane> planes;
}
