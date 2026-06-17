package app.repository.user;

import app.model.entity.user.SessionParticipant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface SessionParticipantRepository extends JpaRepository<SessionParticipant, UUID> {
}
