package app.web.review;

import app.model.dto.review.CreateReviewRequest;
import app.model.dto.review.ReviewDto;
import app.service.review.ReviewService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping
    public ResponseEntity<ReviewDto> createReview(@RequestBody @Valid CreateReviewRequest request) {
        return ResponseEntity.ok(reviewService.createReview(request));
    }

    @GetMapping("/session/{sessionId}")
    public ResponseEntity<List<ReviewDto>> getBySession(@PathVariable UUID sessionId) {
        return ResponseEntity.ok(reviewService.getReviewsBySession(sessionId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ReviewDto>> getByUser(@PathVariable UUID userId) {
        return ResponseEntity.ok(reviewService.getReviewsByUser(userId));
    }

    @PutMapping("/{reviewId}")
    public ResponseEntity<ReviewDto> editReview(@PathVariable UUID reviewId,
                                                @RequestParam UUID authorId,
                                                @RequestBody @Valid CreateReviewRequest request) {
        return ResponseEntity.ok(reviewService.editReview(reviewId, authorId, request));
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Void> deleteReview(@PathVariable UUID reviewId,
                                             @RequestParam UUID authorId) {
        reviewService.deleteReview(reviewId, authorId);
        return ResponseEntity.noContent().build();
    }
}
