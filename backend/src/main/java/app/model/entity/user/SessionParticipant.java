package app.model.entity.user;

import app.model.entity.workoutsession.WorkoutSession;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "session_participants")
@Data
public class SessionParticipant {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "session_id", nullable = false)
    private WorkoutSession session;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User partner;

    private LocalDateTime joinedAt;
}