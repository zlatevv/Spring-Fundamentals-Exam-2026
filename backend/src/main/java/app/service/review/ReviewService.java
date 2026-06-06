package app.service.review;

import app.exception.user.UserDoesNotExistException;
import app.exception.workoutsession.UnauthorizedActionException;
import app.mapper.review.ReviewMapper;
import app.model.dto.review.CreateReviewRequest;
import app.model.dto.review.ReviewDto;
import app.model.entity.review.Review;
import app.model.entity.user.User;
import app.model.entity.workoutsession.WorkoutSession;
import app.model.enums.workoutsession.SessionStatus;
import app.repository.review.ReviewRepository;
import app.repository.user.UserRepository;
import app.repository.workoutsession.WorkoutSessionRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final WorkoutSessionRepository workoutSessionRepository;
    private final UserRepository userRepository;

    public ReviewService(ReviewRepository reviewRepository,
                         WorkoutSessionRepository workoutSessionRepository,
                         UserRepository userRepository) {
        this.reviewRepository = reviewRepository;
        this.workoutSessionRepository = workoutSessionRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public ReviewDto createReview(CreateReviewRequest request) {
        User author = userRepository.findById(request.getAuthorId())
                .orElseThrow(() -> new UserDoesNotExistException("User not found!"));

        WorkoutSession session = workoutSessionRepository.findById(request.getSessionId())
                .orElseThrow(() -> new EntityNotFoundException("Session not found!"));

        if (session.getSessionStatus() != SessionStatus.COMPLETED) {
            throw new IllegalStateException("Can only review completed sessions!");
        }

        if (reviewRepository.existsBySessionIdAndAuthorId(request.getSessionId(), request.getAuthorId())) {
            throw new IllegalStateException("You already reviewed this session!");
        }

        Review review = ReviewMapper.toEntity(request, author, session);
        return ReviewMapper.toDto(reviewRepository.save(review));
    }

    public List<ReviewDto> getReviewsBySession(UUID sessionId) {
        return ReviewMapper.toDtoList(reviewRepository.findAllBySessionId(sessionId));
    }

    public List<ReviewDto> getReviewsByUser(UUID userId) {
        return ReviewMapper.toDtoList(reviewRepository.findAllByAuthorId(userId));
    }

    @Transactional
    public ReviewDto editReview(UUID reviewId, UUID authorId, CreateReviewRequest request) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new EntityNotFoundException("Review not found!"));

        if (!review.getAuthor().getId().equals(authorId)) {
            throw new UnauthorizedActionException("You can only edit your own reviews!");
        }

        review.setContent(request.getContent());
        review.setRating(request.getRating());

        return ReviewMapper.toDto(reviewRepository.save(review));
    }

    // ── DELETE ────────────────────────────────────────────────────────────────

    @Transactional
    public void deleteReview(UUID reviewId, UUID authorId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new EntityNotFoundException("Review not found!"));

        if (!review.getAuthor().getId().equals(authorId)) {
            throw new UnauthorizedActionException("You can only delete your own reviews!");
        }

        reviewRepository.delete(review);
    }
}
