package app.mapper.workoutsession;

import app.model.dto.workoutsession.CreateSessionRequest;
import app.model.entity.workoutsession.WorkoutSession;
import app.model.enums.workoutsession.SessionStatus;

import java.time.LocalDateTime;

public class WorkoutSessionMapper {
    public static WorkoutSession toWorkoutSessionEntity(CreateSessionRequest createSessionRequest) {
        if (createSessionRequest == null) {
            return null;
        }

        return WorkoutSession.builder()
                .host(createSessionRequest.getHost())
                .sessionStatus(SessionStatus.ACTIVE)
                .title(createSessionRequest.getTitle())
                .gymName(createSessionRequest.getGymName())
                .cityName(createSessionRequest.getCityName())
                .description(createSessionRequest.getDescription())
                .muscleGroup(createSessionRequest.getMuscleGroup())
                .scheduledAt(createSessionRequest.getScheduledAt())
                .createdOn(LocalDateTime.now())
                .maxPartners(createSessionRequest.getMaxPartners())
                .build();
    }
}
