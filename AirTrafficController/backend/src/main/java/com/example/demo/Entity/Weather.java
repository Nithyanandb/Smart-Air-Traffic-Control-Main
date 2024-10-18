package com.example.demo.Entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class Weather {

        private Main main;
        private Wind wind;

        @Data
        public static class Main {
                private double temp;
                private double pressure;
                private int humidity;

                @JsonProperty("feels_like")
                private double feelsLike;
        }

        @Data
        public static class Wind {
                private double speed;

                @JsonProperty("deg")
                private int direction;
        }
}
