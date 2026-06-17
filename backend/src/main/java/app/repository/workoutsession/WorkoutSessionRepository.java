package app.repository.workoutsession;

import app.model.entity.workoutsession.WorkoutSession;
import app.model.enums.workoutsession.SessionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface WorkoutSessionRepository extends JpaRepository<WorkoutSession, UUID>, JpaSpecificationExecutor<WorkoutSession> {
    List<WorkoutSession> findAllBySessionStatus(SessionStatus sessionStatus);

    @Query("SELECT s FROM WorkoutSession s LEFT JOIN s.participants p WHERE s.host.id = :userId OR p.partner.id = :userId")
    List<WorkoutSession> findAllByUserId(@Param("userId") UUID userId);
}
