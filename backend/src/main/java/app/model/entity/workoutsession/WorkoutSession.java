package app.model.entity.workoutsession;

import app.model.entity.user.SessionParticipant;
import app.model.entity.user.User;
import app.model.enums.workoutsession.MuscleGroup;
import app.model.enums.workoutsession.SessionStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "workout_sessions")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WorkoutSession {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String gymName;

    @Column(nullable = false)
    private String cityName;

    @Column(nullable = false)
    private LocalDateTime scheduledAt;

    @Enumerated(EnumType.STRING)
    private MuscleGroup muscleGroup;

    private Integer maxPartners;

    private String description;

    @Enumerated(EnumType.STRING)
    private SessionStatus sessionStatus;

    @ManyToOne
    @JoinColumn(name = "host_id")
    private User host;

    @JsonIgnore
    @OneToMany(mappedBy = "session", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<SessionParticipant> participants = new ArrayList<>();

    private LocalDateTime createdOn;
}
