package app.service.workoutsession;

import app.exception.user.UserDoesNotExistException;
import app.exception.workoutsession.AlreadyJoinedException;
import app.exception.workoutsession.SessionFullException;
import app.exception.workoutsession.UnauthorizedActionException;
import app.mapper.workoutsession.WorkoutSessionMapper;
import app.model.dto.workoutsession.CreateSessionRequest;
import app.model.entity.user.SessionParticipant;
import app.model.entity.user.User;
import app.model.entity.workoutsession.WorkoutSession;
import app.model.enums.workoutsession.SessionStatus;
import app.repository.user.SessionParticipantRepository;
import app.repository.user.UserRepository;
import app.repository.workoutsession.WorkoutSessionRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class WorkoutSessionService {
    private final WorkoutSessionRepository workoutSessionRepository;
    private final SessionParticipantRepository sessionParticipantRepository;
    private final UserRepository userRepository;

    public WorkoutSessionService(WorkoutSessionRepository workoutSessionRepository, SessionParticipantRepository sessionParticipantRepository, UserRepository userRepository) {
        this.workoutSessionRepository = workoutSessionRepository;
        this.sessionParticipantRepository = sessionParticipantRepository;
        this.userRepository = userRepository;
    }

    public void createWorkoutSession(CreateSessionRequest createSessionRequest) {
        workoutSessionRepository.save(WorkoutSessionMapper.toWorkoutSessionEntity(createSessionRequest));
    }

    public void joinSession(UUID sessionId, UUID partnerId) {
        WorkoutSession session = workoutSessionRepository.findById(sessionId)
                .orElseThrow(() -> new EntityNotFoundException("Session not found!"));

        User partner = userRepository.findById(partnerId)
                .orElseThrow(() -> new UserDoesNotExistException("User not found!"));

        // Business rule checks
        if (session.getHost().getId().equals(partnerId)) {
            throw new UnauthorizedActionException("You can't join your own session!");
        }

        if (session.getSessionStatus() != SessionStatus.ACTIVE) {
            throw new IllegalStateException("Session is not active!");
        }

        if (session.getParticipants().size() >= session.getMaxPartners()) {
            throw new SessionFullException("Session is full!");
        }

        boolean alreadyJoined = session.getParticipants().stream()
                .anyMatch(p -> p.getPartner().getId().equals(partnerId));

        if (alreadyJoined) {
            throw new AlreadyJoinedException("You already joined this session!");
        }

        SessionParticipant participant = new SessionParticipant();
        participant.setSession(session);
        participant.setPartner(partner);
        participant.setJoinedAt(LocalDateTime.now());

        sessionParticipantRepository.save(participant);
    }
}
