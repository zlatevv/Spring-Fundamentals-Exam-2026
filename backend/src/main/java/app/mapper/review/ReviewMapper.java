package app.mapper.review;

import app.model.dto.review.CreateReviewRequest;
import app.model.dto.review.ReviewDto;
import app.model.entity.review.Review;
import app.model.entity.user.User;
import app.model.entity.workoutsession.WorkoutSession;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class ReviewMapper {

    public static Review toEntity(CreateReviewRequest request, User author, WorkoutSession session) {
        return Review.builder()
                .content(request.getContent())
                .rating(request.getRating())
                .author(author)
                .session(session)
                .createdOn(LocalDateTime.now())
                .build();
    }

    public static ReviewDto toDto(Review review) {
        return ReviewDto.builder()
                .id(review.getId())
                .content(review.getContent())
                .rating(review.getRating())
                .createdOn(review.getCreatedOn())
                .authorId(review.getAuthor().getId())
                .authorUsername(review.getAuthor().getUsername())
                .sessionId(review.getSession().getId())
                .sessionTitle(review.getSession().getTitle())
                .build();
    }

    public static List<ReviewDto> toDtoList(List<Review> reviews) {
        return reviews.stream()
                .map(ReviewMapper::toDto)
                .toList();
    }
}
