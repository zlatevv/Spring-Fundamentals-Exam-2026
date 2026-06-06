package app.model.dto.workoutsession;

import app.model.enums.workoutsession.MuscleGroup;
import app.model.enums.workoutsession.SessionStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class WorkoutSessionDto {
    private UUID id;
    private String title;
    private String gymName;
    private String cityName;
    private LocalDateTime scheduledAt;
    private MuscleGroup muscleGroup;
    private Integer maxPartners;
    private String description;
    private SessionStatus sessionStatus;
    private LocalDateTime createdOn;

    private UUID hostId;
    private String hostUsername;

    private int participantCount;
}
