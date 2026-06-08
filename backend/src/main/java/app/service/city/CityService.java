package app.service.city;

import java.util.List;

import org.springframework.stereotype.Service;

import app.model.entity.city.City;
import app.repository.city.CityRepository;

@Service
public class CityService {
    private final CityRepository cityRepository;

    public CityService(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    public List<City> getAllCities() {
        return cityRepository.findAll();
    }
}
