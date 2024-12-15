package Air_Traffic_Control.App.Entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class Weather {

        private Main main;


        @Data
        public static class Main {
                private double temp;
                private double pressure;
                private int humidity;
                private double speed;


        }


}
