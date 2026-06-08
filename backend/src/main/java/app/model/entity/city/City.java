package app.model.entity.city;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;

import app.model.entity.workoutsession.WorkoutSession;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "cities")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class City {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;

    @JsonIgnore
    @OneToMany(mappedBy = "city")
    @Builder.Default
    private List<WorkoutSession> workoutSessions = new ArrayList<>();
}
