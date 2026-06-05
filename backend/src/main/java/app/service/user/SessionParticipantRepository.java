package app.service.user;

import app.model.entity.user.SessionParticipant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface SessionParticipantRepository extends JpaRepository<UUID, SessionParticipant> {
}
