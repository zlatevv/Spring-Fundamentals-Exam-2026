package app.repository.review;

import app.model.entity.review.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ReviewRepository extends JpaRepository<Review, UUID> {
    List<Review> findAllBySessionId(UUID sessionId);
    List<Review> findAllByAuthorId(UUID authorId);
    boolean existsBySessionIdAndAuthorId(UUID sessionId, UUID authorId);
}
