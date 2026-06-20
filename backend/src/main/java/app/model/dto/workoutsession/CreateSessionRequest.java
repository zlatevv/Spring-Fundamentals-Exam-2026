package app.model.dto.workoutsession;

import app.model.entity.user.User;
import app.model.enums.workoutsession.MuscleGroup;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class CreateSessionRequest {
    @NotBlank(message = "Title is required")
    private String title;
    @NotNull(message = "Muscle group is required")
    private MuscleGroup muscleGroup;
    @NotBlank(message = "City is required")
    private String cityName;

    @NotBlank(message = "Gym name is required")
    private String gymName;
    
    @NotNull(message = "Scheduled date is required")
    @Future(message = "Session must be scheduled in the future")
    private LocalDateTime scheduledAt;

    @NotNull(message = "Max partners is required")
    @Min(value = 1, message = "Must allow at least 1 partner")
    private Integer maxPartners;
    private String description;
    private User host;
}
