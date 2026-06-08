package app.repository.city;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import app.model.entity.city.City;

public interface CityRepository extends JpaRepository<City, UUID>{
    Optional<City> findByName(String name);
}
