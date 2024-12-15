package Air_Traffic_Control.App.Entity;

import java.util.List;



public class Result {


    private final List<String> routeSteps;
    private final double totalDistance;



    public Result(List<String> routeSteps, double totalDistance) {
        this.routeSteps = routeSteps;
        this.totalDistance = totalDistance;
    }

    public List<String> getRouteSteps() {
        return routeSteps;
    }

    public double getTotalDistance() {
        return totalDistance;
    }
}
