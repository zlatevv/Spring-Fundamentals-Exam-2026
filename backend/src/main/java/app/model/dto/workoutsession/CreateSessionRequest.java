package app.model.dto.workoutsession;

import app.model.entity.user.User;
import app.model.enums.workoutsession.MuscleGroup;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class CreateSessionRequest {
    private String title;
    private MuscleGroup muscleGroup;
    private String cityName;
    private String gymName;
    private LocalDateTime scheduledAt;
    private Integer maxPartners;
    private String description;
    private User host;

}
