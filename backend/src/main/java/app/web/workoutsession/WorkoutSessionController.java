package app.web.workoutsession;

import app.model.dto.workoutsession.CreateSessionRequest;
import app.model.dto.workoutsession.WorkoutSessionDto;
import app.service.workoutsession.WorkoutSessionService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/sessions")
public class WorkoutSessionController {
    private final WorkoutSessionService workoutSessionService;

    public WorkoutSessionController(WorkoutSessionService workoutSessionService) {
        this.workoutSessionService = workoutSessionService;
    }

    @PostMapping
    public ResponseEntity<Void> createSession(@RequestBody @Valid CreateSessionRequest request) {
        workoutSessionService.createWorkoutSession(request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/{sessionId}/join")
    public ResponseEntity<Void> joinSession(@PathVariable UUID sessionId,
                                            @RequestParam UUID partnerId) {
        workoutSessionService.joinSession(sessionId, partnerId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{sessionId}/leave")
    public ResponseEntity<Void> leaveSession(@PathVariable UUID sessionId,
                                             @RequestParam UUID partnerId) {
        workoutSessionService.leaveSession(sessionId, partnerId);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{sessionId}/cancel")
    public ResponseEntity<Void> cancelSession(@PathVariable UUID sessionId,
                                              @RequestParam UUID hostId) {
        workoutSessionService.cancelSession(sessionId, hostId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{sessionId}")
    public ResponseEntity<WorkoutSessionDto> getSession(@PathVariable UUID sessionId) {
        return ResponseEntity.ok(workoutSessionService.getSessionById(sessionId));
    }

    @GetMapping
    public ResponseEntity<List<WorkoutSessionDto>> getActiveSessions() {
        return ResponseEntity.ok(workoutSessionService.getActiveSessions());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<WorkoutSessionDto>> getSessionsByUser(@PathVariable UUID userId) {
        return ResponseEntity.ok(workoutSessionService.getSessionsByUser(userId));
    }
}
