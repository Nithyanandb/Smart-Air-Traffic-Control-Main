    package Air_Traffic_Control.App.Entity;




    import jakarta.persistence.*;
    import lombok.Data;
    import org.antlr.v4.runtime.misc.NotNull;

    @Data
    @Entity
    public class Plane {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String name;

        @NotNull
        private String model;

        private int capacity;

        @ManyToOne
        @JoinColumn(name = "airport_id")
        private Airport airport;

    }
