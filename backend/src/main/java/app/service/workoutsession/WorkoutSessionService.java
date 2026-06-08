package app.service.workoutsession;

import app.exception.user.UserDoesNotExistException;
import app.exception.workoutsession.AlreadyJoinedException;
import app.exception.workoutsession.SessionFullException;
import app.exception.workoutsession.UnauthorizedActionException;
import app.exception.workoutsession.UserNotInSessionException;
import app.mapper.workoutsession.WorkoutSessionMapper;
import app.model.dto.workoutsession.CreateSessionRequest;
import app.model.dto.workoutsession.WorkoutSessionDto;
import app.model.entity.city.City;
import app.model.entity.user.SessionParticipant;
import app.model.entity.user.User;
import app.model.entity.workoutsession.WorkoutSession;
import app.model.enums.workoutsession.SessionStatus;
import app.repository.city.CityRepository;
import app.repository.user.SessionParticipantRepository;
import app.repository.user.UserRepository;
import app.repository.workoutsession.WorkoutSessionRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class WorkoutSessionService {
    private final WorkoutSessionRepository workoutSessionRepository;
    private final SessionParticipantRepository sessionParticipantRepository;
    private final CityRepository cityRepository;
    private final UserRepository userRepository;

    public WorkoutSessionService(WorkoutSessionRepository workoutSessionRepository, SessionParticipantRepository sessionParticipantRepository, UserRepository userRepository, CityRepository cityRepository) {
        this.workoutSessionRepository = workoutSessionRepository;
        this.sessionParticipantRepository = sessionParticipantRepository;
        this.userRepository = userRepository;
        this.cityRepository = cityRepository;
    }

    @Transactional
    public void createWorkoutSession(CreateSessionRequest request) {
        User host = userRepository.findById(request.getHost().getId())
            .orElseThrow(() -> new UserDoesNotExistException("User doesn't exist"));

        City city = cityRepository.findByName(request.getCityName())
                .orElseGet(() -> cityRepository.save(
                        City.builder()
                                .name(request.getCityName())
                                .build()
                ));

        WorkoutSession session = WorkoutSessionMapper.toEntity(request, host, city);

        workoutSessionRepository.save(session);
    }

    @Transactional
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

    @Transactional
    public void leaveSession(UUID sessionId, UUID partnerId) {
        WorkoutSession session = workoutSessionRepository.findById(sessionId)
                .orElseThrow(() -> new EntityNotFoundException("Session not found!"));

        SessionParticipant participant = session.getParticipants().stream()
                .filter(p -> p.getPartner().getId().equals(partnerId))
                .findFirst()
                .orElseThrow(() -> new UserNotInSessionException("You are not in this session!"));

        if (session.getSessionStatus() == SessionStatus.CANCELLED) {
            throw new IllegalStateException("Cannot leave a cancelled session!");
        }

        sessionParticipantRepository.delete(participant);
    }

    @Transactional
    public void cancelSession(UUID sessionId, UUID hostId) {
        WorkoutSession session = workoutSessionRepository.findById(sessionId)
                .orElseThrow(() -> new EntityNotFoundException("Session not found!"));

        if (!session.getHost().getId().equals(hostId)) {
            throw new UnauthorizedActionException("Only the host can cancel this session!");
        }

        if (session.getSessionStatus() == SessionStatus.CANCELLED) {
            throw new IllegalStateException("Session is already cancelled!");
        }

        session.setSessionStatus(SessionStatus.CANCELLED);
    }

    public WorkoutSessionDto getSessionById(UUID sessionId) {
        WorkoutSession session = workoutSessionRepository.findById(sessionId)
                .orElseThrow(() -> new EntityNotFoundException("Session not found!"));

        return WorkoutSessionMapper.toDto(session);
    }

    public List<WorkoutSessionDto> getActiveSessions() {
        List<WorkoutSession> sessions = workoutSessionRepository.findAllBySessionStatus(SessionStatus.ACTIVE);

        return WorkoutSessionMapper.toDtoList(sessions);
    }

    public List<WorkoutSessionDto> getSessionsByUser(UUID userId) {
        return WorkoutSessionMapper.toDtoList(workoutSessionRepository.findAllByUserId(userId));
    }
}
