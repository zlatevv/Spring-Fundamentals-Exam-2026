package app.mapper.workoutsession;

import app.model.dto.workoutsession.CreateSessionRequest;
import app.model.dto.workoutsession.WorkoutSessionDto;
import app.model.entity.user.User;
import app.model.entity.workoutsession.WorkoutSession;
import app.model.enums.workoutsession.SessionStatus;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class WorkoutSessionMapper {
    public static WorkoutSession toEntity(CreateSessionRequest request, User host) {
        return WorkoutSession.builder()
                .title(request.getTitle())
                .gymName(request.getGymName())
                .cityName(request.getCityName())
                .scheduledAt(request.getScheduledAt())
                .muscleGroup(request.getMuscleGroup())
                .maxPartners(request.getMaxPartners())
                .description(request.getDescription())
                .sessionStatus(SessionStatus.ACTIVE)
                .host(host)
                .createdOn(LocalDateTime.now())
                .build();
    }

    public static WorkoutSessionDto toDto(WorkoutSession session) {
        return WorkoutSessionDto.builder()
                .id(session.getId())
                .title(session.getTitle())
                .gymName(session.getGymName())
                .cityName(session.getCityName())
                .scheduledAt(session.getScheduledAt())
                .muscleGroup(session.getMuscleGroup())
                .maxPartners(session.getMaxPartners())
                .description(session.getDescription())
                .sessionStatus(session.getSessionStatus())
                .createdOn(session.getCreatedOn())
                .hostId(session.getHost().getId())
                .hostUsername(session.getHost().getUsername())
                .participantCount(session.getParticipants().size())
                .build();
    }

    public static List<WorkoutSessionDto> toDtoList(List<WorkoutSession> sessions) {
        return sessions.stream()
                .map(WorkoutSessionMapper::toDto)
                .toList();
    }
}
