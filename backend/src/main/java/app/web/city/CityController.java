package app.web.city;

import app.service.city.CityService;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import app.model.entity.city.City;

@RestController
@RequestMapping("/api/cities")
public class CityController {
    private final CityService cityService;

    CityController(CityService cityService) {
        this.cityService = cityService;
    }

    @GetMapping
    public List<City> getAllCities() {
        return cityService.getAllCities();
    }
}
