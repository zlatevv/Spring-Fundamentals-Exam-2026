package app.repository.review;

import app.model.entity.review.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ReviewRepository extends JpaRepository<Review, UUID> {
    List<Review> findAllBySessionId(UUID sessionId);
    List<Review> findAllByAuthorId(UUID authorId);
    boolean existsBySessionIdAndAuthorId(UUID sessionId, UUID authorId);
}
